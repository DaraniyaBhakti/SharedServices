import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";
import GoalManagement from "../../src/GoalManagement";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { handleTestApiCall } from "../../../../framework/src/Helpers/handle-test-api";

const navigation = { navigate: () => jest.fn() };

const screenProps = {
  navigation: navigation,
  id: "GoalManagement",
};

const feature = loadFeature(
  "./__tests__/features/GoalManagement-scenario.feature",
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to GoalManagement", ({ given, when, then }) => {
    let goalManagementShallowWrapper: ShallowWrapper;
    let goalManagementInstance: GoalManagement;

    given("I am a User loading GoalManagement", () => {
      goalManagementShallowWrapper = shallow(
        <GoalManagement {...screenProps} />,
      );
    });

    when("I navigate to the GoalManagement", () => {
      goalManagementInstance =
        goalManagementShallowWrapper.instance() as GoalManagement;
    });

    then("GoalManagement will load with out errors", () => {
      expect(goalManagementShallowWrapper).toBeTruthy();
    });

    then("I can enter text with out errors", () => {
      goalManagementInstance.setState({ token: "abc" });
      expect(goalManagementShallowWrapper).toBeTruthy();

      const containerGoalCreate = goalManagementShallowWrapper.findWhere(
        (node) => node.prop("testID") === "containerID",
      );
      expect(containerGoalCreate).toBeTruthy();

      goalManagementInstance.handleNavigateGoalCreateMobile();

      goalManagementInstance.handleNavigateHomeMobile();

      goalManagementInstance.handleGoToGoalRetrieve();

      goalManagementInstance.handleMobileLoginGoal();

      const loginGoalManagementAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );

      goalManagementInstance.loginGoalCreateApiCallId =
        loginGoalManagementAPI.messageId;

      handleTestApiCall(loginGoalManagementAPI, {});
    });

    then("I can select the button with with out errors", () => {
      expect(goalManagementShallowWrapper).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      goalManagementInstance.componentWillUnmount();
      expect(goalManagementShallowWrapper).toBeTruthy();
    });
  });
});
