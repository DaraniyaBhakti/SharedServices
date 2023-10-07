import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import * as React from "react";
import GoalManagement from "../../src/GoalManagement.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { handleTestApiCall } from "../../../../framework/src/Helpers/handle-test-api";

const navigation = { navigate: jest.fn() };

const goalManagementScreenProps = {
  navigation: navigation,
  id: "GoalManagement",
};

const featureGoalManagementWeb = loadFeature(
  "./__tests__/features/GoalManagement-scenario.web.feature",
);

defineFeature(featureGoalManagementWeb, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to GoalManagement", ({ given, when, then }) => {
    let goalManagementWebShallowWrapper: ShallowWrapper;
    let goalManagementWebInstance: GoalManagement;

    given("I am a User loading GoalManagement", () => {
      goalManagementWebShallowWrapper = shallow(
        <GoalManagement {...goalManagementScreenProps} />,
      );
    });

    when("I navigate to the GoalManagement", () => {
      goalManagementWebInstance =
        goalManagementWebShallowWrapper.instance() as GoalManagement;
    });

    then("GoalManagement will load with out errors", () => {
      expect(goalManagementWebShallowWrapper).toBeTruthy();
    });

    then("I can enter text with out errors", () => {
      expect(goalManagementWebShallowWrapper).toBeTruthy();

      goalManagementWebInstance.handleLoginGoalWeb();

      const loginGoalManagementAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );

      goalManagementWebInstance.loginGoalWebApi =
        loginGoalManagementAPI.messageId;

      handleTestApiCall(loginGoalManagementAPI, {});

      goalManagementWebInstance.handleGoToGoalCreateWeb();
      goalManagementWebInstance.handleGoToGoalRetrieveWeb();
    });

    then("I can select the button with with out errors", () => {
      expect(goalManagementWebShallowWrapper).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      goalManagementWebInstance.componentWillUnmount();
      expect(goalManagementWebShallowWrapper).toBeTruthy();
    });
  });
});
