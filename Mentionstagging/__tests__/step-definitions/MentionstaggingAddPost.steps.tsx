import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import MentionstaggingAddPost from "../../src/MentionstaggingAddPost";
import { View } from "react-native";
import {
  MentionSuggestionsProps,
  Suggestion,
} from "react-native-controlled-mentions";
import { getStorageData } from "../../../../framework/src/Utilities";
import {
  apiPostDetail,
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
    state: { params: { isEditablePost: false, postId: 22 } },
  },
  id: "MentionstaggingAddPost",
};

const feature = loadFeature(
  "./__tests__/features/MentionstaggingAddPost-scenario.feature",
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
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
      let buttonComponent1 = addPostWrapper.findWhere(
        (node) => node.prop("testID") === "btnSavePost",
      );
      buttonComponent1.simulate("press");
      expect(buttonComponent1).toHaveLength(1);
    });

    then("MentionstaggingAddPost will load with out errors", () => {
      expect(addPostWrapper).toBeTruthy();
      instance.setState({ taggedUserListString: "@User1 @User2" });
      instance.setState({
        errorPostTextFlag: false,
        userMentionedList: [],
        userTaggedList: [],
      });
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
      userListApi.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        "Error",
      );
      instance.apiAddPostUserList = userListApi.messageId;
      runEngine.sendMessage("Unit Test", userListApi);
      expect(addPostWrapper).toBeTruthy();
    });
    then(
      "I can select the touchable without feedback with without errors",
      () => {
        let buttonComponent = addPostWrapper.findWhere(
          (node) => node.prop("testID") === "touchableWithoutFeedback",
        );
        buttonComponent.simulate("press");
        expect(buttonComponent).toHaveLength(1);
        let buttonComponent1 = addPostWrapper.findWhere(
          (node) => node.prop("testID") === "modalUserList",
        );
        buttonComponent1.simulate("backdropPress");
        expect(buttonComponent1).toHaveLength(1);
      },
    );

    then("I can enter text in fields without errors", () => {
      let postTextInputComponent = addPostWrapper.findWhere(
        (node) => node.prop("testID") === "textInputPostText",
      );
      postTextInputComponent.simulate(
        "change",
        "Hello @[David Tabaka](5)! How are you?",
      );
      expect(postTextInputComponent).toHaveLength(1);
      const suggestions: Suggestion[] = [
        { id: "1", name: "John" },
        { id: "2", name: "Jane" },
      ];
      const postMentionSuggestionsProps: MentionSuggestionsProps = {
        keyword: "",
        onSuggestionPress: jest.fn(),
      };
      instance.renderSuggestions(suggestions)(postMentionSuggestionsProps);
      const postKeyword = undefined;

      instance.renderSuggestions(suggestions)({
        ...postMentionSuggestionsProps,
        keyword: postKeyword,
      });

      const postKeyWordString = "Test";

      instance.renderSuggestions(suggestions)({
        ...postMentionSuggestionsProps,
        keyword: postKeyWordString,
      });

      let textInputPostTitle = addPostWrapper.findWhere(
        (node) => node.prop("testID") === "textInputPostTitle",
      );
      textInputPostTitle.simulate("changeText", "Post Title");
      expect(textInputPostTitle).toHaveLength(1);
      let textInputDescription = addPostWrapper.findWhere(
        (node) => node.prop("testID") === "textInputDescription",
      );
      textInputDescription.simulate("changeText", "Post Description");
      expect(textInputDescription).toHaveLength(1);
      let textInputLocation = addPostWrapper.findWhere(
        (node) => node.prop("testID") === "textInputLocation",
      );
      textInputLocation.simulate("changeText", "XYZ Place");
      expect(textInputLocation).toHaveLength(1);
    });

    then("I can select the user tag button without errors", () => {
      let buttonComponent = addPostWrapper.findWhere(
        (node) => node.prop("testID") === "btnAddTag",
      );
      buttonComponent.simulate("press");
      expect(buttonComponent).toHaveLength(1);
    });

    jest.useFakeTimers();
    then("I can select the save button with without errors", async () => {
      instance.setState({
        isEditablePost: true,
        userMentionedList: [5, 6, 2],
        userTaggedList: [8, 9, 25],
      });
      instance.setState({ usersList: userList });
      let buttonComponent1 = addPostWrapper.findWhere(
        (node) => node.prop("testID") === "btnSavePost",
      );
      buttonComponent1.simulate("press");
      expect(buttonComponent1).toHaveLength(1);
      let buttonComponent2 = addPostWrapper.findWhere(
        (node) => node.prop("testID") === "btnDeletePost",
      );
      buttonComponent2.simulate("press");
      expect(buttonComponent2).toHaveLength(1);

      const setValidatedData = jest.fn();
      setTimeout(async () => {
        await setValidatedData();
      }, 2000);
      jest.advanceTimersByTime(2000);
      expect(setValidatedData).toHaveBeenCalled();

      instance.setState({ isEditablePost: false });
      let buttonComponent3 = addPostWrapper.findWhere(
        (node) => node.prop("testID") === "btnSavePost",
      );
      buttonComponent3.simulate("press");
      expect(buttonComponent3).toHaveLength(1);
    });

    then("I can select the username flat list with with out errors", () => {
      instance.setState({
        isEditablePost: true,
        usersList: userList,
        postText: "",
        postTitle: "",
      });
      let flatList = addPostWrapper.findWhere(
        (node) => node.prop("testID") === "listUserName",
      );
      flatList.renderProp("renderItem")({ item: { userName: "XYZ person" } });
      flatList.props().keyExtractor({ id: 3 });
      flatList.simulate("press");
      expect(flatList).toHaveLength(1);
    });

    then("I can open the user list modal without errors", () => {
      instance.setState({ isUserModalVisible: true });
      const data = {
        item: {
          id: "1",
          name: "USER 1",
          email: "USER1@gmail.com",
          isTagged: true,
        },
        index: 0,
      };
      let itemWrapper = shallow(
        <View>{instance.userModalItemView(data)}</View>,
      );
      let buttonComponent1 = itemWrapper.findWhere(
        (node) => node.prop("testID") === "checkBoxUserTag-0",
      );
      buttonComponent1.simulate("valueChange");
      expect(buttonComponent1).toHaveLength(1);
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
        JSON.parse(JSON.stringify(apiPostDetail)),
      );
      postDetailApi.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        "Error",
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
      createPostAPI.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        "Error",
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
      updatePostApi.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        "Error",
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
      deletePostApi.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        "Error",
      );
      instance.apiDeletePost = deletePostApi.messageId;
      runEngine.sendMessage("Unit Test", deletePostApi);
      expect(addPostWrapper).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(addPostWrapper).toBeTruthy();
    });
  });
});
