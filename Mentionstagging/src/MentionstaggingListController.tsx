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
  CommentListResponse,
  MentionedList,
  PostListResponse,
  UserListItem,
  UserListResponse,
} from "./domain/mentions.dto";
import { handleResponseMessage } from "../../../framework/src/Helpers/handle-response-message";
import createRequestMessage from "../../../framework/src/Helpers/create-request-message";
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
  loading: boolean;
  accountId: string;
  mentionedList: MentionedList[];
  usersList: UserListItem[];
  isFilterModalVisible: boolean;
  filterIsMentioned: boolean;
  filterIsTagged: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class MentionstaggingListController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiMentionsPostList: string | null = "";
  apiMentionsCommentList: string | null = "";
  apiMentionsUserList: string | null = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      // Customizable Area End
    ];
    // Customizable Area End

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      loading: false,
      accountId: "",
      mentionedList: [],
      usersList: [],
      isFilterModalVisible: false,
      filterIsMentioned: false,
      filterIsTagged: false,
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
        case this.apiMentionsPostList: {
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: () => {
              this.setPostListApiResponse(responseJson.data);
            },
            onFail: () =>
              this.showAlert(`Fetching post list failed`, "Please retry!"),
          });

          break;
        }

        case this.apiMentionsCommentList: {
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

        case this.apiMentionsUserList: {
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

  // Customizable Area Start
  getPostList = async () => {
    this.setState({ loading: true });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.apiMentionsPostList = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.postsApiEndPoint,
      method: configJSON.getApiMethod,
      token: await getStorageData("login_token"),
    });
  };

  getCommentList = async () => {
    this.setState({ loading: true });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.apiMentionsCommentList = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.commentsApiEndPoint,
      method: configJSON.getApiMethod,
      token: await getStorageData("login_token"),
    });
  };

  getUserList = async () => {
    this.setState({ loading: true });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.apiMentionsUserList = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.usersListApiEndPoint,
      method: configJSON.getApiMethod,
    });
  };

  setPostListApiResponse = (postListResponse: PostListResponse[]) => {
    let postMentionedArray: MentionedList[] = [];
    let object: MentionedList;
    postListResponse.forEach((element: PostListResponse) => {
      if (
        element.attributes.mentions_ids?.includes(
          parseInt(this.state.accountId, 10),
        )
      ) {
        object = {
          id: Math.floor(Date.now() / 1000).toString(),
          postId: element.id,
          creatorAccountId: element.attributes.account_id,
          isMentioned: true,
          isPost: true,
          commentId: "0",
        };
        postMentionedArray.push(object);
      }
      if (
        element.attributes.tags_ids?.includes(
          parseInt(this.state.accountId, 10),
        )
      ) {
        object = {
          id: Math.floor(Date.now() / 1000).toString(),
          postId: element.id,
          creatorAccountId: element.attributes.account_id,
          isMentioned: false,
          isPost: true,
          commentId: "0",
        };
        postMentionedArray.push(object);
      }
    });
    postMentionedArray = this.state.mentionedList.concat(postMentionedArray);
    this.setState({ mentionedList: postMentionedArray });
  };

  setCommentListApiResponse = (commentListResponse: CommentListResponse[]) => {
    let mentionedArray: MentionedList[] = [],
      object: MentionedList;
    commentListResponse.forEach((item: CommentListResponse) => {
      if (
        item.attributes?.mentions_ids?.includes(
          parseInt(this.state.accountId, 10),
        )
      ) {
        object = {
          id: Math.floor(Date.now() / 1000).toString(),
          commentId: item.id,
          creatorAccountId: item.attributes.account_id,
          postId: item.attributes.post_id.toString(),
          isMentioned: true,
          isPost: false,
        };
        mentionedArray.push(object);
      }
    });
    mentionedArray = this.state.mentionedList.concat(mentionedArray);
    this.setState({ mentionedList: mentionedArray, loading: false });
  };

  setUserListApiResponse = (userResponseJson: UserListResponse[]) => {
    let first_name: string, last_name: string;
    const usersArray = userResponseJson.map((item: UserListResponse) => {
      first_name =
        item.attributes.first_name !== null
          ? item.attributes.first_name.replace(/^\w/, (word: string) =>
              word.toUpperCase(),
            )
          : "User";
      last_name =
        item.attributes.last_name !== null
          ? item.attributes.last_name.replace(/^\w/, (word: string) =>
              word.toUpperCase(),
            )
          : item.id;
      return {
        id: item.id,
        name: first_name + "-" + last_name,
      };
    });
    this.setState({ usersList: usersArray });
  };

  setFilterModalVisibility(flag: boolean) {
    this.setState({ isFilterModalVisible: flag });
  }

  async componentDidMount() {
    this.setState({
      loading: true,
      accountId: await getStorageData("account_Id"),
    });
    await this.getUserList();
    setTimeout(async () => {
      await this.getPostList();
      await this.getCommentList();
    }, 1000);
  }

  navigateToPostDetail(postID: string) {
    if (Platform.OS === "web") {
      setStorageData("postId", postID);
    }
    this.props.navigation.navigate(configJSON.labelMentionsTaggingPostDetails, {
      postId: postID,
    });
  }

  navigateToMentionstagging() {
    this.props.navigation.navigate(configJSON.Mentionstagging);
  }

  setFilterIsTagged = () => {
    this.setState({
      filterIsTagged: !this.state.filterIsTagged,
      filterIsMentioned: false,
      isFilterModalVisible: false,
    });
  };

  setFilterIsMentioned = () => {
    this.setState({
      filterIsMentioned: !this.state.filterIsMentioned,
      filterIsTagged: false,
      isFilterModalVisible: false,
    });
  };

  filterList = () => {
    let listData = [];
    if (this.state.filterIsMentioned) {
      listData = this.state.mentionedList.filter((item) => item.isMentioned);
    } else if (this.state.filterIsTagged) {
      listData = this.state.mentionedList.filter((item) => !item.isMentioned);
    } else {
      listData = this.state.mentionedList;
    }
    return listData;
  };
  // Customizable Area End
}
