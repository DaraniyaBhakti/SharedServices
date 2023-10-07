import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import MentionstaggingPostDetails from "../../src/MentionstaggingPostDetails";
import { View } from "react-native";
import { getStorageData } from "../../../../framework/src/Utilities";
import {
  MentionSuggestionsProps,
  Suggestion,
} from "react-native-controlled-mentions";
import {
  apiPostDetail,
  apiUserList,
  createComment,
  createComment2,
} from "./mockData";

const screenProps = {
  navigation: {
    addListener: jest.fn().mockImplementation((event, callback) => {
      callback();
    }),
    navigate: jest.fn(),
    state: { params: { postId: 22 } },
  },
  id: "MentionstaggingPostDetails",
};

const feature = loadFeature(
  "./__tests__/features/MentionstaggingPostDetails-scenario.feature",
);

defineFeature(feature, (test) => {
  const commentList = {
    data: [
      {
        id: "45",
        type: "comment",
        attributes: {
          id: 45,
          account_id: 10,
          post_id: 22,
          comment: "hiii",
          created_at: "2023-02-18T08:38:53.752Z",
          updated_at: "2023-04-18T08:38:53.752Z",
          commentable: {
            id: 22,
            name: "User 24",
            description: "",
            category_id: 2,
            created_at: "2023-01-01T09:12:00.997Z",
            updated_at: "2023-01-29T09:31:56.516Z",
            body: "@Siddharth Gupta @User 3 @Vinayak Sharma dhrthrt",
            location: "hrthrthbdf",
            account_id: 24,
          },
          account: {
            id: 10,
            first_name: null,
            last_name: null,
            full_phone_number: "",
            country_code: null,
            phone_number: null,
            email: "BB@gmail.com",
            activated: true,
            full_name: "BB",
          },
        },
      },
      {
        id: "57",
        type: "comment",
        attributes: {
          id: 57,
          account_id: 10,
          post_id: 22,
          comment: "mmm\n",
          created_at: "2023-01-19T06:15:31.288Z",
          updated_at: "2023-01-19T06:15:32.288Z",
          commentable: {
            id: 22,
            name: "User 24",
            description: "",
            category_id: 2,
            created_at: "2023-01-11T29:12:00.997Z",
            updated_at: "2023-01-19T19:31:56.516Z",
            body: "@Siddharth Gupta @User 3 @Vinayak Sharma ",
            location: "hrthrth",
            account_id: 24,
          },
          account: {
            id: 10,
            first_name: "User",
            last_name: "22",
            full_phone_number: "",
            country_code: null,
            phone_number: null,
            email: "BB@gmail.com",
            activated: true,
            user_name: null,
            full_name: "BB",
          },
        },
      },
    ],
  };

  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
  });

  test("User navigates to MentionstaggingPostDetails", ({
    given,
    when,
    then,
  }) => {
    let postDetailsWrapper: ShallowWrapper;
    let instance: MentionstaggingPostDetails;

    given("I am a User loading MentionstaggingPostDetails", async () => {
      postDetailsWrapper = shallow(
        <MentionstaggingPostDetails {...screenProps} />,
      );
    });

    when("I navigate to the MentionstaggingPostDetails", () => {
      instance = postDetailsWrapper.instance() as MentionstaggingPostDetails;
    });
    jest.useFakeTimers();
    then("MentionstaggingPostDetails will load with out errors", async () => {
      expect(postDetailsWrapper).toBeTruthy();
      await instance.componentDidMount();
      instance.setState({ postId: 22, userAccountId: 24, accountId: 24 });
      instance.setState({
        commentText: "Hello @[David Tabaka](5)! How are you?",
      });
      await instance.addComment();
      instance.setState({ isEditComment: true });
      await instance.addComment();
      instance.setState({
        userMentionedList: [2, 3],
        commentsData: [
          {
            id: "2",
            name: "user 3",
            accountID: 24,
            postID: 22,
            commentText: "Hello @[David Tabaka](5)! How are you?",
            isDestroyed: false,
            isNewOption: false,
            mentions_ids: [6, 34],
          },
        ],
        commentText: "",
      });
      await instance.updateComment();
      await instance.deleteComment("5");
      instance.setState({
        commentsData: [
          {
            id: "5",
            name: "user 3",
            accountID: 24,
            postID: 22,
            commentText: "Hello @[David Tabaka](5)! How are you?",
            isDestroyed: false,
            isNewOption: false,
            mentions_ids: [6, 34],
          },
        ],
      });
      instance.setState({
        postText: "Post Text @USer-5 @user-9",
        location: "Post Location",
        accountId: 24,
        userName: "User Name",
        loading: false,
        postTitle: " Post Title",
        postDescription: "Post Description",
        taggedUserListString: "@User-1 @User-34 helloo",
      });
      expect(postDetailsWrapper).toBeTruthy();
    });

    then(
      "I can select the touchable without feedback with without errors",
      () => {
        let buttonComponent = postDetailsWrapper.findWhere(
          (node) => node.prop("testID") === "touchableWithoutFeedback",
        );
        buttonComponent.simulate("press");
        expect(buttonComponent).toHaveLength(1);
      },
    );

    then("I can select the button with without errors", () => {
      instance.setState({ userAccountId: 24, accountId: 24 });
      let buttonComponent = postDetailsWrapper.findWhere(
        (node) => node.prop("testID") === "btnPostEdit",
      );
      if (
        buttonComponent &&
        instance.state.accountId === instance.state.userAccountId
      ) {
        buttonComponent.simulate("press");
      }
      expect(postDetailsWrapper).toBeTruthy();
    });

    then("I can select the flat list with with out errors", () => {
      instance.setState({
        usersList: [
          {
            id: "24",
            name: "User 24",
          },
        ],
        userAccountId: 24,
        accountId: 24,
      });
      let flatList = postDetailsWrapper.findWhere(
        (node) => node.prop("testID") === "listCommentList",
      );
      flatList.renderProp("renderItem")({
        item: { commentText: "Hello @[David Tabaka](5)! How are you?" },
      });
      flatList.props().keyExtractor({ id: 3 });
      flatList.prop("ListEmptyComponent")();
      flatList.simulate("press");
      expect(flatList).toHaveLength(1);
    });

    then("I can select the save comment button with with out errors", () => {
      instance.setState({ isEditComment: true });
      let buttonComponent = postDetailsWrapper.findWhere(
        (node) => node.prop("testID") === "btnAddComment",
      );
      buttonComponent.simulate("press");
      expect(buttonComponent).toHaveLength(1);
      instance.setState({ isEditComment: false });
      let buttonComponent4 = postDetailsWrapper.findWhere(
        (node) => node.prop("testID") === "btnAddComment",
      );
      buttonComponent4.simulate("press");
      expect(buttonComponent4).toHaveLength(1);
      const data = {
        item: {
          id: "25",
          name: "user 5",
          accountID: 24,
          postID: 22,
          commentText: "Hello @[David Tabaka](5)! How are you?",
          isDestroyed: false,
          isNewOption: false,
          mentions_ids: [2, 34],
        },
        index: 0,
      };
      let itemWrapper = shallow(
        <View>{instance.commentListItemView(data)}</View>,
      );
      instance.setState({ userAccountId: 24 });
      let buttonComponent1 = itemWrapper.findWhere(
        (node) => node.prop("testID") === "btnEditComment-" + data.item.id,
      );
      if (instance.state.userAccountId === instance.state.accountId) {
        buttonComponent1.simulate("press");
        expect(buttonComponent1).toHaveLength(1);
      }
      let buttonComponent2 = itemWrapper.findWhere(
        (node) => node.prop("testID") === "btnDeleteComment-" + data.item.id,
      );
      if (instance.state.userAccountId === instance.state.accountId) {
        buttonComponent2.simulate("press");
        expect(buttonComponent2).toHaveLength(1);
      }
    });

    then("I can enter comment text without errors", () => {
      let textInputComponent = postDetailsWrapper.findWhere(
        (node) => node.prop("testID") === "textInputComment",
      );
      textInputComponent.simulate(
        "change",
        "Hello @[David Tabaka](5)! How are you?",
      );
      expect(textInputComponent).toHaveLength(1);
      const suggestions: Suggestion[] = [
        { id: "1", name: "John" },
        { id: "2", name: "Jane" },
      ];
      const mentionSuggestionsProps: MentionSuggestionsProps = {
        keyword: "",
        onSuggestionPress: jest.fn(),
      };
      instance.renderSuggestions(suggestions)(mentionSuggestionsProps);
      const keyword = undefined;
      instance.renderSuggestions(suggestions)({
        ...mentionSuggestionsProps,
        keyword,
      });

      const keyWordString = "Test";

      instance.renderSuggestions(suggestions)({
        ...mentionSuggestionsProps,
        keyword: keyWordString,
      });
    });

    then("User list data load with out errors", () => {
      const userListApi: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      userListApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        userListApi.messageId,
      );
      userListApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(apiUserList)),
      );
      userListApi.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        "Error",
      );
      instance.apiPostDetailUserList = userListApi.messageId;
      runEngine.sendMessage("Unit Test", userListApi);
      expect(postDetailsWrapper).toBeTruthy();
    });

    then("Get Post details load with out errors", async () => {
      const postDetailApi: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      postDetailApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        postDetailApi.messageId,
      );
      postDetailApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.stringify({ token: await getStorageData("login_token") }),
      );
      postDetailApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(apiPostDetail)),
      );
      postDetailApi.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        "Error",
      );
      instance.apiPostDetail = postDetailApi.messageId;
      runEngine.sendMessage("Unit Test", postDetailApi);
      expect(postDetailsWrapper).toBeTruthy();
    });

    then("Create comment with out errors", () => {
      const createCommentApi: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      createCommentApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        createCommentApi.messageId,
      );
      createCommentApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(createComment)),
      );
      createCommentApi.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        "Error",
      );
      instance.apiAddComment = createCommentApi.messageId;
      runEngine.sendMessage("Unit Test", createCommentApi);
      const createCommentApi2: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      createCommentApi2.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        createCommentApi2.messageId,
      );
      createCommentApi2.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(createComment2)),
      );
      createCommentApi2.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        "Error",
      );
      instance.apiAddComment = createCommentApi2.messageId;
      runEngine.sendMessage("Unit Test", createCommentApi2);
      expect(postDetailsWrapper).toBeTruthy();
    });

    then("Delete comment with out errors", () => {
      const deleteCommentApi: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      deleteCommentApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        deleteCommentApi.messageId,
      );
      deleteCommentApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify({ message: "Comment deleted." })),
      );
      deleteCommentApi.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        "Error",
      );
      instance.apiDeleteComment = deleteCommentApi.messageId;
      runEngine.sendMessage("Unit Test", deleteCommentApi);
      expect(postDetailsWrapper).toBeTruthy();
    });

    then("Update comment with out errors", () => {
      const updateCommentApi: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      updateCommentApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        updateCommentApi.messageId,
      );
      updateCommentApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(createComment)),
      );
      updateCommentApi.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        "Error",
      );
      instance.apiUpdateComment = updateCommentApi.messageId;
      runEngine.sendMessage("Unit Test", updateCommentApi);
      expect(postDetailsWrapper).toBeTruthy();
    });

    then("Comment List API load with out errors", () => {
      instance.setState({ postId: 22 });
      const commentListApi: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      commentListApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        commentListApi.messageId,
      );
      commentListApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(commentList)),
      );
      commentListApi.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        "Error",
      );
      instance.apiCommentList = commentListApi.messageId;
      runEngine.sendMessage("Unit Test", commentListApi);
      expect(postDetailsWrapper).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(postDetailsWrapper).toBeTruthy();
    });
  });
});
