import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { setStorageData } from "../../../framework/src/Utilities";
import { configJSON } from "./GoalManagementController.web";
import { createRequestMessage } from "../../../framework/src/Helpers/create-request-message";
import { handleResponseMessage } from "../../../framework/src/Helpers/handle-response-message";

// Customizable Area Start
// Customizable Area End

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
  loginGoalCreateApiCallId: string;
  focusSubscription: object;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
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
    this.loginGoalCreateApiCallId = "";
    this.focusSubscription = {};
    this.handleNavigateHomeMobile = this.handleNavigateHomeMobile.bind(this);
    this.handleNavigateGoalCreateMobile =
      this.handleNavigateGoalCreateMobile.bind(this);
    this.handleGoToGoalRetrieve = this.handleGoToGoalRetrieve.bind(this);
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiResponseMobile = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage),
      );

      const responseMobileJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
      );

      const errorMobileJson = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
      );

      this.setState({
        isLoading: false,
      });

      if (apiResponseMobile === this.loginGoalCreateApiCallId) {
        handleResponseMessage({
          responseJson: responseMobileJson,
          errorJson: errorMobileJson,
          onSuccess: () => {
            const responseToken = responseMobileJson.meta.token;
            this.setState({
              token: responseToken,
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
    this.focusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => this.handleMobileLoginGoal(),
    );
  }
  handleMobileLoginGoal() {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.loginGoalCreateApiCallId = requestMessage.messageId;

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
  handleNavigateHomeMobile() {
    this.props.navigation.navigate("Home");
  }
  handleNavigateGoalCreateMobile() {
    this.props.navigation.navigate("GoalCreate");
  }
  handleGoToGoalRetrieve() {
    this.props.navigation.navigate("GoalRetrieve");
  }
  // Customizable Area End
}
