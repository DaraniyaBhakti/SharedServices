import { defineFeature, loadFeature } from "jest-cucumber";
import { HTMLAttributes, shallow, ShallowWrapper } from "enzyme";
import * as React from "react";
import GoalCreate from "../../src/GoalCreate/GoalCreate.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { handleTestApiCall } from "../../../../framework/src/Helpers/handle-test-api";
import { mockGoal } from "./mockData";

const feature = loadFeature(
  "./__tests__/features/GoalCreate-scenario.web.feature",
);

const navigation = {
  navigate: () => jest.fn(),
  getParam: jest.fn(),
};

const screenProps = {
  navigation: {
    ...navigation,
  },
  id: "GoalCreate",
};

function testWebInputFormik(input: {
  testDataId: string;
  fieldName: string;
  instanceComponent: ShallowWrapper<
    HTMLAttributes,
    any,
    React.Component<{}, {}, any>
  >;
}) {
  const { testDataId, fieldName, instanceComponent } = input;

  const component = instanceComponent
    .dive()
    .findWhere((node) => node.prop("data-test-id") === testDataId);

  component.prop("onChange")("abc");
  expect(component.prop("onChange")).toBeDefined();
  component.prop("onBlur")({ target: { [fieldName]: "" } });
  expect(component).toBeTruthy();
}

defineFeature(feature, (test) => {
  beforeEach(() => {});

  test("User navigates to GoalCreateWeb", ({ given, when, then }) => {
    let goalCreateWrapper: ShallowWrapper;
    let goalCreateWebInstance: GoalCreate;

    given("I am a User loading GoalCreateWeb", () => {
      goalCreateWrapper = shallow(<GoalCreate {...screenProps} />);
      expect(goalCreateWrapper).toBeTruthy();
    });

    when("I navigate to the GoalCreateWeb", () => {
      goalCreateWebInstance = goalCreateWrapper.instance() as GoalCreate;
      goalCreateWebInstance.setState({
        fetching: false,
        goal: {},
      });
      expect(goalCreateWrapper).toBeTruthy();

      goalCreateWebInstance.handleSubmitWeb({
        name: "abc",
        description: "abc",
        goalStatus: "tracked",
        goalEndDate: new Date("2023-02-17T00:00:00.000Z"),
        goalStartDate: new Date("2023-02-17T00:00:00.000Z"),
        rewards: "abc",
        target: "abc",
      });
      goalCreateWebInstance.initialGoalId = 5;
      goalCreateWebInstance.handleSubmitWeb({
        name: "abc",
        description: "abc",
        goalStatus: "tracked",
        goalEndDate: new Date("2023-02-17T00:00:00.000Z"),
        goalStartDate: new Date("2023-02-17T00:00:00.000Z"),
        rewards: "abc",
        target: "abc",
      });

      expect(goalCreateWrapper).toBeTruthy();

      goalCreateWebInstance.setState({
        token: "abc",
        goal: mockGoal,
        deleteLoading: true,
        updateLoading: true,
        createLoading: true,
        fetching: false,
      });

      goalCreateWebInstance.handleCreateGoal("");
      const createGoalCallApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      goalCreateWebInstance.createGoalWebApi = createGoalCallApi.messageId;
      handleTestApiCall(createGoalCallApi, {});

      goalCreateWebInstance.handleUpdateGoal("");
      const updateGoalCallApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      goalCreateWebInstance.updateGoalWebApi = updateGoalCallApi.messageId;
      handleTestApiCall(updateGoalCallApi, {});

      goalCreateWebInstance.handleDeleteGoal();
      const deleteGoalCallApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      goalCreateWebInstance.deleteGoalWebApi = deleteGoalCallApi.messageId;
      handleTestApiCall(deleteGoalCallApi, {});

      goalCreateWebInstance.handleDetailGoal();
      const detailGoalCallApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      goalCreateWebInstance.detailGoalCallApi = detailGoalCallApi.messageId;
      handleTestApiCall(detailGoalCallApi, {});
    });

    then("GoalCreateWeb will load with out errors", () => {
      goalCreateWebInstance.setState({
        goal: mockGoal,
        fetching: false,
      });
      expect(goalCreateWrapper).toBeTruthy();

      goalCreateWebInstance.handleToggleDeleteModal();

      goalCreateWebInstance.handleGetTokenWeb();

      goalCreateWebInstance.setState({
        success: true,
      });

      goalCreateWebInstance.handleCloseAlert();

      goalCreateWebInstance.setState({
        success: false,
      });

      goalCreateWebInstance.handleCloseAlert();

      goalCreateWebInstance.handleSubmitWeb({
        name: "abc",
        description: "abc",
        goalStatus: "tracked",
        goalEndDate: new Date("2023-02-17T00:00:00.000Z"),
        goalStartDate: new Date("2023-02-17T00:00:00.000Z"),
        rewards: "abc",
        target: "abc",
      });

      const container = goalCreateWrapper.findWhere(
        (node) => node.prop("data-test-id") === "containerId",
      );

      expect(container).toBeTruthy();

      const formikWeb = container
        .dive()
        .findWhere((node) => node.prop("data-test-id") === "formikTest");

      expect(formikWeb).toBeTruthy();

      testWebInputFormik({
        testDataId: "nameTest",
        fieldName: "name",
        instanceComponent: formikWeb,
      });
      testWebInputFormik({
        testDataId: "descriptionTest",
        fieldName: "description",
        instanceComponent: formikWeb,
      });
      testWebInputFormik({
        testDataId: "targetTest",
        fieldName: "target",
        instanceComponent: formikWeb,
      });
      testWebInputFormik({
        testDataId: "rewardTest",
        fieldName: "rewards",
        instanceComponent: formikWeb,
      });

      const goalStartDateComponent = formikWeb
        .dive()
        .findWhere((node) => node.prop("data-test-id") === "goalStartDateTest");

      goalStartDateComponent.prop("onChange")({
        target: { goalStartDate: "1-1-1" },
      });

      const goalEndDateComponent = formikWeb
        .dive()
        .findWhere((node) => node.prop("data-test-id") === "goalEndDateTest");

      goalEndDateComponent.prop("onChange")({
        target: { goalEndDate: "1-1-1" },
      });
    });

    then("I can leave GoalCreateWeb with out errors", () => {
      goalCreateWebInstance.componentWillUnmount();
      expect(goalCreateWrapper).toBeTruthy();
    });
  });
});
