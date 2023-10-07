import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { getStorageData } from "../../../../framework/src/Utilities";
import { Goal, GoalStatusKey } from "../types";
import { configJSON } from "../GoalManagementController.web";
import { createRequestMessage } from "../../../../framework/src/Helpers/create-request-message";
import { handleResponseMessage } from "../../../../framework/src/Helpers/handle-response-message";
import { goalStatusObject } from "../constants";
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
  fetching: boolean;
  deleteModal: boolean;
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

export default class GoalCreateController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  initialGoalId: number;
  detailGoalCallApi: string;
  createGoalWebApi: string;
  deleteGoalWebApi: string;
  updateGoalWebApi: string;
  defaultWebSchema: object;
  goalCreateSchema: object;
  goalUpdateSchema: object;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.initialGoalId = this.props.navigation?.getParam("goalId") as number;
    this.handleSubmitWeb = this.handleSubmitWeb.bind(this);
    this.handleDeleteGoal = this.handleDeleteGoal.bind(this);
    this.handleToggleDeleteModal = this.handleToggleDeleteModal.bind(this);
    this.handleCloseAlert = this.handleCloseAlert.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.detailGoalCallApi = "";
    this.createGoalWebApi = "";
    this.updateGoalWebApi = "";
    this.deleteGoalWebApi = "";

    this.defaultWebSchema = {
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      target: Yup.string().required("Required"),
      goalStartDate: Yup.date().required("Required"),
      goalEndDate: Yup.date().required("Required"),
      rewards: Yup.string().required("Required"),
    };

    this.goalCreateSchema = Yup.object().shape({
      ...this.defaultWebSchema,
    });

    this.goalUpdateSchema = Yup.object().shape({
      ...this.defaultWebSchema,
      goalStatus: Yup.string().required("Required"),
    });

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      isLoading: false,
      goal: {},
      createLoading: false,
      updateLoading: false,
      deleteLoading: false,
      fetching: false,
      deleteModal: false,
      alertModal: false,
      titleModal: "",
      contentModal: "",
      success: false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
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
        case this.detailGoalCallApi: {
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
                fetching: false,
              });
            },
            onFail: () => {
              this.setState({
                alertModal: true,
                success: false,
                titleModal: "Fail",
                contentModal: "Get goal failed. Please retry!",
              });
            },
          });
          break;
        }

        case this.createGoalWebApi: {
          this.setState({
            createLoading: false,
          });
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: () => {
              this.setState({
                alertModal: true,
                titleModal: "Success",
                success: true,
                contentModal: "Create goal successfully!",
              });
            },
            onFail: () => {
              const { error } = responseJson;
              this.setState({
                alertModal: true,
                success: false,
                titleModal: "Fail",
                contentModal: `Create goal failed. ${error} Please retry!`,
              });
            },
          });
          break;
        }

        case this.updateGoalWebApi: {
          this.setState({
            updateLoading: false,
          });
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: () => {
              this.setState({
                alertModal: true,
                titleModal: "Success",
                success: true,
                contentModal: "Update goal successfully!",
              });
            },
            onFail: () => {
              const { error } = responseJson;
              this.setState({
                alertModal: true,
                titleModal: "Fail",
                success: false,
                contentModal: `Update goal failed. ${error} Please retry!`,
              });
            },
          });
          break;
        }

        case this.deleteGoalWebApi: {
          this.setState({
            deleteLoading: false,
          });
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: () => {
              this.setState({
                alertModal: true,
                titleModal: "Success",
                success: true,
                contentModal: "Delete goal successfully!",
              });
            },
            onFail: () => {
              const { error } = responseJson;
              this.setState({
                alertModal: true,
                titleModal: "Fail",
                contentModal: `Delete goal failed. ${error} Please retry!`,
              });
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
    if (this.state.token === "") {
      await this.handleGetTokenWeb();
    }
  }

  async handleGetTokenWeb() {
    const authToken = await getStorageData("token", false);
    this.setState(
      {
        token: authToken,
      },
      () => {
        if (this.initialGoalId) {
          this.handleDetailGoal();
        }
      },
    );
  }

  handleDetailGoal() {
    this.setState({
      isLoading: true,
      fetching: true,
    });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.detailGoalCallApi = requestMessage.messageId;

    createRequestMessage({
      requestMessage,
      endPoint: `${configJSON.goalManagementURLEndPoint}/${this.initialGoalId}`,
      method: configJSON.getApiMethodType,
      token: this.state.token,
    });
  }

  handleCreateGoal(goalData: string) {
    this.setState({
      isLoading: true,
      createLoading: true,
    });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.createGoalWebApi = requestMessage.messageId;

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

    this.updateGoalWebApi = requestMessage.messageId;

    createRequestMessage({
      requestMessage,
      endPoint: `${configJSON.goalManagementURLEndPoint}/${this.state.goal.id}`,
      method: configJSON.putApiMethodType,
      token: this.state.token,
      body: goalData,
    });
  }
  handleSubmitWeb(values: {
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

    const goalDataWeb = JSON.stringify({
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

    if (this.initialGoalId) {
      this.handleUpdateGoal(goalDataWeb);
    } else {
      this.handleCreateGoal(goalDataWeb);
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

    this.deleteGoalWebApi = requestMessage.messageId;

    createRequestMessage({
      requestMessage,
      endPoint: `${configJSON.goalManagementURLEndPoint}/${this.state.goal.id}`,
      method: configJSON.deleteApiMethodType,
      token: this.state.token,
    });
  }

  handleToggleDeleteModal() {
    this.setState((prevState) => ({
      deleteModal: !prevState.deleteModal,
    }));
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
