import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";
import GoalDetail from "../../src/GoalDetail/GoalDetail.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { handleTestApiCall } from "../../../../framework/src/Helpers/handle-test-api";
import { mockDetailGoal } from "./mockData";
import ConfirmModalWeb from "../../src/components/ConfirmModal/ConfirmModal.web";
import AlertDialogWeb from "../../src/components/AlertDialog/AlertDialog.web";

const feature = loadFeature(
  "./__tests__/features/GoalDetail-scenario.web.feature",
);

const navigation = {
  navigate: () => jest.fn(),
  getParam: jest.fn(),
};

const screenProps = {
  navigation: {
    ...navigation,
  },
  id: "GoalDetail",
};

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
  });

  test("User navigates to GoalDetailWeb", ({ given, when, then }) => {
    let goalDetailWebWrapper: ShallowWrapper;
    let goalDetailWebInstance: GoalDetail;

    given("I am a User loading GoalDetailWeb", () => {
      goalDetailWebWrapper = shallow(<GoalDetail {...screenProps} />);
      expect(goalDetailWebWrapper).toBeTruthy();
    });

    when("I navigate to the GoalDetailWeb", () => {
      goalDetailWebInstance = goalDetailWebWrapper.instance() as GoalDetail;

      expect(goalDetailWebWrapper).toBeTruthy();
    });

    then("GoalDetailWeb will load with out errors", () => {
      expect(goalDetailWebWrapper).toBeTruthy();
      goalDetailWebInstance.handleDeleteGoal();
      const deleteGoalCallApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      goalDetailWebInstance.deleteGoalWebApi = deleteGoalCallApi.messageId;
      handleTestApiCall(deleteGoalCallApi, {});

      goalDetailWebInstance.handleDetailGoal();
      const detailGoalCallApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      goalDetailWebInstance.detailGoalWebApi = detailGoalCallApi.messageId;
      handleTestApiCall(detailGoalCallApi, mockDetailGoal);

      goalDetailWebInstance.handleToggleDeleteModal();
      goalDetailWebInstance.handleGoToUpdateScreen();
      goalDetailWebInstance.handleGetTokenGoalDetail();

      const alertModal = shallow(
        <AlertDialogWeb
          content={"abc"}
          isVisible={true}
          title={"abc"}
          onClose={jest.fn}
        />,
      );
      expect(alertModal).toBeTruthy();

      goalDetailWebInstance.setState({
        success: true,
      });

      goalDetailWebInstance.handleCloseAlert();

      goalDetailWebInstance.setState({
        success: false,
      });
    });

    then("I can leave GoalDetailWeb with out errors", () => {
      const confirmModalWeb = shallow(
        <ConfirmModalWeb
          onToggleModal={jest.fn}
          onConfirm={jest.fn}
          titleModal={"ABC"}
          isVisible={true}
        />,
      );

      expect(confirmModalWeb).toBeTruthy();

      goalDetailWebInstance.componentWillUnmount();
      expect(goalDetailWebWrapper).toBeTruthy();
    });
  });
});
