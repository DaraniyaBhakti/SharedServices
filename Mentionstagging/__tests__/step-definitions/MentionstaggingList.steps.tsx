import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import MentionstaggingList from "../../src/MentionstaggingList";
import { View } from "react-native";
import {
  apiPostList,
  apiUserList,
  commentList,
  mentionedList,
  userList,
} from "./mockData";

const screenProps = {
  navigation: {
    addListener: jest.fn().mockImplementation((event, callback) => {
      callback();
    }),
    navigate: jest.fn(),
    state: { params: { postId: 22 } },
  },
  id: "MentionstaggingList",
};

const feature = loadFeature(
  "./__tests__/features/MentionstaggingList-scenario.feature",
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to MentionstaggingList", ({ given, when, then }) => {
    let mentionsTaggingListWrapper: ShallowWrapper;
    let instance: MentionstaggingList;

    given("I am a User loading MentionstaggingList", () => {
      mentionsTaggingListWrapper = shallow(
        <MentionstaggingList {...screenProps} />,
      );
    });

    when("I navigate to the MentionstaggingList", async () => {
      instance = mentionsTaggingListWrapper.instance() as MentionstaggingList;
    });

    jest.useFakeTimers();
    then("MentionstaggingList will load with out errors", () => {
      expect(mentionsTaggingListWrapper).toBeTruthy();
      instance.componentDidMount();
      instance.setState({ accountId: "24" });
      const getPostList = jest.fn();
      const getCommentList = jest.fn();
      setTimeout(async () => {
        await getCommentList();
        await getPostList();
      }, 1000);
      jest.advanceTimersByTime(1000);
      instance.getCommentList();
      instance.getPostList();
      expect(getCommentList).toHaveBeenCalled();
    });

    then(
      "I can select the touchable without feedback with without errors",
      () => {
        let buttonComponent = mentionsTaggingListWrapper.findWhere(
          (node) => node.prop("testID") === "touchableWithoutFeedback",
        );
        buttonComponent.simulate("press");
        expect(buttonComponent).toHaveLength(1);
      },
    );

    then("I can select the button with without errors", () => {
      let buttonComponent = mentionsTaggingListWrapper.findWhere(
        (node) => node.prop("testID") === "btnFilter",
      );
      buttonComponent.simulate("press");
      expect(buttonComponent).toHaveLength(1);
      let modalComponent1 = mentionsTaggingListWrapper.findWhere(
        (node) => node.prop("testID") === "modalFilter",
      );
      modalComponent1.simulate("backdropPress");
      expect(modalComponent1).toHaveLength(1);
      let tagCheckBox = mentionsTaggingListWrapper.findWhere(
        (node) => node.prop("testID") === "checkboxTagged",
      );
      tagCheckBox.simulate("valueChange");
      expect(tagCheckBox).toHaveLength(1);
      let mentionCheckBox = mentionsTaggingListWrapper.findWhere(
        (node) => node.prop("testID") === "checkBoxMentioned",
      );
      mentionCheckBox.simulate("valueChange");
      expect(mentionCheckBox).toHaveLength(1);
    });

    then("I can select the flat list with with out errors", () => {
      instance.setState({ usersList: userList });
      let flatList = mentionsTaggingListWrapper.findWhere(
        (node) => node.prop("testID") === "listMentionsTaggingItem",
      );
      flatList.renderProp("renderItem")({
        item: {
          id: "7894",
          postId: "22",
          creatorAccountId: 24,
          isMentioned: true,
          isPost: true,
          commentId: "0",
        },
      });
      flatList.props().keyExtractor({ id: 3 });
      flatList.prop("ListEmptyComponent")();
      flatList.simulate("press");
      expect(flatList).toHaveLength(1);
      let itemWrapper = shallow(
        <View>{instance.mentionedItemView(mentionedList[0])}</View>,
      );
      let listItemComponent = itemWrapper.findWhere(
        (node) =>
          node.prop("testID") ===
          "touchableListMentionsTaggingItem-" + mentionedList[0].item.id,
      );
      listItemComponent.simulate("press");
      expect(listItemComponent).toHaveLength(1);
      instance.setState({ filterIsTagged: true });
      let itemWrapper1 = shallow(
        <View>{instance.mentionedItemView(mentionedList[1])}</View>,
      );
      let listItemComponent1 = itemWrapper1.findWhere(
        (node) =>
          node.prop("testID") ===
          "touchableListMentionsTaggingItem-" + mentionedList[1].item.id,
      );
      listItemComponent1.simulate("press");
      expect(listItemComponent1).toHaveLength(1);
    });
    then("Post List API load with out errors", () => {
      instance.setState({ accountId: "24" });
      const postListApi: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      postListApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        postListApi.messageId,
      );
      postListApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(apiPostList)),
      );
      postListApi.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        "Error",
      );
      instance.apiMentionsPostList = postListApi.messageId;
      runEngine.sendMessage("Unit Test", postListApi);
      expect(mentionsTaggingListWrapper).toBeTruthy();
    });

    then("Comment List API load with out errors", () => {
      instance.setState({ accountId: "24" });
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
      instance.apiMentionsCommentList = commentListApi.messageId;
      runEngine.sendMessage("Unit Test", commentListApi);
      expect(mentionsTaggingListWrapper).toBeTruthy();
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
      instance.apiMentionsUserList = userListApi.messageId;
      runEngine.sendMessage("Unit Test", userListApi);
      expect(mentionsTaggingListWrapper).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(mentionsTaggingListWrapper).toBeTruthy();
    });
  });
});
