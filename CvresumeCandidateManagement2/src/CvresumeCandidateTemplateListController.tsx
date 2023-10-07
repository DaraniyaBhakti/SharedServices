// Customizable Area Start
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { handleResponseMessage } from "../../../framework/src/Helpers/handle-response-message";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import storage from "../../../framework/src/StorageProvider";
import { TemplateDataTypes } from "./Types";

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
  templateResumes: TemplateDataTypes[];
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class CvresumeCandidateTemplateListController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getResumesCallId: string = "";
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
      authToken: "",
      templateResumes: [],
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      message.getData(getName(MessageEnum.AuthTokenDataMessage));
    }

    // Customizable Area Start

    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiResponseCallDataId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage),
      );

      const successResponse = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
      );

      const errorResponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
      );

      if (apiResponseCallDataId === this.getResumesCallId) {
        handleResponseMessage({
          responseJson: successResponse,
          errorJson: errorResponse,
          onSuccess: () => {
            this.onSuccessGetResumes(successResponse);
          },
          onFail: () => {
            this.showAlert(`Error`, "Get Cv resume Failed! Please retry");
          },
        });
      }
    }

    // Customizable Area End
  }

  // Customizable Area Start

  onSuccessGetResumes = (response: { [x: string]: string }) => {
    let temp: TemplateDataTypes[] = Object.keys(response).map(
      (templateKeys, index: number) => {
        return {
          id: index + 1,
          title: templateKeys,
          templateUrl: response[templateKeys],
        };
      },
    );

    if (response) {
      this.setState({ templateResumes: temp });
    }
  };

  async componentDidMount() {
    const templateData = {
      "Template File 1":
        "https://docs.google.com/document/d/1P3KtZYHqnbAiJDbXEWGiIRuno3lS2750",
      "Template File 2":
        "https://docs.google.com/document/d/1f1g6twmj_c0eNo6uRhZC35MozAm2SgOd",
      "Template File 3":
        "https://docs.google.com/document/d/1rmCYQ4XPs6zZkf-XtcpTBUCLQ3p3cyl0",
      "Template File 4":
        "https://docs.google.com/document/d/1uk0RZMaduyjilSfOy1sg5mTm9FmoWqFt",
    };
    const token: null | string = await storage.get("token");
    if (token) {
      this.setState(
        {
          authToken: token,
        },
        () => {
          this.onSuccessGetResumes(templateData);
        },
      );
    }
  }

  // Customizable Area End
}
