import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import MentionstaggingAddPost from "../../src/MentionstaggingAddPost.web";
import { parseValue } from "react-native-controlled-mentions";
import { getStorageData } from "../../../../framework/src/Utilities";
import {
  apiPostList,
  apiUserList,
  createPostTestData,
  userList,
} from "./mockData";

const screenProps = {
  navigation: {
    addListener: jest.fn().mockImplementation((event, callback) => {
      callback();
    }),
    navigate: jest.fn(),
    state: { params: { isEditablePost: true, postId: 22 } },
  },
  id: "MentionstaggingAddPost",
};

const feature = loadFeature(
  "./__tests__/features/MentionstaggingAddPost-scenario.feature",
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

  test("User navigates to MentionstaggingAddPost", ({ given, when, then }) => {
    let addPostWrapper: ShallowWrapper;
    let instance: MentionstaggingAddPost;

    given("I am a User loading MentionstaggingAddPost", () => {
      addPostWrapper = shallow(<MentionstaggingAddPost {...screenProps} />);
      expect(addPostWrapper).toBeTruthy();
    });

    when("I navigate to the MentionstaggingAddPost", async () => {
      instance = addPostWrapper.instance() as MentionstaggingAddPost;
      instance.componentDidMount();
      instance.setState({
        isEditablePost: true,
        postId: 22,
        usersList: userList,
        accountId: 24,
      });
      instance.getPostDetails("22");
      expect(addPostWrapper).toBeTruthy();
    });

    then("MentionstaggingAddPost will load with out errors", () => {
      instance.setState({ taggedUserListString: "@User1 @User2" });
      instance.setState({
        errorPostTextFlag: false,
        userMentionedList: [],
        userTaggedList: [],
      });
      expect(addPostWrapper).toBeTruthy();
    });
    then("User list data load with out errors", async () => {
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
      instance.apiAddPostUserList = userListApi.messageId;
      runEngine.sendMessage("Unit Test", userListApi);
      let buttonComponent1 = addPostWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnSavePost",
      );
      buttonComponent1.simulate("press");
      expect(addPostWrapper).toBeTruthy();
    });
    then(
      "I can select the touchable without feedback with without errors",
      () => {
        let buttonComponent1 = addPostWrapper.findWhere(
          (node) => node.prop("data-test-id") === "modalUserList",
        );
        buttonComponent1.simulate("backdropPress");
        expect(addPostWrapper).toBeTruthy();
      },
    );

    then("I can enter text in fields without errors", () => {
      let textInputComponent = addPostWrapper.findWhere(
        (node) => node.prop("data-test-id") === "textInputPostText",
      );
      textInputComponent.simulate("change", {
        target: { value: "@Siddharth" },
      });

      let textInputPostTitle = addPostWrapper.findWhere(
        (node) => node.prop("data-test-id") === "textInputPostTitle",
      );
      textInputPostTitle.simulate("change", {
        target: { value: "Post Title" },
      });
      let textInputDescription = addPostWrapper.findWhere(
        (node) => node.prop("data-test-id") === "textInputDescription",
      );
      textInputDescription.simulate("change", {
        target: { value: "Post Description" },
      });
      let textInputLocation = addPostWrapper.findWhere(
        (node) => node.prop("data-test-id") === "textInputLocation",
      );
      textInputLocation.simulate("change", { target: { value: "XYZ Place" } });
      expect(addPostWrapper).toBeTruthy();
    });

    then("I can select the user tag button without errors", () => {
      let buttonComponent = addPostWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnAddTag",
      );
      buttonComponent.simulate("click");
      expect(buttonComponent).toHaveLength(1);
    });

    then("I can select the save button with without errors", async (done) => {
      instance.setState({
        userMentionedList: [5, 6, 2],
        userTaggedList: [8, 9, 25],
      });
      parseValue(instance.state.postText, instance.partTypes);
      instance.setState({ usersList: userList });
      let buttonComponent1 = addPostWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnSavePost",
      );
      buttonComponent1.simulate("click");
      let buttonComponent2 = addPostWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnDeletePost",
      );
      buttonComponent2.simulate("click");
      expect(buttonComponent2).toHaveLength(1);

      instance.setState({ isEditablePost: false });
      let buttonComponent3 = addPostWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnSavePost",
      );
      buttonComponent3.simulate("click");
      expect(buttonComponent3).toHaveLength(1);
      parseValue(instance.state.postText, instance.partTypes);
    });

    then("I can select the username flat list with with out errors", () => {
      instance.setState({
        isEditablePost: true,
        usersList: userList,
        postText: "",
        postTitle: "",
      });
      let buttonComponent1 = addPostWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnSavePost",
      );
      buttonComponent1.simulate("click");
      let buttonComponent2 = addPostWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnDeletePost",
      );
      buttonComponent2.simulate("click");
      expect(buttonComponent2).toHaveLength(1);
      expect(addPostWrapper).toBeTruthy();
    });

    then("I can open the user list modal without errors", () => {
      instance.setState({ isUserModalVisible: true, usersList: userList });
      instance.checkBoxOnPress({ item: userList[0], index: 0 });
      let buttonComponent1 = addPostWrapper.findWhere(
        (node) => node.prop("data-test-id") === "modalUserList",
      );
      buttonComponent1.simulate("open");
      expect(addPostWrapper).toBeTruthy();
      let usersCheckboxBtn = addPostWrapper.findWhere(
        (node) =>
          node.prop("data-test-id") === "usersCheckbox-" + userList[0].id,
      );
      expect(usersCheckboxBtn).toBeTruthy();
      expect(addPostWrapper).toBeTruthy();
    });

    then("Post details load with out errors", async () => {
      instance.setState({ usersList: userList });
      const postDetailApi: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      postDetailApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        postDetailApi.messageId,
      );
      postDetailApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(apiPostList)),
      );
      instance.apiAddPostDetail = postDetailApi.messageId;
      runEngine.sendMessage("Unit Test", postDetailApi);
      expect(addPostWrapper).toBeTruthy();
    });

    then("Create Post data load with out errors", async () => {
      const createPostAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      createPostAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        createPostAPI.messageId,
      );
      createPostAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(createPostTestData)),
      );
      instance.apiCreatePost = createPostAPI.messageId;
      runEngine.sendMessage("Unit Test", createPostAPI);
      expect(addPostWrapper).toBeTruthy();
    });

    then("Update Post data load with out errors", async () => {
      const updatePostApi: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      updatePostApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        updatePostApi.messageId,
      );
      updatePostApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.stringify({
          "Content-Type": "application/json",
          "token": await getStorageData("login_token"),
        }),
      );
      updatePostApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify({ data: createPostTestData })),
      );
      instance.apiUpdatePost = updatePostApi.messageId;
      runEngine.sendMessage("Unit Test", updatePostApi);
      expect(addPostWrapper).toBeTruthy();
    });

    then("Delete Post data load with out errors", async () => {
      const deletePostApi: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      deletePostApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        deletePostApi.messageId,
      );
      deletePostApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.stringify({
          "Content-Type": "application/json",
          "token": await getStorageData("login_token"),
        }),
      );
      deletePostApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify({ message: "Post deleted." })),
      );
      instance.apiDeletePost = deletePostApi.messageId;
      runEngine.sendMessage("Unit Test", deletePostApi);
      expect(addPostWrapper).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      let goBackBtn = addPostWrapper.findWhere(
        (node) => node.prop("data-test-id") === "goBackBtn",
      );
      expect(goBackBtn).toHaveLength(1);
      goBackBtn.simulate("click");
      instance.componentWillUnmount();
      expect(addPostWrapper).toBeTruthy();
      mockTimer();
    });
  });
});
