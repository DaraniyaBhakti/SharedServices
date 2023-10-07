import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { parseValue, PartType } from "react-native-controlled-mentions";
import {
  getStorageData,
  removeStorageData,
  setStorageData,
} from "../../../framework/src/Utilities";
import {
  MentionPartType,
  PatternPartType,
} from "react-native-controlled-mentions/dist/types";
import { Alert, Platform } from "react-native";
import {
  PostListItem,
  UserListResponse,
  UserListTaggedItem,
} from "./domain/mentions.dto";
import { handleResponseMessage } from "../../../framework/src/Helpers/handle-response-message";
import createRequestMessage from "../../../framework/src/Helpers/create-request-message";
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
  isUserModalVisible: boolean;
  taggedUserListString: string;
  postText: string;
  usersList: UserListTaggedItem[];
  isEditablePost: boolean;
  location: string;
  errorPostTextFlag: boolean;
  userMentionedList: number[];
  userTaggedList: number[];
  accountId: number;
  loading: boolean;
  postId: number;
  postData: PostListItem;
  postTitle: string;
  postDescription: string;
  userName: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class MentionstaggingAddPostController extends BlockComponent<
  Props,
  S,
  SS
  // TestProps
> {
  // Customizable Area Start
  apiCreatePost: string | null = "";
  apiAddPostUserList: string | null = "";
  apiUpdatePost: string | null = "";
  apiAddPostDetail: string | null = "";
  apiDeletePost: string | null = "";
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
      isUserModalVisible: false,
      taggedUserListString: "",
      postText: "",
      usersList: [],
      isEditablePost: false,
      location: "",
      errorPostTextFlag: false,
      userMentionedList: [],
      userTaggedList: [],
      accountId: 0,
      loading: false,
      postId: 0,
      postData: {
        id: "",
        body: "",
        location: "",
        title: "",
        description: "",
        accountId: 0,
        mentions_ids: [],
        tags_ids: [],
      },
      postTitle: "",
      postDescription: "",
      userName: "",
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
        case this.apiCreatePost: {
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: async () => {
              let post = {
                id: responseJson.data.id,
                body: responseJson.data.attributes.body,
                location: responseJson.data.attributes.location,
                description: responseJson.data.attributes.description,
                title: responseJson.data.attributes.name,
                accountId: responseJson.data.attributes.account_id,
                mentions_ids: responseJson.data.attributes.mentions_ids,
                tags_ids: responseJson.data.attributes.tags_ids,
              };
              this.setState({
                postId: responseJson.data.id,
                postData: post,
                loading: false,
              });
            },
            onFail: () =>
              this.showAlert(`Post not created successfully.`, "Please retry!"),
          });

          break;
        }

        case this.apiAddPostUserList: {
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

        case this.apiUpdatePost: {
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: () => {
              this.setState({ loading: false });
            },
            onFail: () =>
              this.showAlert(`Post not updated successfully`, "Please retry!"),
          });

          break;
        }

        case this.apiDeletePost: {
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: () => {
              this.setState({ loading: false });
            },
            onFail: () =>
              this.showAlert(`Post not deleted successfully`, "Please retry!"),
          });

          break;
        }

        case this.apiAddPostDetail: {
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: () => {
              this.setState({
                postText: responseJson.data.attributes.body,
                location: responseJson.data.attributes.location,
                accountId: responseJson.data.attributes.account_id,
                postDescription: responseJson.data.attributes.description,
                postTitle: responseJson.data.attributes.name,
                loading: false,
              });
              let userArray = this.state.usersList.map((item) => {
                if (
                  responseJson.data.attributes.tags_ids.includes(
                    parseInt(item.id, 10),
                  )
                ) {
                  return {
                    ...item,
                    isTagged: true,
                  };
                } else {
                  return item;
                }
              });
              this.setState({ usersList: userArray }, () =>
                this.taggedPeopleList(),
              );
            },
            onFail: () =>
              this.showAlert(`Get Post Detail Failed`, "Please retry!"),
          });
          break;
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  createPost = async () => {
    const object = {
      data: {
        attributes: {
          name: this.state.postTitle,
          description: this.state.postDescription,
          body: this.state.postText,
          location: this.state.location,
          mentions_ids: this.state.userMentionedList,
          tags_ids: this.state.userTaggedList,
        },
      },
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.apiCreatePost = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.postsApiEndPoint,
      method: configJSON.postApiMethod,
      token: await getStorageData("login_token"),
      body: JSON.stringify(object),
    });
  };

  updatePost = async () => {
    this.setState({ loading: true });

    const object = {
      data: {
        attributes: {
          name: this.state.postTitle,
          description: this.state.postDescription,
          body: this.state.postText,
          location: this.state.location,
          mentions_ids: this.state.userMentionedList,
          tags_ids: this.state.userTaggedList,
        },
      },
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.apiUpdatePost = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.postsApiEndPoint}/${this.state.postId}`,
      method: configJSON.putApiMethod,
      token: await getStorageData("login_token"),
      body: JSON.stringify(object),
    });
  };

  deletePostItem = async () => {
    this.setState({ loading: true });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.apiDeletePost = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.postsApiEndPoint}/${this.state.postId}`,
      method: configJSON.deleteApiMethod,
      token: await getStorageData("login_token"),
    });
  };

  getPostDetails = async (postId: string) => {
    this.setState({ loading: true });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.apiAddPostDetail = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.postsApiEndPoint}/${postId}`,
      method: configJSON.getApiMethod,
      token: await getStorageData("login_token"),
    });
  };

  getUserList = async () => {
    this.setState({ loading: true });
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.apiAddPostUserList = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.usersListApiEndPoint,
      method: configJSON.getApiMethod,
    });
  };

  setUserListApiResponse = async (userListResponse: UserListResponse[]) => {
    const usersArray = userListResponse.map((element: UserListResponse) => {
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
        email: element.attributes.email,
        isTagged: false,
      };
    });
    this.setState({ usersList: usersArray });
    let isEditablePost = false;
    let postId = 0;
    if (Platform.OS === "web") {
      postId = await JSON.parse(await getStorageData("postId"));
      isEditablePost = await JSON.parse(await getStorageData("isEditablePost"));
    } else {
      isEditablePost = this.props.navigation.state.params.isEditablePost;
      postId = this.props.navigation.state.params.postId;
    }
    if (postId !== 0) {
      await this.getPostDetails(postId.toString());
    }
    this.setState({
      loading: false,
      isEditablePost: isEditablePost,
      postId: postId,
      accountId: await JSON.parse(await getStorageData("account_Id")),
    });
  };

  async componentWillUnmount() {
    await removeStorageData("postId");
    await removeStorageData("isEditablePost");
  }
  async componentDidMount() {
    await super.componentDidMount();

    await this.getUserList();
  }

  mentionPartType: MentionPartType = {
    trigger: "@",
  };

  urlPatternPartType: PatternPartType = {
    pattern:
      /(https?:\/\/|www\.)[-\w@:%.+~#=]{1,256}\.(xn--)?[a-z0-9-]{2,20}\b([-\w@:%+[\],.~#?&/=]*[-\w@:%+\]~#?&/=])*/gi,
  };

  partTypes: PartType[] = [this.mentionPartType, this.urlPatternPartType];

  taggedPeopleList = () => {
    let taggedUserList: string = "";
    this.state.usersList.forEach((item) => {
      if (item.isTagged) {
        taggedUserList = taggedUserList + "@" + item.name + ", ";
      }
    });
    this.setState({
      taggedUserListString: taggedUserList.substring(
        0,
        taggedUserList.length - 2,
      ),
    });
  };

  validatePostData = async () => {
    let isValidated = true;
    let userMentionedArray = [...this.state.userMentionedList];
    const { parts } = parseValue(this.state.postText, this.partTypes);
    parts.forEach((item) => {
      if (item.partType !== undefined && item?.data?.id !== undefined) {
        userMentionedArray.push(parseInt(item.data.id, 10));
      }
    });
    this.setState({ userMentionedList: userMentionedArray });
    let useTaggedArray = [...this.state.userTaggedList];
    this.state.usersList.forEach((item) => {
      if (item.isTagged) {
        useTaggedArray.push(parseInt(item.id, 10));
      }
    });
    this.setState({ userTaggedList: useTaggedArray });
    if (this.state.postText === "") {
      isValidated = false;
      this.setState({ errorPostTextFlag: true });
    }
    if (this.state.postTitle === "") {
      isValidated = false;
      this.setState({ errorPostTextFlag: true });
    }
    if (isValidated) {
      setTimeout(async () => {
        this.state.isEditablePost
          ? await this.updatePost()
          : await this.createPost();
      }, 1000);
      setTimeout(async () => {
        await this.setValidatedData();
      }, 2000);
    } else {
      Alert.alert("Please enter proper data");
    }
  };

  setValidatedData = async () => {
    let postData = await JSON.parse(await getStorageData("postData"));
    if (this.state.isEditablePost) {
      postData = postData.map((item: { id: number }) => {
        if (item.id === this.state.postId) {
          return {
            ...item,
            body: this.state.postText,
            location: this.state.location,
            title: this.state.postTitle,
            description: this.state.postDescription,
            mentions_ids: this.state.userMentionedList,
            tags_ids: this.state.userTaggedList,
          };
        }
        return item;
      });
    } else {
      const postDataItem = {
        id: this.state.postData.id,
        body: this.state.postData.body,
        location: this.state.postData.location,
        title: this.state.postData.title,
        description: this.state.postData.description,
        accountId: this.state.accountId,
        mentions_ids: this.state.userMentionedList,
        tags_ids: this.state.userTaggedList,
      };
      postData.push(postDataItem);
    }
    await setStorageData("postData", JSON.stringify(postData));
    this.props.navigation.navigate("Mentionstagging");
  };
  deletePost = async () => {
    await this.deletePostItem();
    let postData = await JSON.parse(await getStorageData("postData"));

    postData.forEach((item: { id: number }) => {
      if (item.id === this.state.postId) {
        let index1 = postData.indexOf(item);
        postData.splice(index1, 1);
      }
    });
    await setStorageData("postData", JSON.stringify(postData));
    this.props.navigation.navigate("Mentionstagging");
  };

  checkBoxOnPress = (item: { item: UserListTaggedItem; index: number }) => {
    this.state.usersList[item.index].isTagged =
      !this.state.usersList[item.index].isTagged;
    this.taggedPeopleList();
  };

  setPostTitle(text: string) {
    this.setState({ postTitle: text });
  }

  setDescription(text: string) {
    this.setState({ postDescription: text });
  }

  setPostText(text: string) {
    this.setState({ postText: text });
  }

  setLocation(text: string) {
    this.setState({ location: text });
  }

  setUserModalVisibility(flag: boolean) {
    this.setState({ isUserModalVisible: flag });
  }

  navigateToMentionstagging() {
    this.props.navigation.navigate(configJSON.Mentionstagging);
  }

  // Customizable Area End
}
