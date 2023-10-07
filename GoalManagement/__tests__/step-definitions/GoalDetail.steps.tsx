import * as React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import GoalDetail from "../../src/GoalDetail/GoalDetail";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { handleTestApiCall } from "../../../../framework/src/Helpers/handle-test-api";
import { mockDetailGoal } from "./mockData";

const feature = loadFeature("./__tests__/features/GoalDetail-scenario.feature");

const navigation = {
  navigate: () => jest.fn(),
  replace: () => jest.fn(),
  state: {
    params: {
      goal: undefined,
      token: undefined,
    },
  },
};

const screenProps = {
  navigation: navigation,
  id: "GoalDetail",
};

const otherScreenProps = {
  navigation: {
    ...navigation,
    state: {
      params: {
        goal: mockDetailGoal,
        token: "abc",
      },
    },
  },
  id: "GoalDetail",
};

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
  });

  test("User navigates to GoalDetail", ({ given, when, then }) => {
    let goalDetailShallowWrapper: ShallowWrapper;
    let goalDetailInstance: GoalDetail;

    given("I am a User loading GoalDetail", () => {
      goalDetailShallowWrapper = shallow(<GoalDetail {...screenProps} />);
      expect(goalDetailShallowWrapper).toBeTruthy();
    });

    when("I navigate to the GoalDetail", () => {
      goalDetailInstance = goalDetailShallowWrapper.instance() as GoalDetail;

      goalDetailShallowWrapper = shallow(<GoalDetail {...otherScreenProps} />);
      expect(goalDetailShallowWrapper).toBeTruthy();

      goalDetailInstance.setState({ token: "abc" });

      expect(goalDetailShallowWrapper).toBeTruthy();

      const containerGoalCreate = goalDetailShallowWrapper.findWhere(
        (node) => node.prop("testID") === "containerID",
      );
      expect(containerGoalCreate).toBeTruthy();
    });

    then("GoalDetail will load with out errors", () => {
      expect(goalDetailShallowWrapper).toBeTruthy();

      goalDetailInstance.handleDeleteGoal();
      const deleteGoalCallApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      goalDetailInstance.deleteGoalCallApi = deleteGoalCallApi.messageId;
      handleTestApiCall(deleteGoalCallApi, {});

      goalDetailInstance.handleToggleDeleteModal();
      goalDetailInstance.handleGoBack();
      goalDetailInstance.handleGoToUpdateScreen();
      goalDetailInstance.handleGetTokenGoalDetail();
    });

    then("I can leave GoalDetail with out errors", () => {
      goalDetailInstance.componentWillUnmount();
      expect(goalDetailShallowWrapper).toBeTruthy();
    });
  });
});
