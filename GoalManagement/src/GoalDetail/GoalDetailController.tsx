import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Goal } from "../types";
import { configJSON } from "../GoalManagementController.web";
import { createRequestMessage } from "../../../../framework/src/Helpers/create-request-message";
import { handleResponseMessage } from "../../../../framework/src/Helpers/handle-response-message";
import { getStorageData } from "../../../../framework/src/Utilities";

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
  deleteModal: boolean;
  goal: Goal;
  isLoading: boolean;
  token: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class GoalDetailController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  initialGoal: Goal;
  getFocusSubscription: object;
  deleteGoalCallApi: string;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.initialGoal = this.props.navigation.state.params?.goal as Goal;

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      deleteModal: false,
      goal: this.initialGoal?.id ? this.initialGoal : {},
      isLoading: false,
      token: this.props.navigation.state.params?.token,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleToggleDeleteModal = this.handleToggleDeleteModal.bind(this);
    this.handleGoToUpdateScreen = this.handleGoToUpdateScreen.bind(this);
    this.handleDeleteGoal = this.handleDeleteGoal.bind(this);
    this.deleteGoalCallApi = "";
    this.getFocusSubscription = {};
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiResponseCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage),
      );

      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
      );

      const errorJson = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
      );

      this.setState({
        isLoading: false,
      });

      if (apiResponseCallId === this.deleteGoalCallApi) {
        handleResponseMessage({
          responseJson,
          errorJson,
          onSuccess: () => {
            this.props.navigation.navigate("GoalRetrieve");
            this.showAlert("", "Delete Goal Successfully");
          },
          onFail: () => {
            this.showAlert(`Delete Goal Failed`, "Please retry!");
          },
        });
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.getFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => this.handleGetTokenGoalDetail(),
    );
  }
  handleGoBack() {
    this.props.navigation.navigate("GoalRetrieve");
  }
  handleToggleDeleteModal() {
    this.setState((prevState) => ({
      deleteModal: !prevState.deleteModal,
    }));
  }
  handleGoToUpdateScreen() {
    this.props.navigation.replace("GoalCreate", {
      goal: this.state.goal,
    });
  }
  async handleGetTokenGoalDetail() {
    const authToken = await getStorageData("token", false);
    this.setState({
      token: authToken,
    });
  }
  handleDeleteGoal() {
    this.setState({
      isLoading: true,
    });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.deleteGoalCallApi = requestMessage.messageId;

    createRequestMessage({
      requestMessage,
      endPoint: `${configJSON.goalManagementURLEndPoint}/${this.state.goal.id}`,
      method: configJSON.deleteApiMethodType,
      token: this.state.token,
    });
  }
  // Customizable Area End
}
