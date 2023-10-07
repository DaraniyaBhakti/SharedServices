import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgDefault } from "./assets";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { getStorageData } from "framework/src/Utilities";
import { ImageSourcePropType } from "react-native";
import * as lodash from "lodash";
import { JsonObjToQueryString } from "../../../components/src/JsonObjToQueryString";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export interface LogList {
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

export interface PageItem {
  label: number;
  isSelected: boolean;
}

export interface WorkerData {
  img: ImageSourcePropType;
  role: string;
  name: string;
  totalHours: string;
  workedHours: string;
}

interface S {
  // Customizable Area Start
  txtSearchInputValue: string;
  token: string;
  isInternetConnected: boolean;
  logList: LogList[];
  workerData: WorkerData;
  responseMessage: string;
  currentPage: number;
  totalPage: number;
  displayPages: PageItem[];
  accountId: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class TimeSheetWorkerLogsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  listTimeManagementApiCallId: string = "";
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
      txtSearchInputValue: "",
      logList: [],
      workerData: {
        img: imgDefault,
        role: "Accountant",
        name: "Ganesh Aacharya",
        totalHours: "103 Hrs",
        workedHours: "9 Hrs",
      },
      responseMessage: "",
      currentPage: 0,
      totalPage: 0,
      displayPages: [],
      accountId: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start

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
            logList: lodash.get(responseJson, "requests.data", []),
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
    const taskData = this.props.navigation.state.params.taskData;
    const details = JSON.stringify(taskData);
    const detail = JSON.parse(details);
    const workerData: WorkerData = {
      img: imgDefault,
      role: "Accountant",
      name:
        lodash.get(detail, "attributes.first_name", "") +
        " " +
        lodash.get(detail, "attributes.last_name", ""),
      totalHours: this.getSplitHoursAndMinutes(
        lodash.get(detail, "attributes.total_logged_hours", 0),
      ),
      workedHours: this.getSplitHoursAndMinutes(
        lodash.get(detail, "attributes.total_logged_hours", 0),
      ),
    };

    this.setState(
      {
        token: _token,
        accountId: lodash.get(detail, "attributes.id", ""),
        workerData,
      },
      () => this.getTaskList(),
    );
  }

  txtSearchInputChange = {
    onChangeText: (text: string) => {
      this.setState({ txtSearchInputValue: text });
    },
  };

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
        (parseInt(splitTime[2], 10) <= 1 ? " Second " : " Seconds ");
    }

    return time;
  }

  getTaskList = async () => {
    if (!this.state.isInternetConnected) {
      this.showAlert("Task Details", "Please check your internet connection.");
    } else {
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        "token": this.state.token,
      };

      const queryString = JsonObjToQueryString({
        page: this.state.currentPage + 1,
        per_page: 1,
        account_id: this.state.accountId,
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
  // Customizable Area End
}
