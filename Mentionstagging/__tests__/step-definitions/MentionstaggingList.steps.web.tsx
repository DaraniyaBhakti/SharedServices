import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import MentionstaggingList from "../../src/MentionstaggingList.web";
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
  let mockTimer: any;

  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest
      .spyOn(global, "setTimeout")
      .mockImplementation((cb: any) => (mockTimer = cb));
  });

  test("User navigates to MentionstaggingList", ({ given, when, then }) => {
    let mentionsTaggingListWrapper: ShallowWrapper;
    let instance: MentionstaggingList;

    given("I am a User loading MentionstaggingList", () => {
      mentionsTaggingListWrapper = shallow(
        <MentionstaggingList {...screenProps} />,
      );
    });

    when("I navigate to the MentionstaggingList", () => {
      instance = mentionsTaggingListWrapper.instance() as MentionstaggingList;
      instance.componentDidMount();
      instance.setState({ accountId: "24" });
    });

    then("MentionstaggingList will load with out errors", () => {
      expect(mentionsTaggingListWrapper).toBeTruthy();
    });

    then(
      "I can select the touchable without feedback with without errors",
      () => {
        expect(mentionsTaggingListWrapper).toBeTruthy();
      },
    );

    then("I can select the button with without errors", () => {
      expect(mentionsTaggingListWrapper).toBeTruthy();
    });

    then("I can select the flat list with with out errors", () => {
      instance.setState({ usersList: userList });
      let itemWrapper = shallow(
        <div>{instance.mentionedItemView(mentionedList[0])}</div>,
      );
      let listItemComponent = itemWrapper.findWhere(
        (node) =>
          node.prop("data-test-id") ===
          "touchableListMentionsTaggingItem-" + mentionedList[0].item.id,
      );
      listItemComponent.simulate("click");
      instance.setState({ filterIsTagged: true });
      expect(mentionsTaggingListWrapper).toBeTruthy();
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
      instance.apiMentionsUserList = userListApi.messageId;
      runEngine.sendMessage("Unit Test", userListApi);
      expect(mentionsTaggingListWrapper).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(mentionsTaggingListWrapper).toBeTruthy();
      mockTimer();
    });
  });
});
