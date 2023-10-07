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
import { getStorageData } from "framework/src/Utilities";
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
  title: string;
  description: string;
  isInternetConnected: boolean;
  token: string;
  isStartDatePressed: boolean;
  isEndDatePressed: boolean;
  isDateTimeModalShow: boolean;
  startDate: string;
  endDate: string;
  taskId: number;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class TimeSheetCreateLogController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  createLogApiCallId: string = "";
  dateFormat: string = "ddd MMM DD YYYY HH:mm:ss ZZ";
  parsedDateFormat: string = "YYYY-MM-DD hh:mm:ss a";
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
      title: "",
      description: "",
      isInternetConnected: false,
      token: "",
      isStartDatePressed: false,
      isEndDatePressed: false,
      isDateTimeModalShow: false,
      startDate: "",
      endDate: "",
      taskId: 0,
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
        this.createLogApiCallId !== null &&
        apiRequestCallId === this.createLogApiCallId
      ) {
        if (
          responseJson &&
          responseJson.log &&
          !responseJson.error &&
          !responseJson.errors
        ) {
          this.setState({
            title: "",
            description: "",
            startDate: "",
            endDate: "",
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
    NetInfo.addEventListener((state: NetInfoState) => {
      this.setState({
        isInternetConnected: state.isConnected,
      });
    });

    const taskId = this.props.navigation.state.params.taskId;
    const _token = await getStorageData("TOKEN");

    this.setState({
      token: _token,
      taskId: taskId,
    });
  }

  txtTitleInputChange = {
    onChangeText: (text: string) => {
      this.setState({ title: text });
    },
  };

  txtDescriptionInputChange = {
    onChangeText: (text: string) => {
      this.setState({ description: text });
    },
  };

  cancelTasks = () => {
    this.props.navigation.pop();
  };

  handleConfirm = (date: Date) => {
    let date_moment = moment(date, this.dateFormat);
    let value = date_moment.format(this.parsedDateFormat);

    if (this.state.isStartDatePressed) {
      this.setState({ startDate: value });
    } else if (this.state.isEndDatePressed) {
      this.setState({ endDate: value });
    }

    this.setState({ isDateTimeModalShow: false });
  };

  handleCancel() {
    this.setState({ isDateTimeModalShow: false });
  }

  pressStartDate() {
    this.setState({
      isDateTimeModalShow: true,
      isStartDatePressed: true,
      isEndDatePressed: false,
    });
  }
  pressEndDate() {
    this.setState({
      isDateTimeModalShow: true,
      isStartDatePressed: false,
      isEndDatePressed: true,
    });
  }

  checkValidation = () => {
    let { title, description, startDate, endDate } = this.state;

    if (title.trim().length < 3) {
      this.showAlert(
        "Log Create",
        "Please add proper title with minimum 3 character",
      );
      return;
    }

    if (description.trim().length < 3) {
      this.showAlert(
        "Log Create",
        "Please add proper description with minimum 3 character",
      );
      return;
    }

    if (startDate.trim().length === 0) {
      this.showAlert("Log Create", "Please select Start Date");
      return;
    }

    if (endDate.trim().length === 0) {
      this.showAlert("Log Create", "Please select End Date");
      return;
    } else {
      let startD = moment(startDate, this.parsedDateFormat);
      let endD = moment(endDate, this.parsedDateFormat);
      let timeDifference = endD.diff(startD, "milliseconds", false);
      if (timeDifference <= 0) {
        this.showAlert("Log Create", "End Date must be higher than Start Date");
        return;
      }
    }

    this.createLogs();
  };

  createLogs = () => {
    if (!this.state.isInternetConnected) {
      this.showAlert("Log Create", "Please check your internet connection.");
    } else {
      let startD = moment(this.state.startDate, this.parsedDateFormat);
      let endD = moment(this.state.endDate, this.parsedDateFormat);
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        "token": this.state.token,
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage),
      );

      this.createLogApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.listDetailsLogsApiEndPoint,
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header),
      );

      let httpBody: object = {
        log: {
          title: this.state.title,
          description: this.state.description,
          start_time: startD,
          end_time: endD,
          account_id: "129",
          timesheet_task_id: "42",
        },
      };

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(httpBody),
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
