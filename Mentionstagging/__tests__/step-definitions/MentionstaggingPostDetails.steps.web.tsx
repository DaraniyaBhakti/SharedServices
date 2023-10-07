import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import MentionstaggingPostDetails from "../../src/MentionstaggingPostDetails.web";
import { getStorageData } from "../../../../framework/src/Utilities";
import {
  apiPostDetail,
  apiUserList,
  commentList,
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
  let mockTimer: any;

  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest
      .spyOn(global, "setTimeout")
      .mockImplementation((cb: any) => (mockTimer = cb));
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
      expect(postDetailsWrapper).toBeTruthy();
    });

    when("I navigate to the MentionstaggingPostDetails", () => {
      instance = postDetailsWrapper.instance() as MentionstaggingPostDetails;
      expect(postDetailsWrapper).toBeTruthy();
    });

    then("MentionstaggingPostDetails will load with out errors", async () => {
      expect(postDetailsWrapper).toBeTruthy();
      await instance.componentDidMount();
      instance.setState({ postId: 22, userAccountId: 24, accountId: 24 });
      instance.setState({ commentText: "VGDSFGB @User-12 @User-55" });
      await instance.addComment();
      instance.setState({
        userMentionedList: [2, 3],
        commentsData: [
          {
            id: "2",
            name: "user 3",
            accountID: 24,
            postID: 22,
            commentText: "comment text @Userr05 @User-3",
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
            commentText: "comment text @Userr05 @User-3",
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
        expect(postDetailsWrapper).toBeTruthy();
      },
    );

    then("I can select the button with without errors", () => {
      instance.setState({ userAccountId: 24, accountId: 24 });
      let buttonComponent = postDetailsWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnPostEdit",
      );
      if (instance.state.accountId === instance.state.userAccountId) {
        buttonComponent.simulate("click");
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
      expect(postDetailsWrapper).toBeTruthy();
    });

    then("I can select the save comment button with with out errors", () => {
      instance.setState({ isEditComment: true });
      let buttonComponent = postDetailsWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnAddComment",
      );
      buttonComponent.simulate("click");
      instance.setState({ isEditComment: false });
      let buttonComponent4 = postDetailsWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnAddComment",
      );
      buttonComponent4.simulate("click");
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
        <div>{instance.commentListItemView(data)}</div>,
      );
      instance.setState({ userAccountId: 24 });
      let buttonComponent1 = itemWrapper.findWhere(
        (node) =>
          node.prop("data-test-id") === "btnEditComment-" + data.item.id,
      );
      if (instance.state.userAccountId === instance.state.accountId) {
        buttonComponent1.simulate("click");
      }
      let buttonComponent2 = itemWrapper.findWhere(
        (node) =>
          node.prop("data-test-id") === "btnDeleteComment-" + data.item.id,
      );
      if (instance.state.userAccountId === instance.state.accountId) {
        buttonComponent2.simulate("click");
      }
      expect(postDetailsWrapper).toBeTruthy();
    });

    then("I can enter comment text without errors", () => {
      let textInputComponent = postDetailsWrapper.findWhere(
        (node) => node.prop("data-test-id") === "textInputComment",
      );
      textInputComponent.simulate("change", {
        target: { value: "XYZ Comment Text" },
      });

      expect(postDetailsWrapper).toBeTruthy();
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
      instance.apiCommentList = commentListApi.messageId;
      runEngine.sendMessage("Unit Test", commentListApi);
      expect(postDetailsWrapper).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(postDetailsWrapper).toBeTruthy();
      mockTimer();
    });
  });
});
