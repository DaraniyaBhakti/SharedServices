import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import {
  getStorageData,
  setStorageData,
} from "../../../framework/src/Utilities";
import {
  PostListItem,
  PostListResponse,
  UserListItem,
  UserListResponse,
} from "./domain/mentions.dto";
import { handleResponseMessage } from "../../../framework/src/Helpers/handle-response-message";
import createRequestMessage from "../../../framework/src/Helpers/create-request-message";
import { Platform } from "react-native";
// Customizable Area End

export const configJSON = require("./config");
export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  postDataList: PostListItem[];
  loading: boolean;
  userList: UserListItem[];
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class MentionstaggingController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiEmailLoginCallId: string | null = "";
  apiPostList: string | null = "";
  apiUserList: string | null = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];
    // Customizable Area End

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      postDataList: [],
      loading: false,
      userList: [],
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

      switch (apiRequestCallId) {
        case this.apiEmailLoginCallId: {
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: async () => {
              await this.getPostList(responseJson.meta.token);
              await setStorageData("login_token", responseJson.meta.token);
              await setStorageData(
                "account_Id",
                responseJson.meta.id.toString(),
              );
            },
            onFail: () => this.showAlert(`User Login Failed`, "Please retry!"),
          });

          break;
        }

        case this.apiPostList: {
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: async () => {
              const postDataArray: PostListItem[] = responseJson.data.map(
                (element: PostListResponse) => ({
                  id: element.id,
                  body: element.attributes.body,
                  location: element.attributes.location,
                  title: element.attributes.name,
                  description: element.attributes.description,
                  accountId: element.attributes.account_id,
                  mentions_ids: element.attributes.mentions_ids,
                  tags_ids: element.attributes.tags_ids,
                }),
              );
              this.setState({ postDataList: postDataArray, loading: false });
              await setStorageData("postData", JSON.stringify(postDataArray));
            },
            onFail: () =>
              this.showAlert(`Fetching post list failed`, "Please retry!"),
          });
          break;
        }

        case this.apiUserList: {
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: () => {
              this.setUserListApiResponse(responseJson.data);
            },
            onFail: () =>
              this.showAlert(`Fetching user list failed`, "Please retry!"),
          });

          break;
        }
      }
    }
    // Customizable Area End
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start
  doEmailLogIn = async () => {
    this.setState({ loading: true });
    const httpBody = {
      data: {
        attributes: {
          email: "arvind1@gmail.com",
          password: "Password",
        },
        type: "email_account",
      },
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.apiEmailLoginCallId = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.loginApiEndPoint,
      method: configJSON.postApiMethod,
      body: JSON.stringify(httpBody),
    });
  };

  getPostList = async (token: string) => {
    this.setState({ loading: true });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.apiPostList = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.postsApiEndPoint,
      method: configJSON.getApiMethod,
      token: token,
    });
  };

  getUserList = async () => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.apiUserList = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.usersListApiEndPoint,
      method: configJSON.getApiMethod,
    });
  };

  setUserListApiResponse = (userListResponseJson: UserListResponse[]) => {
    const usersArray = userListResponseJson.map((element: UserListResponse) => {
      const first_name =
        element.attributes.first_name !== null
          ? element.attributes.first_name.replace(/^\w/, (word: string) =>
              word.toUpperCase(),
            )
          : "User";
      const last_name =
        element.attributes.last_name !== null
          ? element.attributes.last_name.replace(/^\w/, (word: string) =>
              word.toUpperCase(),
            )
          : element.id;

      return {
        id: element.id,
        name: first_name + "-" + last_name,
      };
    });
    this.setState({ userList: usersArray, loading: false });
  };

  async componentDidMount() {
    await this.doEmailLogIn();
    await this.getUserList();
    if (Platform.OS !== "web") {
      return this.props.navigation.addListener("willFocus", async () => {
        this.setState({
          postDataList: JSON.parse(await getStorageData("postData")),
        });
      });
    }
  }

  navigateToPostDetail(postID: string) {
    setStorageData("postId", postID);
    this.props.navigation.navigate(configJSON.labelMentionsTaggingPostDetails, {
      postId: postID,
    });
  }

  navigateToAddPost() {
    if (Platform.OS === "web") {
      setStorageData("postId", "0");
      setStorageData("isEditablePost", "false");
    }
    this.props.navigation.navigate(configJSON.labelMentionsTaggingAddPost, {
      isEditablePost: false,
      postId: 0,
    });
  }

  navigateToMentionsTaggingList() {
    this.props.navigation.navigate(configJSON.labelMentionsTaggingList);
  }

  doButtonPressed() {
    let message = new Message(getName(MessageEnum.AccoutLoginSuccess));
    message.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue,
    );
    this.send(message);
  }
  // Customizable Area End
}
