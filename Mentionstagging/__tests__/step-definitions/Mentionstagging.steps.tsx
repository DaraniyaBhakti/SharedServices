import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Mentionstagging from "../../src/Mentionstagging";
import { View } from "react-native";
import { apiPostList, apiUserList } from "./mockData";

const screenProps = {
  navigation: {
    addListener: jest.fn().mockImplementation((event, callback) => {
      callback();
    }),
    navigate: jest.fn(),
  },
  id: "Mentionstagging",
};

const feature = loadFeature(
  "./__tests__/features/Mentionstagging-scenario.feature",
);

defineFeature(feature, (test) => {
  const postItem = {
    item: {
      id: "22",
      body: "Hello @[David Tabaka](5)! How are you?",
      location: "Post Location",
      title: "Post Title",
      description: "Post Description",
      accountId: 24,
      mentions_ids: [7, 8, 4],
      tags_ids: [9, 3],
    },
    index: 0,
  };
  const loginAPiResponse = {
    meta: {
      token:
        "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MjQsImV4cCI6MTY3Njk1NDkzMywidG9rZW5fdHlwZSI6ImxvZ2luIn0.MbIl_Bdx7gRPeqYQ6zpbvs7d-8lEO7xH0L9KmUwhyQyGqrURBzD2HC2RSXcokyaP6Ig5X2kivRbgJmUaaPl7Cw",
      refresh_token:
        "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MjQsImV4cCI6MTcwODQwNDUzMywidG9rZW5fdHlwZSI6InJlZnJlc2gifQ.DYjnVU8uN7FR08fso4sqKgg1N9hbVNgZa9AYS6nWMxi0Ay4i_ux3m6M0UaCLGteWk0X4RQLXwIRd1MlEyfbw1g",
      id: 24,
    },
  };

  const userList = [
    { id: "33", name: "John-Doe" },
    { id: "24", name: "User-24" },
    { id: "35", name: "User-35" },
  ];

  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
  });

  test("User navigates to Mentionstagging", ({ given, when, then }) => {
    let mentionsTaggingWrapper: ShallowWrapper;
    let instance: Mentionstagging;

    given("I am a User loading Mentionstagging", () => {
      mentionsTaggingWrapper = shallow(<Mentionstagging {...screenProps} />);
    });

    when("I navigate to the Mentionstagging", () => {
      instance = mentionsTaggingWrapper.instance() as Mentionstagging;
    });

    then("Mentionstagging will load with out errors", () => {
      instance.setEnableField();
      instance.setState({ enableField: true });
      expect(mentionsTaggingWrapper).toBeTruthy();
    });

    then(
      "I can select the touchable without feedback with without errors",
      () => {
        let buttonComponent = mentionsTaggingWrapper.findWhere(
          (node) => node.prop("testID") === "touchableWithoutFeedback",
        );
        buttonComponent.simulate("press");
        expect(mentionsTaggingWrapper).toBeTruthy();
      },
    );

    then("I can select the button with without errors", () => {
      let buttonComponent = mentionsTaggingWrapper.findWhere(
        (node) => node.prop("testID") === "btnAddPost",
      );
      buttonComponent.simulate("press");
      expect(mentionsTaggingWrapper).toBeTruthy();
    });

    then("I can select the flat list with with out errors", () => {
      instance.setState({ userList: userList });
      let flatList = mentionsTaggingWrapper.findWhere(
        (node) => node.prop("testID") === "listPostItem",
      );
      flatList.renderProp("renderItem")(postItem);
      flatList.props().keyExtractor({ id: 3 });
      flatList.prop("ListEmptyComponent")();
      flatList.simulate("press");
      expect(instance).toBeTruthy();
    });

    then("I can select the floating action button with with out errors", () => {
      expect(instance).toBeTruthy();
      let buttonComponent = mentionsTaggingWrapper.findWhere(
        (node) => node.prop("testID") === "btnMentionsTagging",
      );
      jest.spyOn(instance, "navigateToMentionsTaggingList");
      buttonComponent.simulate("press");
      expect(instance.navigateToMentionsTaggingList).toHaveBeenCalled();
    });

    then("I can select Post Item with with out errors", () => {
      let itemWrapper = shallow(<View>{instance.postItemView(postItem)}</View>);
      let buttonComponent = itemWrapper.findWhere(
        (node) =>
          node.prop("testID") === "touchableListPostItem-" + postItem.item.id,
      );
      buttonComponent.simulate("press");
      expect(buttonComponent).toHaveLength(1);
    });

    then("Login API load with out errors", () => {
      const loginApi: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      loginApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        loginApi.messageId,
      );
      loginApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(loginAPiResponse)),
      );
      instance.apiEmailLoginCallId = loginApi.messageId;
      runEngine.sendMessage("Unit Test", loginApi);
      expect(mentionsTaggingWrapper).toBeTruthy();
    });

    then("Post List API load with out errors", () => {
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
      instance.apiPostList = postListApi.messageId;
      runEngine.sendMessage("Unit Test", postListApi);
      expect(mentionsTaggingWrapper).toBeTruthy();
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
      instance.apiUserList = userListApi.messageId;
      runEngine.sendMessage("Unit Test", userListApi);
      expect(mentionsTaggingWrapper).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(mentionsTaggingWrapper).toBeTruthy();
    });
  });
});
