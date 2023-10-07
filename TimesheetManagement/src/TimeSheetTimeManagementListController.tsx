import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import moment from "moment";
import { createRef } from "react";
import { FlatList } from "react-native";
import { Calendar, DateObject } from "react-native-calendars";
import * as lodash from "lodash";
import { JsonObjToQueryString } from "../../../components/src/JsonObjToQueryString";
import { getStorageData } from "framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export interface TimeList {
  id: string;
  type: string;
  attributes: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    logs: {
      data: {
        id: string;
        type: string;
        attributes: {
          id: string;
          title: string;
          description: string;
          created_by: string;
          updated_by: string;
          start_time: string;
          end_time: string;
          hours: string;
          account_id: string;
          timesheet_task_id: string;
        };
      }[];
    };
    total_logged_hours: string;
  };
}

export interface DatesOfMonth {
  date: string;
  dayName: string;
}

export interface MonthsNameList {
  monthNumber: string;
  monthName: string;
}

export interface PageItem {
  label: number;
  isSelected: boolean;
}

interface S {
  // Customizable Area Start
  txtSearchInputValue: string;
  token: string;
  isInternetConnected: boolean;
  timeList: TimeList[];
  selectedTime: string;
  isCalenderOpen: boolean;
  selectedYear: string;
  selectedMonth: string;
  selectedMonthName: string;
  selectedDate: string;
  selectedMonthDate: DatesOfMonth[];
  isModalShow: boolean;
  monthNames: MonthsNameList[];
  responseMessage: string;
  currentPage: number;
  totalPage: number;
  displayPages: PageItem[];
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class TimeSheetTimeManagementListController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  listTimeManagementApiCallId: string = "";
  dailyFlatListRef = createRef<FlatList<DatesOfMonth>>();
  monthlyFlatListRef = createRef<FlatList<MonthsNameList>>();
  timer: null | ReturnType<typeof setTimeout> = null;
  calendarRef = createRef<Calendar>();
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
      token: "",
      isInternetConnected: false,
      isModalShow: false,
      txtSearchInputValue: "",
      selectedTime: configJSON.labelDaily,
      isCalenderOpen: false,
      selectedYear: "",
      selectedMonth: "",
      selectedMonthName: "",
      selectedDate: "",
      timeList: [],
      selectedMonthDate: [],
      monthNames: [
        { monthNumber: "1", monthName: "January" },
        { monthNumber: "2", monthName: "February" },
        { monthNumber: "3", monthName: "March" },
        { monthNumber: "4", monthName: "April" },
        { monthNumber: "5", monthName: "May" },
        { monthNumber: "6", monthName: "June" },
        { monthNumber: "7", monthName: "July" },
        { monthNumber: "8", monthName: "August" },
        { monthNumber: "9", monthName: "September" },
        { monthNumber: "10", monthName: "October" },
        { monthNumber: "11", monthName: "November" },
        { monthNumber: "12", monthName: "December" },
      ],
      responseMessage: "",
      currentPage: 0,
      totalPage: 0,
      displayPages: [],
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Received", message);

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage),
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
      );
      if (
        this.listTimeManagementApiCallId !== null &&
        apiRequestCallId === this.listTimeManagementApiCallId
      ) {
        if (responseJson && !responseJson.error && !responseJson.errors) {
          let pageCount = lodash.get(
            responseJson,
            "meta.pagination.total_pages",
            0,
          );
          let _currentPage = lodash.get(
            responseJson,
            "meta.pagination.current_page",
            0,
          );
          this.setState({
            timeList: lodash.get(responseJson, "requests.data", []),
            responseMessage: lodash.get(responseJson, "message", ""),
            currentPage: _currentPage,
            totalPage: pageCount,
            displayPages: this.generateArrayUsingMathCeil(
              pageCount,
              _currentPage,
            ),
          });
        } else {
          this.parseApiErrorResponse(responseJson);
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    NetInfo.addEventListener(async (state: NetInfoState) => {
      this.setState({
        isInternetConnected: state.isConnected,
      });
    });
    const _token = await getStorageData("TOKEN");
    this.setState(
      {
        token: _token,
      },
      () => {
        this.getCurrentDates();
      },
    );
  }

  async componentWillUnmount() {
    await super.componentWillUnmount();
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  txtSearchInputChange = {
    onChangeText: (text: string) => {
      this.setState({ txtSearchInputValue: text });
    },
  };

  openWorkerDetails(taskData: TimeList) {
    this.props.navigation.push("TimeSheetWorkerLogs", {
      taskData: JSON.stringify(taskData),
    });
  }

  generateArrayUsingMathCeil(pages: number, current: number) {
    const count = Math.ceil(pages - 1);
    const resultArray: PageItem[] = Array.from(
      { length: count + 1 },
      (_value, position) => ({
        label: 1 + position,
        isSelected: position === current - 1,
      }),
    );

    return resultArray;
  }

  getSplitHoursAndMinutes(timing: string) {
    let splitTime = timing.split(":");
    let time = "";

    if (splitTime[0]) {
      time =
        time +
        splitTime[0] +
        (parseInt(splitTime[0], 10) <= 1 ? " Hour " : " Hours ");
    }

    if (splitTime[1]) {
      time =
        time +
        splitTime[1] +
        (parseInt(splitTime[1], 10) <= 1 ? " Minute " : " Minutes ");
    }

    if (splitTime[2]) {
      time =
        time +
        splitTime[2] +
        (parseInt(splitTime[2], 10) <= 1 ? " Second " : " Seconds");
    }

    return time;
  }

  setCurrentPage(_item: PageItem, _position: number) {
    if (_item.isSelected) {
      return;
    }
    let copiedArray = [...this.state.displayPages];
    copiedArray.forEach((value: PageItem, position: number) => {
      value.isSelected = position === _position;
      return value;
    });

    this.setState(
      {
        currentPage: _position,
        displayPages: copiedArray,
        responseMessage: "",
      },
      () => {
        this.getTaskList();
      },
    );
  }

  setDailySelectedDate = (text: string) => {
    if (text !== this.state.selectedDate) {
      this.setState(
        {
          selectedDate: text,
          currentPage: 0,
          totalPage: 0,
          responseMessage: "",
        },
        () => {
          this.getTaskList();
        },
      );
    }
  };

  setMonthlySelectedNameNumber = (item: MonthsNameList) => {
    if (item.monthNumber !== this.state.selectedMonth) {
      this.setState(
        {
          selectedMonth: item.monthNumber,
          selectedMonthName: item.monthName,
          currentPage: 0,
          totalPage: 0,
          responseMessage: "",
        },
        () => {
          this.getTaskList();
        },
      );
    }
  };

  setDatePositionByScroll = async () => {
    const { selectedMonthDate } = this.state;
    for (let position = 0; position < selectedMonthDate.length; position++) {
      let date = selectedMonthDate[position].date;
      if (date === this.state.selectedDate) {
        await this.dailyFlatListRef.current?.scrollToIndex({
          animated: true,
          index: position,
        });
        break;
      }
    }
  };

  setMonthPositionByScroll = async () => {
    const { monthNames } = this.state;
    for (let position = 0; position < monthNames.length; position++) {
      let date = monthNames[position].monthNumber;
      if (date === this.state.selectedMonth) {
        await this.monthlyFlatListRef.current?.scrollToIndex({
          animated: true,
          index: position,
        });
        break;
      }
    }
  };

  setSelectionTime = async (text: string) => {
    const listAllDays = await this.getDaysArray(
      parseInt(this.state.selectedYear, 10),
      parseInt(this.state.selectedMonth, 10),
    );

    this.setState({
      selectedMonthDate: listAllDays,
    });

    if (text !== this.state.selectedTime) {
      this.setState(
        {
          selectedTime: text,
          currentPage: 0,
          totalPage: 0,
          responseMessage: "",
        },
        () => {
          if (this.timer) {
            clearTimeout(this.timer);
          }
          this.timer = setTimeout(async () => {
            if (text === configJSON.labelDaily) {
              await this.setDatePositionByScroll();
              this.getTaskList();
            } else {
              await this.setMonthPositionByScroll();
              this.getTaskList();
            }
          }, 100);
        },
      );
    }
  };

  getTaskList = () => {
    if (!this.state.isInternetConnected) {
      this.showAlert("Task Details", "Please check your internet connection.");
    } else {
      let { selectedTime, selectedDate, selectedMonth, selectedYear } =
        this.state;
      let startDate = "";
      let endDate = "";
      if (selectedTime === configJSON.labelDaily) {
        let date =
          selectedYear +
          "-" +
          (parseInt(selectedMonth, 10) < 10
            ? "0" + selectedMonth
            : selectedMonth) +
          "-" +
          (parseInt(selectedDate, 10) < 10 ? "0" + selectedDate : selectedDate);
        startDate = moment(date).format("YYYY-MM-DD");
        endDate = moment(date).add(1, "day").format("YYYY-MM-DD");
      } else {
        let month = parseInt(selectedMonth, 10);
        month = month - 1;
        let year =
          month === -1
            ? parseInt(selectedYear, 10) - 1
            : parseInt(selectedYear, 10);
        startDate = moment()
          .date(1)
          .month(month)
          .year(year)
          .format("YYYY-MM-DD");

        const lastDate = moment().date(1).month(month).daysInMonth();
        endDate = moment(
          lastDate + "/" + (month + 1) + "/" + year,
          "DD/MM/YYYY",
        ).format("YYYY-MM-DD");
      }

      const header = {
        "Content-Type": configJSON.validationApiContentType,
        "token": this.state.token,
      };

      const queryString = JsonObjToQueryString({
        page: this.state.currentPage + 1,
        per_page: 10,
        aggregate_by_user: true,
        start_date: startDate,
        end_date: endDate,
      });

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage),
      );

      this.listTimeManagementApiCallId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.listTimeManagementLogsApiEndPoint + `?${queryString}`,
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header),
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.apiMethodTypePost,
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
    }
  };

  getDaysArray = async (year: number, month: number) => {
    const monthIndex = month - 1;
    const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(year, monthIndex, 1);
    let result = [];
    while (date.getMonth() === monthIndex) {
      result.push({
        date: date.getDate().toString(),
        dayName: names[date.getDay()],
      });
      date.setDate(date.getDate() + 1);
    }
    return result;
  };

  getCurrentDates = () => {
    const { monthNames } = this.state;
    const current = new Date();
    const today = current.getDate();
    let position = lodash.findIndex(
      monthNames,
      function (data: MonthsNameList) {
        return (
          data.monthNumber.toString() === (current.getMonth() + 1).toString()
        );
      },
    );

    this.setState(
      {
        selectedYear: current.getFullYear().toString(),
        selectedMonth: (current.getMonth() + 1).toString(),
        selectedDate: today.toString(),
        selectedMonthName: monthNames[position].monthName,
      },
      async () => {
        const listAllDays = await this.getDaysArray(
          parseInt(this.state.selectedYear, 10),
          parseInt(this.state.selectedMonth, 10),
        );
        this.setState(
          {
            selectedMonthDate: listAllDays,
            currentPage: 0,
            totalPage: 0,
            responseMessage: "",
          },
          async () => {
            await this.setDatePositionByScroll();
            this.getTaskList();
          },
        );
      },
    );
  };
  setCalendarSelectionData = async (selection: DateObject) => {
    const listAllDays = await this.getDaysArray(
      selection.year,
      selection.month,
    );
    const { monthNames } = this.state;
    let position = lodash.findIndex(
      monthNames,
      function (data: MonthsNameList) {
        return data.monthNumber.toString() === selection.month.toString();
      },
    );
    this.setState(
      {
        selectedDate: selection.day.toString(),
        selectedMonth: selection.month.toString(),
        selectedYear: selection.year.toString(),
        selectedMonthName: monthNames[position].monthName,
        selectedMonthDate: listAllDays,
        isModalShow: false,
        currentPage: 0,
        totalPage: 0,
        responseMessage: "",
      },
      async () => {
        await this.setDatePositionByScroll();
        this.getTaskList();
      },
    );
  };

  setModalOpenClose(isOpen: boolean) {
    this.setState({ isModalShow: isOpen });
  }
  // Customizable Area End
}
