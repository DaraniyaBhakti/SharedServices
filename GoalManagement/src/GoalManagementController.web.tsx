import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { handleResponseMessage } from "../../../framework/src/Helpers/handle-response-message";
import { setStorageData } from "../../../framework/src/Utilities";
import createRequestMessage from "../../../framework/src/Helpers/create-request-message";

// Customizable Area Start
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
  isLoading: boolean;
  token: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class GoalManagementController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  loginGoalWebApi: string;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      isLoading: false,
      token: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.handleGoToGoalCreateWeb = this.handleGoToGoalCreateWeb.bind(this);
    this.handleGoToGoalRetrieveWeb = this.handleGoToGoalRetrieveWeb.bind(this);
    this.loginGoalWebApi = "";
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiResponseWeb = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage),
      );

      const responseWebJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
      );

      const errorWebJson = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
      );

      if (apiResponseWeb === this.loginGoalWebApi) {
        handleResponseMessage({
          responseJson: responseWebJson,
          errorJson: errorWebJson,
          onSuccess: () => {
            const responseToken = responseWebJson.meta.token;
            this.setState({
              token: responseToken,
              isLoading: false,
            });
            setStorageData("token", responseToken);
          },
          onFail: () => {
            this.showAlert(`Get Token Failed`, "Please retry!");
          },
        });
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.handleLoginGoalWeb();
  }
  handleLoginGoalWeb() {
    this.setState({
      isLoading: true,
    });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.loginGoalWebApi = requestMessage.messageId;

    const body = {
      data: {
        attributes: {
          email: configJSON.loginEmail,
          password: configJSON.loginPassword,
        },
        type: "email_account",
      },
    };

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.loginURLEndPoint,
      method: configJSON.postApiMethodType,
      body: JSON.stringify(body),
    });
  }
  handleGoToGoalCreateWeb() {
    this.props.navigation.navigate("GoalCreate");
  }
  handleGoToGoalRetrieveWeb() {
    this.props.navigation.navigate("GoalRetrieve");
  }
  // Customizable Area End
}
