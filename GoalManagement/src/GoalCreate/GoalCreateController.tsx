import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Goal, GoalStatusKey } from "../types";
import { createRequestMessage } from "../../../../framework/src/Helpers/create-request-message";
import { configJSON } from "../GoalManagementController.web";
import { handleResponseMessage } from "../../../../framework/src/Helpers/handle-response-message";
import { goalStatusObject } from "../constants";
import { getStorageData } from "../../../../framework/src/Utilities";
import * as Yup from "yup";

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
  goal: Goal;
  isLoading: boolean;
  token: string;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class GoalCreateController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  initialGoal: Goal;
  createGoalCallApi: string;
  updateGoalCallApi: string;
  deleteGoalCallApi: string;
  focusSubscription: object;
  defaultSchema: object;
  goalCreateSchema: object;
  goalUpdateSchema: object;

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
      isLoading: false,
      goal: this.initialGoal ? this.initialGoal : {},
      token: "",
      createLoading: false,
      updateLoading: false,
      deleteLoading: false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.handleSubmitMobile = this.handleSubmitMobile.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleDeleteGoal = this.handleDeleteGoal.bind(this);
    this.createGoalCallApi = "";
    this.updateGoalCallApi = "";
    this.deleteGoalCallApi = "";
    this.focusSubscription = {};

    this.defaultSchema = {
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      target: Yup.string().required("Required"),
      goalStartDate: Yup.date().required("Required"),
      goalEndDate: Yup.date().required("Required"),
      rewards: Yup.string().required("Required"),
    };

    this.goalCreateSchema = Yup.object().shape({
      ...this.defaultSchema,
    });

    this.goalUpdateSchema = Yup.object().shape({
      ...this.defaultSchema,
      goalStatus: Yup.string().required("Required"),
    });
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

      switch (apiRequestCallId) {
        case this.createGoalCallApi: {
          this.setState({
            createLoading: false,
          });
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: () => {
              this.props.navigation.navigate("GoalRetrieve");
              this.showAlert("", "Create Goal Successfully");
            },
            onFail: () => {
              const { error } = responseJson;
              this.showAlert(`Create Goal Failed`, `${error} \nPlease retry!`);
            },
          });
          break;
        }

        case this.updateGoalCallApi: {
          this.setState({
            updateLoading: false,
          });
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: () => {
              this.props.navigation.navigate("GoalRetrieve");
              this.showAlert("", "Update Goal Successfully");
            },
            onFail: () => {
              const { error } = responseJson;
              this.showAlert(`Update Goal Failed`, `${error} \nPlease retry!`);
            },
          });
          break;
        }

        case this.deleteGoalCallApi: {
          this.setState({
            deleteLoading: false,
          });
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: () => {
              this.props.navigation.navigate("GoalRetrieve");
              this.showAlert("", "Delete Goal Successfully");
            },
            onFail: () => {
              const { error } = responseJson;
              this.showAlert(`Delete Goal Failed`, `${error} \nPlease retry!`);
            },
          });
          break;
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.focusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => this.handleLoginCreate(),
    );
  }
  async handleLoginCreate() {
    const authToken = await getStorageData("token", false);
    this.setState({
      token: authToken,
    });
  }
  handleGoBack() {
    if (this.initialGoal?.id) {
      this.props.navigation.navigate("GoalDetail", {
        goal: this.state.goal,
      });
    } else {
      this.props.navigation.navigate("GoalManagement");
    }
  }
  handleCreateGoal(goalData: string) {
    this.setState({
      isLoading: true,
      createLoading: true,
    });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.createGoalCallApi = requestMessage.messageId;

    createRequestMessage({
      requestMessage,
      endPoint: configJSON.goalManagementURLEndPoint,
      method: configJSON.postApiMethodType,
      token: this.state.token,
      body: goalData,
    });
  }
  handleUpdateGoal(goalData: string) {
    this.setState({
      isLoading: true,
      updateLoading: true,
    });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.updateGoalCallApi = requestMessage.messageId;

    createRequestMessage({
      requestMessage,
      endPoint: `${configJSON.goalManagementURLEndPoint}/${this.state.goal.id}`,
      method: configJSON.putApiMethodType,
      token: this.state.token,
      body: goalData,
    });
  }
  handleSubmitMobile(values: {
    name: string;
    description: string;
    target: string;
    goalStartDate: Date;
    goalEndDate: Date;
    rewards: string;
    goalStatus?: string;
  }) {
    const {
      name,
      description,
      target,
      goalStatus,
      goalStartDate,
      goalEndDate,
      rewards,
    } = values;

    const goalDataMobile = JSON.stringify({
      data: {
        name: name,
        description: description,
        target: target,
        rewards: rewards,
        goal_start_date: goalStartDate,
        goal_end_date: goalEndDate,
        goal_status: this.state.goal.id
          ? goalStatusObject[goalStatus as GoalStatusKey].id
          : undefined,
      },
    });

    if (this.state.goal.id) {
      this.handleUpdateGoal(goalDataMobile);
    } else {
      this.handleCreateGoal(goalDataMobile);
    }
  }
  handleDeleteGoal() {
    this.setState({
      isLoading: true,
      deleteLoading: true,
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
