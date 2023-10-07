import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";
import GoalRetrieve from "../../src/GoalRetrieve/GoalRetrieve";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { handleTestApiCall } from "../../../../framework/src/Helpers/handle-test-api";
import { configJSON } from "../../src/GoalManagementController.web";
import GoalItemList from "../../src/components/GoalItemList/GoalItemList";
import { goalList } from "./mockData";

const feature = loadFeature(
  "./__tests__/features/GoalRetrieve-scenario.feature",
);

const navigation = {
  navigate: () => jest.fn(),
  replace: () => jest.fn(),
};

const screenProps = {
  navigation: navigation,
  id: "GoalRetrieve",
};

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
  });

  test("User navigates to GoalRetrieve", ({ given, when, then }) => {
    let goalRetrieveShallowWrapper: ShallowWrapper;
    let goalRetrieveInstance: GoalRetrieve;

    given("I am a User loading GoalRetrieve", () => {
      goalRetrieveShallowWrapper = shallow(<GoalRetrieve {...screenProps} />);
    });

    when("I navigate to the GoalRetrieve", () => {
      goalRetrieveInstance =
        goalRetrieveShallowWrapper.instance() as GoalRetrieve;

      goalRetrieveInstance.setState({ token: "abc" });
      expect(goalRetrieveShallowWrapper).toBeTruthy();

      const containerGoalCreate = goalRetrieveShallowWrapper.findWhere(
        (node) => node.prop("testID") === "containerID",
      );
      expect(containerGoalCreate).toBeTruthy();

      let flatList = containerGoalCreate
        .findWhere((node) => node.prop("testID") === "flatListID")
        .props()
        .keyExtractor({ id: 3 });

      expect(flatList).toEqual("3");

      flatList = containerGoalCreate
        .findWhere((node) => node.prop("testID") === "flatListID")
        .renderProp("renderItem")({ item: goalList[0] });

      expect(flatList).toBeTruthy();

      const goalItemComponent = shallow(
        <GoalItemList
          onDeleteGoal={jest.fn}
          goal={goalList[0]}
          navigation={navigation}
          token={"abc"}
        />,
      );

      expect(goalItemComponent).toBeTruthy();

      let goalItemBtn = goalItemComponent.findWhere(
        (node) => node.prop("testID") === "goalItemToggleModalID",
      );
      goalItemBtn.simulate("press");
      goalItemBtn = goalItemComponent.findWhere(
        (node) => node.prop("testID") === "goalItemUpdateID",
      );
      goalItemBtn.simulate("press");
      goalItemBtn = goalItemComponent.findWhere(
        (node) => node.prop("testID") === "goalItemID",
      );
      goalItemBtn.simulate("press");

      let goalItemModal = goalItemComponent.findWhere(
        (node) => node.prop("testID") === "goalModalID",
      );
      goalItemModal.prop("onConfirm")(jest.fn);
      goalItemModal.prop("onToggleModal")(jest.fn);
    });

    then("GoalRetrieve will load with out errors", () => {
      expect(goalRetrieveShallowWrapper).toBeTruthy();

      goalRetrieveInstance.setState({
        filterVisible: true,
        calendarVisible: true,
      });

      goalRetrieveInstance.handleSearchGoal({
        nameFilter: "abc",
        dateFilter: "1-1-1",
      });

      const searchGoalListCallApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      goalRetrieveInstance.searchGoalMobile = searchGoalListCallApi.messageId;
      handleTestApiCall(searchGoalListCallApi, {
        goals: {
          data: goalList,
        },
        message: configJSON.errorGetListMessage,
      });

      goalRetrieveInstance.handleGetGoalList();

      const getGoalListCallApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      goalRetrieveInstance.getGoalListMobile = getGoalListCallApi.messageId;
      handleTestApiCall(getGoalListCallApi, {
        goals: {
          data: goalList,
        },
        message: configJSON.errorGetListMessage,
      });

      goalRetrieveInstance.handleDeleteGoal(goalList[0]);
      const deleteGoalListCallApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      goalRetrieveInstance.deleteGoalMobile = deleteGoalListCallApi.messageId;
      handleTestApiCall(deleteGoalListCallApi, {});

      goalRetrieveInstance.handleChangeText("abc");
      goalRetrieveInstance.handleSelectDate({
        day: 1,
        month: 1,
        year: 1,
        dateString: "1-1-1",
        timestamp: 123,
      });
      goalRetrieveInstance.handleGetTokenMobile();
      goalRetrieveInstance.handleGoBack();
      goalRetrieveInstance.handleToggleFilterVisible();
      goalRetrieveInstance.handleToggleFilterSelectionVisible();
      goalRetrieveInstance.handleToggleCalendarVisible();
      goalRetrieveInstance.handleCancelFilter();
      goalRetrieveInstance.handleInputDebounce(jest.fn, 500);
    });

    then("I can leave GoalRetrieve with out errors", () => {
      goalRetrieveInstance.componentWillUnmount();
      expect(goalRetrieveShallowWrapper).toBeTruthy();
    });
  });
});
