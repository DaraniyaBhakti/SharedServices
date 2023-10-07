import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { handleResponseMessage } from "../../../../framework/src/Helpers/handle-response-message";
import { getStorageData } from "../../../../framework/src/Utilities";
import createRequestMessage from "../../../../framework/src/Helpers/create-request-message";
import { configJSON } from "../GoalManagementController.web";
import { Goal } from "../types";

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
  alertModal: boolean;
  titleModal: string;
  contentModal: string;
  success: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class GoalDetailController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  initialGoalId: number;
  getFocusSubscription: object;
  deleteGoalWebApi: string;
  detailGoalWebApi: string;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.initialGoalId = this.props.navigation?.getParam("goalId") as number;

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      deleteModal: false,
      goal: {},
      isLoading: false,
      token: "",
      alertModal: false,
      titleModal: "",
      contentModal: "",
      success: false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.handleToggleDeleteModal = this.handleToggleDeleteModal.bind(this);
    this.handleGoToUpdateScreen = this.handleGoToUpdateScreen.bind(this);
    this.handleDeleteGoal = this.handleDeleteGoal.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.deleteGoalWebApi = "";
    this.detailGoalWebApi = "";
    this.getFocusSubscription = {};
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
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

      if (apiRequestCallId === this.deleteGoalWebApi) {
        handleResponseMessage({
          responseJson,
          errorJson,
          onSuccess: () => {
            this.setState(
              {
                alertModal: true,
                titleModal: "Success",
                success: true,
                contentModal: "Delete goal successfully!",
              },
              () => {
                this.props.navigation.navigate("GoalRetrieve");
              },
            );
          },
          onFail: () => {
            this.setState({
              alertModal: true,
              titleModal: "Fail",
              contentModal: `Delete goal failed. Please retry!`,
            });
          },
        });
      } else if (apiRequestCallId === this.detailGoalWebApi) {
        handleResponseMessage({
          responseJson,
          errorJson,
          onSuccess: () => {
            const { goal } = responseJson;

            const { attributes, id } = goal.data;

            this.setState({
              goal: {
                id: id,
                ...attributes,
              },
            });
          },
          onFail: () => {
            this.setState({
              alertModal: true,
              titleModal: "Fail",
              contentModal: `Get goal failed. Please retry!`,
            });
          },
        });
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.handleGetTokenGoalDetail();
  }
  handleToggleDeleteModal() {
    this.setState((prevState) => ({
      deleteModal: !prevState.deleteModal,
    }));
  }
  handleGoToUpdateScreen() {
    this.props.navigation.navigate("GoalCreate", {
      goalId: this.initialGoalId,
    });
  }
  async handleGetTokenGoalDetail() {
    const authToken = await getStorageData("token", false);
    this.setState(
      {
        token: authToken,
      },
      () => {
        this.handleDetailGoal();
      },
    );
  }
  handleDetailGoal() {
    this.setState({
      isLoading: true,
    });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.detailGoalWebApi = requestMessage.messageId;

    createRequestMessage({
      requestMessage,
      endPoint: `${configJSON.goalManagementURLEndPoint}/${this.initialGoalId}`,
      method: configJSON.getApiMethodType,
      token: this.state.token,
    });
  }
  handleDeleteGoal() {
    this.setState({
      isLoading: true,
    });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.deleteGoalWebApi = requestMessage.messageId;

    createRequestMessage({
      requestMessage,
      endPoint: `${configJSON.goalManagementURLEndPoint}/${this.initialGoalId}`,
      method: configJSON.deleteApiMethodType,
      token: this.state.token,
    });
  }

  handleCloseAlert() {
    this.setState({
      alertModal: false,
      titleModal: "",
      contentModal: "",
    });

    if (this.state.success) {
      this.props.navigation.navigate("GoalRetrieve");
    }
  }

  handleGoBack() {
    this.props.navigation.navigate("GoalRetrieve");
  }
  // Customizable Area End
}
