import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { getStorageData } from "framework/src/Utilities";
import { ImageSourcePropType } from "react-native";
import { JsonObjToQueryString } from "../../../components/src/JsonObjToQueryString";
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

export interface TaskList {
  id: number;
  title: string;
  planned_hours: number;
  name: string;
  description: string;
  is_active: boolean;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
  status: string;
  members?: {
    key: string;
    img: ImageSourcePropType;
  }[];
}

interface S {
  // Customizable Area Start
  txtSearchInputValue: string;
  taskList: TaskList[];
  token: string;
  isInternetConnected: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class TimeSheetTaskListController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  listTaskApiCallId: string = "";
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
      taskList: [],
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
        this.listTaskApiCallId !== null &&
        apiRequestCallId === this.listTaskApiCallId
      ) {
        if (responseJson && !responseJson.error && !responseJson.errors) {
          this.setState({ taskList: responseJson });
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
    const _token = await getStorageData("TOKEN");
    this.setState(
      {
        token: _token,
      },
      () => {
        this.getTaskList();
      },
    );
  }

  txtSearchInputChange = {
    onChangeText: (text: string) => {
      this.setState({ txtSearchInputValue: text });
    },
  };

  openCreateTask() {
    this.props.navigation.navigate("TimeSheetCreateTask");
  }

  openTaskDetails(task: TaskList) {
    this.props.navigation.push("TimeSheetTaskDetails", {
      taskData: JSON.stringify(task),
    });
  }

  getTaskList = () => {
    if (!this.state.isInternetConnected) {
      this.showAlert("Task Details", "Please check your internet connection.");
    } else {
      const header = {
        token: this.state.token,
      };
      const queryString = JsonObjToQueryString({
        page: 1,
        per_page: 10,
      });
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage),
      );
      this.listTaskApiCallId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.listTaskApiEndPoint + `?${queryString}`,
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header),
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
