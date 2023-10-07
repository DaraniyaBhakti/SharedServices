import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { DateObject } from "react-native-calendars";
import { configJSON } from "../GoalManagementController.web";
import { createRequestMessage } from "../../../../framework/src/Helpers/create-request-message";
import { handleResponseMessage } from "../../../../framework/src/Helpers/handle-response-message";
import { Goal, GoalResponseData } from "../types";
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
  filterVisible: boolean;
  calendarVisible: boolean;
  filterSelectionVisible: boolean;
  isLoading: boolean;
  token: string;
  needRetakeToken: boolean;
  goalList: Goal[];
  isFiltered: boolean;
  nameFilter: string;
  dateFilter: string;
  nameFilterLoading: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class GoalRetrieveController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getGoalListMobile: string;
  searchGoalMobile: string;
  deleteGoalMobile: string;
  willFocusSubscription: object;
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
      filterVisible: false,
      calendarVisible: false,
      filterSelectionVisible: true,
      isLoading: false,
      token: "",
      needRetakeToken: true,
      goalList: [],
      isFiltered: false,
      nameFilter: "",
      dateFilter: "",
      nameFilterLoading: false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.handleToggleFilterVisible = this.handleToggleFilterVisible.bind(this);
    this.handleToggleFilterSelectionVisible =
      this.handleToggleFilterSelectionVisible.bind(this);
    this.handleToggleCalendarVisible =
      this.handleToggleCalendarVisible.bind(this);
    this.handleSelectDate = this.handleSelectDate.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleGetGoalList = this.handleGetGoalList.bind(this);
    this.handleDeleteGoal = this.handleDeleteGoal.bind(this);
    this.handleFilterName = this.handleFilterName.bind(this);
    this.handleFilterDate = this.handleFilterDate.bind(this);
    this.handleCancelFilter = this.handleCancelFilter.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.getGoalListMobile = "";
    this.deleteGoalMobile = "";
    this.searchGoalMobile = "";
    this.willFocusSubscription = {};
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiResponseMobile = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage),
      );

      const mobileResponseData = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
      );

      const mobileErrorData = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
      );

      this.setState({
        isLoading: false,
      });

      switch (apiResponseMobile) {
        case this.getGoalListMobile:
        case this.searchGoalMobile:
          this.setState({
            nameFilterLoading: false,
          });
          handleResponseMessage({
            responseJson: mobileResponseData,
            errorJson: mobileErrorData,
            onSuccess: () => {
              this.handleResponseGetGoalListSuccess(mobileResponseData);
            },
            onFail: () => {
              this.showAlert(`Get List Failed`, "Please retry!");
            },
          });
          break;

        case this.deleteGoalMobile:
          handleResponseMessage({
            responseJson: mobileResponseData,
            errorJson: mobileErrorData,
            onSuccess: () => {
              this.handleGetGoalList();
              this.showAlert("", "Delete Goal Successfully");
            },
            onFail: () => {
              this.showAlert(`Delete Goal Failed`, "Please retry!");
            },
          });
          break;
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => this.handleGetTokenMobile(),
    );
  }
  handleGoBack() {
    this.props.navigation.navigate("GoalManagement");
  }
  handleToggleFilterVisible() {
    this.setState((prevState) => ({
      filterVisible: !prevState.filterVisible,
      filterSelectionVisible: true,
      calendarVisible: false,
    }));
  }
  handleToggleCalendarVisible() {
    this.setState((prevState) => ({
      calendarVisible: !prevState.calendarVisible,
      filterSelectionVisible: false,
    }));
  }
  handleToggleFilterSelectionVisible() {
    this.setState((prevState) => ({
      filterSelectionVisible: !prevState.filterSelectionVisible,
    }));
  }
  handleSelectDate(date: DateObject) {
    this.setState({
      filterSelectionVisible: false,
      calendarVisible: false,
      filterVisible: false,
    });
    this.handleFilterDate(date);
  }
  async handleGetTokenMobile() {
    const authToken = await getStorageData("token", false);
    this.setState(
      {
        token: authToken,
      },
      () => {
        this.handleGetGoalList();
      },
    );
  }

  handleResponseGetGoalListSuccess(responseJson: {
    message: string;
    goals: { data: GoalResponseData[] };
  }) {
    const { message: apiMessage, goals } = responseJson;

    if (apiMessage === configJSON.errorGetListMessage) {
      this.showAlert("", apiMessage);
      this.setState({
        goalList: [],
      });
    }

    if (goals && goals.data) {
      const processData = goals.data.map((item: GoalResponseData) => ({
        id: item.id,
        ...item.attributes,
      }));

      this.setState({
        goalList: processData,
      });
    }
  }

  handleGetGoalList() {
    this.setState({
      isLoading: true,
    });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.getGoalListMobile = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.currentUserGoalURLEndPoint}`,
      method: configJSON.getApiMethodType,
      token: this.state.token,
    });
  }

  handleSearchGoal(input: { nameFilter?: string; dateFilter?: string }) {
    const { nameFilter, dateFilter } = input;
    this.setState({
      isLoading: true,
    });

    if (!nameFilter && !dateFilter) {
      this.setState({
        isFiltered: false,
      });
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.searchGoalMobile = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.goalManagementURLEndPoint}${
        nameFilter && nameFilter.length > 0
          ? `/search_goals?goal_name=${nameFilter}&filter_type=goal_name`
          : ``
      }${
        dateFilter
          ? `/search_goals?goal_date=${dateFilter}&filter_type=goal_date`
          : ""
      }`,
      method: configJSON.getApiMethodType,
      token: this.state.token,
    });
  }

  handleDeleteGoal(goal: Goal) {
    this.setState({
      isLoading: true,
    });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.deleteGoalMobile = requestMessage.messageId;

    createRequestMessage({
      requestMessage,
      endPoint: `${configJSON.goalManagementURLEndPoint}/${goal.id}`,
      method: configJSON.deleteApiMethodType,
      token: this.state.token,
    });
  }

  handleChangeText(name: string) {
    this.setState({
      isFiltered: true,
      nameFilter: name,
      dateFilter: "",
      nameFilterLoading: true,
    });
    this.handleFilterName(name);
  }

  handleInputDebounce<T extends (...args: string[]) => void>(
    func: T,
    delay: number,
  ): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: unknown, ...args: Parameters<T>): void {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  handleFilterName = this.handleInputDebounce((name: string) => {
    this.setState({
      isFiltered: true,
    });
    this.handleSearchGoal({ nameFilter: name });
  }, 1000);

  handleFilterDate(date: DateObject) {
    this.setState({
      isFiltered: true,
      dateFilter: date.dateString,
      nameFilter: "",
    });
    this.handleSearchGoal({ dateFilter: date.dateString });
  }

  handleCancelFilter() {
    this.setState({
      isFiltered: false,
      nameFilter: "",
      dateFilter: "",
    });
    this.handleGetGoalList();
  }

  // Customizable Area End
}
