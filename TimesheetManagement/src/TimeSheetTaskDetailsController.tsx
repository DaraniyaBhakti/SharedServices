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
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export interface Members {
  key: string;
  img: ImageSourcePropType;
}

export interface MembersData {
  key: string;
  img: ImageSourcePropType;
  name: string;
  role: string;
  workedHours: string;
  startDate: string;
}

export interface TaskDetail {
  id: number;
  img: ImageSourcePropType;
  taskName: string;
  allocatedTime: string;
  consumedTime: string;
  desc: string;
  members: Members[];
  membersData: MembersData[];
}

interface S {
  // Customizable Area Start
  isInternetConnected: boolean;
  token: string;
  taskDetail: TaskDetail;
  taskId: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class TimeSheetTaskDetailsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  taskDetailsApiCallId: string = "";
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
      isInternetConnected: false,
      token: "",
      taskId: "",
      taskDetail: {
        id: 1,
        img: imgDefault,
        taskName: "Task 1",
        allocatedTime: "120 Hrs",
        consumedTime: "24 Hrs",
        desc: "Lorem Ipsum sample text lorem ipsum is a sample text Lorem Ipsum is a sample text lorem Ipsum .ipsum is a sample text Lorem Ipsum .",
        members: [],
        membersData: [],
      },
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
        this.taskDetailsApiCallId !== null &&
        apiRequestCallId === this.taskDetailsApiCallId
      ) {
        if (responseJson && !responseJson.error && !responseJson.errors) {
          this.setState({ taskDetail: responseJson });
        } else {
          const errorResponse = message.getData(
            getName(MessageEnum.RestAPIResponceErrorMessage),
          );
          this.parseApiCatchErrorResponse(errorResponse);
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
    const _token = await getStorageData("TOKEN");
    const taskData = this.props.navigation.state.params.taskData;
    const details = JSON.stringify(taskData);
    const detail = JSON.parse(details);
    const workerData: TaskDetail = {
      img: imgDefault,
      id: detail.id,
      taskName: detail.title,
      allocatedTime: detail.planned_hours + "Hrs",
      consumedTime: "2Hrs",
      desc: detail.description,
      members: [
        {
          key: "1",
          img: imgDefault,
        },
        {
          key: "2",
          img: imgDefault,
        },
      ],
      membersData: [
        {
          key: "1",
          img: imgDefault,
          name: "Ganesh Acharya",
          role: "Admin",
          workedHours: "2Hrs",
          startDate: "01/01/2023",
        },
      ],
    };
    this.setState(
      {
        taskId: detail.id,
        taskDetail: workerData,
        token: _token,
      },
      () => this.getTaskDetails(),
    );
  }

  openCreateLog(taskId: number) {
    this.props.navigation.push("TimeSheetCreateLog", {
      taskId: JSON.stringify(taskId),
    });
  }

  getTaskDetails = () => {
    if (!this.state.isInternetConnected) {
      this.showAlert("Task Details", "Please check your internet connection.");
    } else {
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        "token": this.state.token,
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage),
      );
      this.taskDetailsApiCallId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.listTaskApiEndPoint + "/" + this.state.taskId,
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header),
      );
      let httpBody: object = {
        tasks: {
          page: "1",
          per_page: "2",
        },
      };
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(httpBody),
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.apiMethodTypeGet,
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
    }
  };
  // Customizable Area End
}
