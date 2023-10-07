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
  allocatedTime: string;
  isInternetConnected: boolean;
  token: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class TimeSheetCreateTaskController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  createTaskApiCallId: string = "";
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
      allocatedTime: "",
      isInternetConnected: false,
      token: "",
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
        this.createTaskApiCallId !== null &&
        apiRequestCallId === this.createTaskApiCallId
      ) {
        if (
          responseJson &&
          responseJson.task_details &&
          !responseJson.error &&
          !responseJson.errors
        ) {
          this.setState(
            { title: "", description: "", allocatedTime: "" },
            () => {
              this.props.navigation.replace("TimeSheetTaskDetails");
            },
          );
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

    this.setState({
      token: _token,
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

  txtAllocatedTimeInputChange = {
    onChangeText: (text: string) => {
      this.setState({ allocatedTime: text.replace(/\D/g, "") });
    },
  };

  cancelTasks = () => {
    this.props.navigation.pop();
  };

  checkValidation = () => {
    let { title, description, allocatedTime } = this.state;

    if (title.trim().length < 3) {
      this.showAlert(
        "Task Create",
        "Please add proper title with minimum 3 character",
      );
      return;
    }

    if (description.trim().length < 3) {
      this.showAlert(
        "Task Create",
        "Please add proper description with minimum 3 character",
      );
      return;
    }

    if (allocatedTime.trim().length === 0) {
      this.showAlert(
        "Task Create",
        "Please add proper hours like 1, 2, 3, 4, 8",
      );
      return;
    }

    this.createTasks();
  };

  createTasks = () => {
    if (!this.state.isInternetConnected) {
      this.showAlert("Task Create", "Please check your internet connection.");
    } else {
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        "token": this.state.token,
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage),
      );
      this.createTaskApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.createTaskApiEndPoint,
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header),
      );

      const httpBody: object = {
        task: {
          title: this.state.title,
          description: this.state.description,
          planned_hours: this.state.allocatedTime,
          status: "in_progress",
          name: "testUser",
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
