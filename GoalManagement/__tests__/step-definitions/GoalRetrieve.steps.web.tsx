import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";
import GoalRetrieve from "../../src/GoalRetrieve/GoalRetrieve.web";
import { goalList } from "./mockData";
import { configJSON } from "../../src/GoalManagementController.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { handleTestApiCall } from "../../../../framework/src/Helpers/handle-test-api";
import { GoalItemList } from "../../src/components/GoalItemList/GoalItemList.web";
import InputComponent from "../../src/components/InputComponent/InputComponent.web";
import BackIconWeb from "../../src/components/BackIcon/BackIcon.web";

const feature = loadFeature(
  "./__tests__/features/GoalRetrieve-scenario.web.feature",
);

const navigation = {
  navigate: () => jest.fn(),
  getParam: jest.fn(),
};

const screenProps = {
  navigation: {
    ...navigation,
  },
  id: "GoalRetrieve",
};

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
  });

  test("User navigates to GoalRetrieveWeb", ({ given, when, then }) => {
    let goalRetrieveWebWrapper: ShallowWrapper;
    let goalRetrieveWebInstance: GoalRetrieve;

    given("I am a User loading GoalRetrieveWeb", () => {
      goalRetrieveWebWrapper = shallow(<GoalRetrieve {...screenProps} />);
      expect(goalRetrieveWebWrapper).toBeTruthy();
    });

    when("I navigate to the GoalRetrieveWeb", () => {
      goalRetrieveWebInstance =
        goalRetrieveWebWrapper.instance() as GoalRetrieve;

      goalRetrieveWebInstance.setState({ token: "abc" });
      expect(goalRetrieveWebWrapper).toBeTruthy();

      const goalItemCompWeb = shallow(
        <GoalItemList
          onDeleteGoal={jest.fn}
          goal={goalList[0]}
          navigation={navigation}
          totalGoal={10}
          indexGoal={2}
        />,
      );

      expect(goalItemCompWeb).toBeTruthy();

      let goalItemBtn = goalItemCompWeb.findWhere(
        (node) => node.prop("id") === "deleteButtonId",
      );
      goalItemBtn.simulate("click");
      goalItemBtn = goalItemCompWeb.findWhere(
        (node) => node.prop("id") === "updateButtonId",
      );
      goalItemBtn.simulate("click");
      goalItemBtn = goalItemCompWeb.findWhere(
        (node) => node.prop("id") === "detailButtonId",
      );
      goalItemBtn.simulate("click");

      let goalItemModal = goalItemCompWeb.findWhere(
        (node) => node.prop("testID") === "confirmModalId",
      );
      goalItemModal.prop("onConfirm")(jest.fn);
      goalItemModal.prop("onToggleModal")(jest.fn);
    });

    then("GoalRetrieveWeb will load with out errors", () => {
      expect(goalRetrieveWebWrapper).toBeTruthy();

      goalRetrieveWebInstance.setState({
        filterVisible: true,
        calendarVisible: true,
      });

      goalRetrieveWebInstance.handleSearchGoalWeb({
        nameFilter: "abc",
        dateFilter: "1-1-1",
      });
      const searchGoalApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      goalRetrieveWebInstance.searchGoalWebId = searchGoalApi.messageId;
      handleTestApiCall(searchGoalApi, {
        goals: {
          data: goalList,
        },
        message: configJSON.errorGetListMessage,
      });

      goalRetrieveWebInstance.handleGetGoalListWeb();
      const getGoalListCallApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      goalRetrieveWebInstance.getGoalListWebId = getGoalListCallApi.messageId;
      handleTestApiCall(getGoalListCallApi, {
        goals: {
          data: goalList,
        },
        message: configJSON.errorGetListMessage,
      });

      goalRetrieveWebInstance.handleDeleteGoalWeb(goalList[0]);
      const deleteGoalListCallApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      goalRetrieveWebInstance.deleteGoalItemWebApi =
        deleteGoalListCallApi.messageId;
      handleTestApiCall(deleteGoalListCallApi, {});

      goalRetrieveWebInstance.handleChangeText("abc");
      goalRetrieveWebInstance.handleSelectDate("1-1-1");
      goalRetrieveWebInstance.handleGetTokenWeb();
      goalRetrieveWebInstance.handleToggleFilterVisible();
      goalRetrieveWebInstance.handleToggleFilterSelectionVisible();
      goalRetrieveWebInstance.handleToggleCalendarVisible();
      goalRetrieveWebInstance.handleCancelFilter();
      goalRetrieveWebInstance.handleDebounce(jest.fn, 500);
    });

    then("I can leave GoalRetrieveWeb with out errors", () => {
      const InputComponentWeb = shallow(<InputComponent errorTitle={"abc"} />);
      expect(InputComponentWeb).toBeTruthy();

      const BackButton = shallow(<BackIconWeb onClick={jest.fn} />);
      expect(BackButton).toBeTruthy();

      goalRetrieveWebInstance.componentWillUnmount();
      expect(goalRetrieveWebWrapper).toBeTruthy();
    });
  });
});
