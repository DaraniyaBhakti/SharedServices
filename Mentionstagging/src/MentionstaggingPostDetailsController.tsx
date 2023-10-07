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
  removeStorageData,
  setStorageData,
} from "../../../framework/src/Utilities";
import {
  parseValue,
  PartType,
  replaceMentionValues,
} from "react-native-controlled-mentions";
import {
  MentionPartType,
  PatternPartType,
} from "react-native-controlled-mentions/dist/types";
import {
  CommentListItem,
  CommentListResponse,
  UserListItem,
  UserListResponse,
} from "./domain/mentions.dto";
import { handleResponseMessage } from "../../../framework/src/Helpers/handle-response-message";
import { createRequestMessage } from "../../../framework/src/Helpers/create-request-message";
import { Platform } from "react-native";
export const configJSON = require("./config");
// Customizable Area End

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
  usersList: UserListItem[];
  commentsData: CommentListItem[];
  commentText: string;
  postId: number;
  location: string;
  accountId: number;
  userName: string;
  userAccountId: number;
  loading: boolean;
  userMentionedList: number[];
  isEditComment: boolean;
  editableCommentId: number;
  postTitle: string;
  postDescription: string;
  postMentionedList: [];
  postTaggedList: [];
  // Customizable Area End
}

interface SS {
  id: any;
  postId: number;
  // Customizable Area Start
  // Customizable Area End
}

export default class MentionstaggingPostDetailsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiPostDetailUserList: string | null = "";
  apiPostDetail: string | null = "";
  apiAddComment: string | null = "";
  apiCommentList: string | null = "";
  apiDeleteComment: string | null = "";
  apiUpdateComment: string | null = "";
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
      commentsData: [],
      commentText: "",
      postId: 0,
      location: "",
      accountId: 0,
      userName: "",
      userAccountId: 0,
      loading: false,
      userMentionedList: [],
      isEditComment: false,
      editableCommentId: 0,
      postTitle: "",
      postDescription: "",
      postMentionedList: [],
      postTaggedList: [],
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
        case this.apiPostDetail: {
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: () => {
              this.setState({
                postText: replaceMentionValues(
                  responseJson.data.attributes.body,
                  ({ name }) => `@${name}`,
                ),
                location: responseJson.data.attributes.location,
                accountId: responseJson.data.attributes.account_id,
                postTitle: responseJson.data.attributes.name,
                postDescription: responseJson.data.attributes.description,
                postMentionedList: responseJson.data.attributes.mentions_ids,
                postTaggedList: responseJson.data.attributes.tags_ids,
              });
              this.taggedPeopleList(responseJson.data.attributes.tags_ids);
            },
            onFail: () =>
              this.showAlert(`Get Post Detail Failed`, "Please retry!"),
          });
          break;
        }

        case this.apiPostDetailUserList: {
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

        case this.apiAddComment: {
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: async () => {
              let userName = this.state.usersList.filter(
                (element) =>
                  element.id === responseJson.data.attributes.account_id,
              )[0]?.name;
              let commentArray = [
                ...JSON.parse(await getStorageData("commentData")),
              ];
              const object = {
                id: responseJson.data.id,
                name: userName,
                accountID: responseJson.data.attributes.account_id,
                postID: responseJson.data.attributes.post_id,
                commentText: responseJson.data.attributes.comment,
                mentions_ids: responseJson.data.attributes.mentions_ids,
                isDestroyed: false,
                isNewOption: false,
              };
              commentArray.push(object);
              await setStorageData("commentData", JSON.stringify(commentArray));
              this.setState({
                commentsData: commentArray,
                commentText: "",
                loading: false,
              });
              this.showAlert(`Comment added successfully.`, "");
            },
            onFail: () =>
              this.showAlert(
                `Comment not added successfully.`,
                "Please retry!",
              ),
          });

          break;
        }

        case this.apiCommentList: {
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: () => {
              this.setCommentListApiResponse(responseJson.data);
            },
            onFail: () =>
              this.showAlert(`Fetching comment list failed`, "Please retry!"),
          });

          break;
        }

        case this.apiDeleteComment: {
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: () => {
              this.setState({ loading: false });
              this.showAlert(`Comment deleted successfully.`, "");
            },
            onFail: () =>
              this.showAlert(
                `Comment not deleted successfully`,
                "Please retry!",
              ),
          });

          break;
        }

        case this.apiUpdateComment: {
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: () => {
              this.setUpdateCommentApiResponse();
              this.showAlert(`Comment updated successfully.`, "");
            },
            onFail: () =>
              this.showAlert(
                `Comment not updated successfully`,
                "Please retry!",
              ),
          });

          break;
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  getPostDetails = async (postId: string) => {
    this.setState({ loading: true });
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.apiPostDetail = requestMessage.messageId;

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

    this.apiPostDetailUserList = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.usersListApiEndPoint,
      method: configJSON.getApiMethod,
    });
  };

  saveComment = async () => {
    this.setState({ loading: true });

    const object = {
      post_id: this.state.postId,
      comment: this.state.commentText,
      mentions_ids: this.state.userMentionedList,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.apiAddComment = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.commentsApiEndPoint,
      method: configJSON.postApiMethod,
      token: await getStorageData("login_token"),
      body: JSON.stringify(object),
    });
  };

  getCommentList = async () => {
    this.setState({ loading: true });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.apiCommentList = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.commentsApiEndPoint,
      method: configJSON.getApiMethod,
      token: await getStorageData("login_token"),
    });
  };

  deleteCommentItem = async (deleteId: string) => {
    this.setState({ loading: true });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.apiDeleteComment = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.commentsApiEndPoint}/${deleteId}`,
      method: configJSON.deleteApiMethod,
      token: await getStorageData("login_token"),
    });
  };

  updateComment = async () => {
    this.setState({ loading: true });

    const object = {
      comment: this.state.commentText,
      mentions_ids: this.state.userMentionedList,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.apiUpdateComment = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.commentsApiEndPoint}/${this.state.editableCommentId}`,
      method: configJSON.putApiMethod,
      token: await getStorageData("login_token"),
      body: JSON.stringify(object),
    });
  };

  setUserListApiResponse = (userResponseJson: UserListResponse[]) => {
    const usersArray = userResponseJson.map((element: UserListResponse) => {
      const first_name =
        element.attributes.first_name !== null
          ? element.attributes.first_name.replace(/^\w/, (name: string) =>
              name.toUpperCase(),
            )
          : "User";
      const last_name =
        element.attributes.last_name !== null
          ? element.attributes.last_name.replace(/^\w/, (name: string) =>
              name.toUpperCase(),
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
  };

  setUpdateCommentApiResponse = async () => {
    let commentData = [...this.state.commentsData];
    commentData = commentData.map((item) => {
      if (item.id === this.state.editableCommentId.toString()) {
        return {
          ...item,
          commentText: this.state.commentText,
          mentions_ids: this.state.userMentionedList,
        };
      } else {
        return item;
      }
    });
    this.setState({ commentsData: commentData });
    await setStorageData("commentData", JSON.stringify(commentData));
    this.setState({ isEditComment: false, commentText: "", loading: false });
  };

  setCommentListApiResponse = async (
    commentListResponseJson: CommentListResponse[],
  ) => {
    let commentArray: CommentListItem[] = [],
      object: CommentListItem;
    commentListResponseJson.forEach((element: CommentListResponse) => {
      if (element.attributes.post_id === this.state.postId) {
        let userName = this.state.usersList.filter(
          (item) => item.id === element.attributes.account_id.toString(),
        )[0]?.name;
        object = {
          id: element.id,
          name: userName,
          accountID: element.attributes.account_id,
          postID: element.attributes.post_id,
          commentText: element.attributes.comment,
          mentions_ids: element.attributes.mentions_ids,
          isDestroyed: false,
          isNewOption: false,
        };
        commentArray.push(object);
      }
    });
    this.setState({ commentsData: commentArray, loading: false });
    await setStorageData("commentData", JSON.stringify(commentArray));
  };

  mentionPartType: MentionPartType = {
    trigger: "@",
  };

  urlPatternPartType: PatternPartType = {
    pattern:
      /(https?:\/\/|www\.)[-\w@:%.+~#=]{1,256}\.(xn--)?[a-z0-9-]{2,20}\b([-\w@:%+[\],.~#?&/=]*[-\w@:%+\]~#?&/=])*/gi,
  };

  partTypes: PartType[] = [this.mentionPartType, this.urlPatternPartType];

  addComment = async () => {
    if (this.state.commentText !== "") {
      let userMentionedArray: number[] = [];
      const { parts } = parseValue(this.state.commentText, this.partTypes);

      parts.forEach((item) => {
        if (item.partType !== undefined && item?.data?.id !== undefined) {
          userMentionedArray.push(parseInt(item?.data?.id, 10));
        }
      });
      this.setState({ userMentionedList: userMentionedArray }, async () =>
        this.state.isEditComment ? this.updateComment() : this.saveComment(),
      );
    }
  };

  deleteComment = async (commentId: string) => {
    let commentData = [...this.state.commentsData];
    commentData.forEach((item) => {
      if (item.id === commentId) {
        let index1 = this.state.commentsData.indexOf(item);
        commentData.splice(index1, 1);
      }
    });
    await this.deleteCommentItem(commentId);
    this.setState({ commentsData: commentData });
    await setStorageData("commentData", JSON.stringify(commentData));
  };

  async componentWillUnmount() {
    await removeStorageData("postId");
    await removeStorageData("isEditablePost");
  }

  async componentDidMount() {
    await super.componentDidMount();
    let postId: number = 0;
    if (Platform.OS === "web") {
      postId = JSON.parse(await getStorageData("postId"));
    } else {
      postId = this.props.navigation.state.params.postId;
    }
    let userId = JSON.parse(await getStorageData("account_Id"));
    this.setState({ postId: postId, userAccountId: parseInt(userId, 10) });

    await this.getUserList();
    setTimeout(async () => {
      await this.getPostDetails(postId.toString());
      await this.getCommentList();
    }, 1000);

    this.setState({
      commentsData: JSON.parse(await getStorageData("commentData")),
    });
  }

  taggedPeopleList = (taggedIds: number[]) => {
    let taggedUserList: string = "";
    this.state.usersList.forEach((item) => {
      if (taggedIds.includes(parseInt(item.id, 10))) {
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

  setEditComment(isEdit: boolean, commentId: number, commentText: string) {
    this.setState({
      isEditComment: isEdit,
      editableCommentId: commentId,
      commentText: commentText,
    });
  }

  setCommentText(text: string) {
    this.setState({ commentText: text });
  }

  navigateToAddPostScreen() {
    this.props.navigation.navigate("MentionstaggingAddPost", {
      isEditablePost: true,
      postId: this.state.postId,
    });
  }

  navigateToMentionstagging() {
    this.props.navigation.navigate(configJSON.Mentionstagging);
  }

  // Customizable Area End
}
