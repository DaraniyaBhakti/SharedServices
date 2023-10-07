// Customizable Area Start
import { BlockComponent } from "../../../framework/src/BlockComponent";
import createRequestMessage from "../../../framework/src/Helpers/create-request-message";
import { handleResponseMessage } from "../../../framework/src/Helpers/handle-response-message";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import storage from "../../../framework/src/StorageProvider";
import { ProfileData, ResponseProfileTemplate, SummaryData } from "./Types";

// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start

  // Customizable Area End
}

interface S {
  // Customizable Area Start
  authToken: string;
  publicResumes: SummaryData[];
  isViewprofile: boolean;
  profileData?: ProfileData;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class CvresumeCandidateListController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getResumesCallId: string = "";
  getProfileCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),

      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      publicResumes: [],
      authToken: "",
      isViewprofile: false,

      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start

    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallDataId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage),
      );

      const responseDataJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
      );

      const errorDataJson = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
      );

      switch (apiRequestCallDataId) {
        case this.getResumesCallId: {
          handleResponseMessage({
            responseJson: responseDataJson,
            errorJson: errorDataJson,
            onSuccess: () => {
              this.onSuccessGetResumes(responseDataJson);
            },
            onFail: () => {
              this.showAlert(`Error`, "Get Cv resume Failed! Please retry");
            },
          });
          break;
        }
        case this.getProfileCallId: {
          handleResponseMessage({
            responseJson: responseDataJson,
            errorJson: errorDataJson,
            onSuccess: () => {
              this.onSuccessGetCandidate(responseDataJson);
            },
            onFail: () => {
              this.showAlert(`Error`, "Get Cv resume Failed! Please retry");
            },
          });
          break;
        }
      }
    }

    // Customizable Area End
  }
  // web events

  // Customizable Area Start

  onSuccessGetResumes = (response: { data: null | SummaryData[] }) => {
    if (response.data) {
      this.setState({ publicResumes: response.data });
    }
  };
  onSuccessGetCandidate = (response: ResponseProfileTemplate) => {
    if (response?.data === null) {
      this.setState({ isViewprofile: false });
    } else if (response.data.attributes) {
      this.setState({
        profileData: response.data?.attributes,
        isViewprofile: true,
      });
    } else {
      // call directly the function to get resumes
    }
  };

  getPublicallyAvailableResume = () => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.getResumesCallId = requestMessage.messageId;
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      "token": this.state.authToken,
    };
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.publicResume_EndPoint,
      method: configJSON.getApiMethodType,
      header: headers,
    });
  };

  async componentDidMount() {
    const token: null | string = await storage.get("token");
    if (token) {
      this.setState(
        {
          authToken: token,
        },
        () => {
          this.getPublicallyAvailableResume();
        },
      );
    }
  }

  toggleProfile = () => {
    this.setState({ isViewprofile: !this.state.isViewprofile });
  };
  goToDashboard = (created_by: string) => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.getProfileCallId = requestMessage.messageId;
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      "token": this.state.authToken,
    };
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.profile_EndPoint}/${created_by}`,
      method: configJSON.getApiMethodType,
      header: headers,
    });
  };

  // Customizable Area End
}
