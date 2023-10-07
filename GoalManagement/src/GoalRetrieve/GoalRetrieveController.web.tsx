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
import { Goal, GoalResponseData } from "../types";
import * as React from "react";
import { ChangeEvent } from "react";

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
  goalList: Goal[];
  isFiltered: boolean;
  nameFilter: string;
  dateFilter: string | null;
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
  getGoalListWebId: string;
  searchGoalWebId: string;
  deleteGoalItemWebApi: string;
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
    this.handleGetGoalListWeb = this.handleGetGoalListWeb.bind(this);
    this.handleDeleteGoalWeb = this.handleDeleteGoalWeb.bind(this);
    this.handleFilterName = this.handleFilterName.bind(this);
    this.handleFilterDate = this.handleFilterDate.bind(this);
    this.handleCancelFilter = this.handleCancelFilter.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleNavigateWithProps = this.handleNavigateWithProps.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.getGoalListWebId = "";
    this.deleteGoalItemWebApi = "";
    this.searchGoalWebId = "";
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiResponseWeb = message.getData(
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

      switch (apiResponseWeb) {
        case this.getGoalListWebId:
        case this.searchGoalWebId:
          this.setState({
            nameFilterLoading: false,
          });
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: () => {
              const { message: statusMessage, goals } = responseJson;

              if (statusMessage === configJSON.errorGetListMessage) {
                this.showAlert("", statusMessage);
                this.setState({
                  goalList: [],
                });
              }

              if (goals && goals.data) {
                const processData = goals.data.map(
                  (item: GoalResponseData) => ({
                    id: item.id,
                    ...item.attributes,
                  }),
                );

                this.setState({
                  goalList: processData,
                });
              }
            },
            onFail: () => {
              this.showAlert(`Get List Failed`, "Please retry!");
            },
          });
          break;
        case this.deleteGoalItemWebApi:
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: () => {
              this.handleGetGoalListWeb();
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
    if (this.state.token.length === 0) {
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
        this.handleGetGoalListWeb();
      },
    );
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
  handleSelectDate(date: string) {
    this.setState({
      filterSelectionVisible: false,
      calendarVisible: false,
      filterVisible: false,
    });
    this.handleFilterDate(date);
  }

  handleGetGoalListWeb() {
    this.setState({
      isLoading: true,
    });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.getGoalListWebId = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.currentUserGoalURLEndPoint}`,
      method: configJSON.getApiMethodType,
      token: this.state.token,
    });
  }

  handleSearchGoalWeb(input: { nameFilter?: string; dateFilter?: string }) {
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

    this.getGoalListWebId = requestMessage.messageId;

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

  handleDeleteGoalWeb(goal: Goal) {
    this.setState({
      isLoading: true,
    });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.deleteGoalItemWebApi = requestMessage.messageId;

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
      dateFilter: null,
      nameFilterLoading: true,
    });
    this.handleFilterName(name);
  }

  handleDebounce<T extends (...args: string[]) => void>(
    func: T,
    delay: number,
  ): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: unknown, ...args: Parameters<T>): void {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  handleFilterName = this.handleDebounce((name: string) => {
    this.setState({
      isFiltered: true,
    });
    this.handleSearchGoalWeb({ nameFilter: name });
  }, 1000);

  handleFilterDate(date: string) {
    this.setState({
      isFiltered: true,
      dateFilter: date,
      nameFilter: "",
    });

    this.handleSearchGoalWeb({ dateFilter: date });
  }

  handleCancelFilter() {
    this.setState({
      isFiltered: false,
      nameFilter: "",
      dateFilter: null,
      filterVisible: false,
    });
    this.handleGetGoalListWeb();
  }

  handleNavigateWithProps(goal: Goal) {
    this.props.navigation.navigate("GoalCreate", {
      goalId: goal.id,
    });
  }

  handleChangeDate(event: ChangeEvent<HTMLTextAreaElement>) {
    this.handleSelectDate(event.target.value);
  }

  handleChangeSearch(event: ChangeEvent<HTMLTextAreaElement>) {
    this.handleChangeText(event.target.value);
  }

  handleGoBack() {
    this.props.navigation.navigate("GoalManagement");
  }
  // Customizable Area End
}
