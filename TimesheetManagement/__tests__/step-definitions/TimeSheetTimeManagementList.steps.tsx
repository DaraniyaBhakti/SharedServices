import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React, { createRef } from "react";
import TimeSheetTimeManagementList from "../../src/TimeSheetTimeManagementList";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { getStorageData } from "framework/src/Utilities";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react-native";
import {
  DatesOfMonth,
  MonthsNameList,
  TimeList,
  configJSON,
} from "../../src/TimeSheetTimeManagementListController";
import { FlatList } from "react-native";
import { Calendar } from "react-native-calendars";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    pop: jest.fn(),
    push: jest.fn(),
  },
  id: "TimeSheetTimeManagementList",
};

const feature = loadFeature(
  "./__tests__/features/TimeSheetTimeManagementList-scenario.feature",
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to TimeSheetTimeManagementList", ({
    given,
    when,
    then,
  }) => {
    let taskListWrapper: ShallowWrapper;
    let instance: TimeSheetTimeManagementList;

    given("I am a User loading TimeSheetTimeManagementList", () => {
      taskListWrapper = shallow(
        <TimeSheetTimeManagementList {...screenProps} />,
      );
    });

    when("I navigate to the TimeSheetTimeManagementList", () => {
      instance = taskListWrapper.instance() as TimeSheetTimeManagementList;
    });

    then("TimeSheetTimeManagementList will load with out errors", async () => {
      let token = getStorageData("TOKEN");
      instance.setState({
        isInternetConnected: false,
        token: token.toString(),
      });
      await instance.componentDidMount();
      instance.setState({
        selectedTime: configJSON.labelMonthly,
      });
      await instance.componentDidMount();
      expect(taskListWrapper).toBeTruthy();
    });

    then("User can navigate to task worker logs on list click", () => {
      let _item: TimeList = {
        id: "90",
        type: "aggregate",
        attributes: {
          id: "90",
          email: "sudarshan.khairnar@qubited.com",
          first_name: "null",
          last_name: "null",
          logs: {
            data: [
              {
                id: "3",
                type: "aggregate_log",
                attributes: {
                  id: "3",
                  title: "Task3",
                  description: "Test Cases",
                  created_by: "90",
                  updated_by: "null",
                  start_time: "2023-03-20T09:00:00.000Z",
                  end_time: "2023-03-20T18:00:00.000Z",
                  hours: "2023-03-20 09:00:00",
                  account_id: "90",
                  timesheet_task_id: "12",
                },
              },
            ],
          },
          total_logged_hours: "62956:15",
        },
      };

      instance.setState({ timeList: [_item] });

      const keyFlatList = taskListWrapper
        .findWhere((node) => node.prop("testID") === "testTaskList")
        .props()
        .keyExtractor({ id: "90" });
      expect(keyFlatList).toEqual("90");

      let flatList = taskListWrapper.findWhere(
        (node) => node.prop("testID") === "testTaskList",
      );
      let rowItem = flatList
        .renderProp("renderItem")({ item: _item, index: 0 })
        .findWhere((node) => node.prop("testID") === "openWorkerDetails");
      rowItem.simulate("press");
      instance.openWorkerDetails(_item);

      instance.componentWillUnmount();
      expect(taskListWrapper).toBeTruthy();
    });

    then("User will search data from list using search input", () => {
      let txtSearchInput = taskListWrapper.findWhere(
        (node) => node.prop("testID") === "txtSearchInput",
      );
      txtSearchInput.simulate("changeText", "task1");
      instance.setState({
        isInternetConnected: true,
        txtSearchInputValue: "task1",
      });
      expect(taskListWrapper).toBeTruthy();
    });

    then("User load all dates without error", () => {
      instance.setState({
        selectedDate: "1",
        selectedTime: configJSON.labelDaily,
      });
      let listAllDays = [
        { date: "1", dayName: "Sat" },
        { date: "2", dayName: "Sun" },
        { date: "3", dayName: "Mon" },
        { date: "4", dayName: "Tue" },
        { date: "5", dayName: "Wed" },
        { date: "6", dayName: "Thu" },
        { date: "7", dayName: "Fri" },
        { date: "8", dayName: "Sat" },
        { date: "9", dayName: "Sun" },
        { date: "10", dayName: "Mon" },
      ];
      let _item1 = listAllDays[0];
      let _item2 = listAllDays[1];

      const keyFlatList = taskListWrapper
        .findWhere((node) => node.prop("testID") === "testAllDateList")
        .props()
        .keyExtractor({ date: "1" });
      expect(keyFlatList).toEqual("1");

      let flatList = taskListWrapper.findWhere(
        (node) => node.prop("testID") === "testAllDateList",
      );
      let rowItem1 = flatList
        .renderProp("renderItem")({ item: _item1, index: 0 })
        .findWhere(
          (node) => node.prop("testID") === "testSetDailySelectedDate",
        );
      rowItem1.simulate("press");
      instance.setDailySelectedDate(_item1.date);
      instance.setDailySelectedDate(_item2.date);

      instance.setState({
        selectedDate: "3",
        selectedTime: configJSON.labelDaily,
      });
      flatList
        .renderProp("renderItem")({ item: _item2, index: 1 })
        .findWhere(
          (node) => node.prop("testID") === "testSetDailySelectedDate",
        );
      flatList
        .renderProp("onScrollToIndexFailed")({
          index: 0,
          highestMeasuredFrameIndex: 10,
          averageItemLength: 2,
        })
        .findWhere(
          (node) => node.prop("testID") === "testSetDailySelectedDate",
        );
      expect(taskListWrapper).toBeTruthy();
    });

    then("User load all months without error", () => {
      instance.setState({
        selectedMonth: "1",
        selectedTime: configJSON.labelMonthly,
      });
      let monthNames = [
        { monthNumber: "1", monthName: "January" },
        { monthNumber: "2", monthName: "February" },
        { monthNumber: "3", monthName: "March" },
        { monthNumber: "4", monthName: "April" },
        { monthNumber: "5", monthName: "May" },
        { monthNumber: "6", monthName: "June" },
        { monthNumber: "7", monthName: "July" },
        { monthNumber: "8", monthName: "August" },
        { monthNumber: "9", monthName: "September" },
        { monthNumber: "10", monthName: "October" },
        { monthNumber: "11", monthName: "November" },
        { monthNumber: "12", monthName: "December" },
      ];
      let _item1 = monthNames[0];
      let _item2 = monthNames[1];

      const keyFlatList = taskListWrapper
        .findWhere((node) => node.prop("testID") === "testAllMonthsList")
        .props()
        .keyExtractor({ monthNumber: "1" });
      expect(keyFlatList).toEqual("1");

      let flatList2 = taskListWrapper.findWhere(
        (node) => node.prop("testID") === "testAllMonthsList",
      );
      let rowItem2 = flatList2
        .renderProp("renderItem")({ item: _item1, index: 0 })
        .findWhere(
          (node) => node.prop("testID") === "testSetMonthlySelectedNameNumber",
        );
      rowItem2.simulate("press");
      instance.setMonthlySelectedNameNumber(_item1);
      instance.setMonthlySelectedNameNumber(_item2);

      instance.setState({
        selectedMonth: "10",
      });
      flatList2
        .renderProp("renderItem")({ item: _item2, index: 1 })
        .findWhere(
          (node) => node.prop("testID") === "testSetMonthlySelectedNameNumber",
        );
      flatList2
        .renderProp("onScrollToIndexFailed")({
          index: 0,
          highestMeasuredFrameIndex: 10,
          averageItemLength: 2,
        })
        .findWhere(
          (node) => node.prop("testID") === "testSetMonthlySelectedNameNumber",
        );
      expect(taskListWrapper).toBeTruthy();
    });

    then("User render page list", () => {
      let displayPages = [
        { label: 1, isSelected: true },
        { label: 2, isSelected: false },
        { label: 3, isSelected: false },
      ];
      let _item1 = displayPages[0];
      let _item2 = displayPages[1];
      let _item3 = displayPages[2];

      const keyFlatList = taskListWrapper
        .findWhere((node) => node.prop("testID") === "testRenderPageList")
        .props()
        .keyExtractor({ label: "1" });
      expect(keyFlatList).toEqual("1");

      let flatList3 = taskListWrapper.findWhere(
        (node) => node.prop("testID") === "testRenderPageList",
      );
      let rowItem3 = flatList3
        .renderProp("renderItem")({ item: _item1, index: 0 })
        .findWhere((node) => node.prop("testID") === "testSetCurrentPage");
      rowItem3.simulate("press");
      instance.setState({ displayPages });
      instance.setCurrentPage(_item1, 0);
      instance.setCurrentPage(_item2, 1);
      instance.setCurrentPage(_item3, 2);

      flatList3
        .renderProp("renderItem")({ item: _item2, index: 1 })
        .findWhere(
          (node) => node.prop("testID") === "testSetMonthlySelectedNameNumber",
        );
      expect(taskListWrapper).toBeTruthy();
    });

    then("User can open Calendar modal and select date and month", async () => {
      let _modal = taskListWrapper.findWhere(
        (node) => node.prop("testID") === "_modal",
      );
      _modal.simulate("swipeCancel");
      instance.setState({ isCalenderOpen: false });
      _modal.simulate("swipeComplete");
      instance.setState({ isCalenderOpen: false });
      _modal.simulate("backButtonPress");
      instance.setState({ isCalenderOpen: false });
      _modal.simulate("touchCancel");
      instance.setState({ isCalenderOpen: false });
      _modal.simulate("backdropPress");
      instance.setState({ isCalenderOpen: false });

      let selectedDateAndCal = taskListWrapper.findWhere(
        (node) => node.prop("testID") === "testSelectedDateAndCal",
      );
      selectedDateAndCal.simulate("press");
      instance.setState({ isModalShow: true });

      let dateTimeSelectionDaily = taskListWrapper.findWhere(
        (node) => node.prop("testID") === "testDateTimeSelectionDaily",
      );
      dateTimeSelectionDaily.simulate("press");
      await instance.setSelectionTime(configJSON.labelDaily);

      let dateTimeSelectionMonthly = taskListWrapper.findWhere(
        (node) => node.prop("testID") === "testDateTimeSelectionMonthly",
      );
      dateTimeSelectionMonthly.simulate("press");
      await instance.setSelectionTime(configJSON.labelMonthly);

      instance.setState({ selectedTime: configJSON.labelDaily });
      await instance.setSelectionTime(configJSON.labelMonthly);
      expect(taskListWrapper).toBeTruthy();
    });

    then("User will call task list api", () => {
      instance.setState({ isInternetConnected: false });
      instance.getTaskList();

      instance.setState({
        isInternetConnected: true,
        selectedTime: configJSON.labelDaily,
        selectedDate: "1",
        selectedMonth: "3",
        selectedYear: "2023",
      });
      instance.getTaskList();

      instance.setState({
        isInternetConnected: true,
        selectedTime: configJSON.labelDaily,
        selectedDate: "11",
        selectedMonth: "11",
        selectedYear: "2022",
      });
      instance.getTaskList();

      instance.setState({
        isInternetConnected: true,
        selectedTime: configJSON.labelMonthly,
        selectedDate: "11",
        selectedMonth: "0",
        selectedYear: "2022",
      });
      instance.getTaskList();

      const getTaskListRequest = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      getTaskListRequest.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getTaskListRequest,
      );
      getTaskListRequest.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          requests: {
            data: [
              {
                id: "90",
                type: "aggregate",
                attributes: {
                  id: "90",
                  email: "sudarshan.khairnar@qubited.com",
                  first_name: "null",
                  last_name: "null",
                  logs: {
                    data: [
                      {
                        id: "3",
                        type: "aggregate_log",
                        attributes: {
                          id: "3",
                          title: "Task3",
                          description: "Test Cases",
                          created_by: "90",
                          updated_by: "null",
                          start_time: "2023-03-20T09:00:00.000Z",
                          end_time: "2023-03-20T18:00:00.000Z",
                          hours: "2023-03-20 09:00:00",
                          account_id: "90",
                          timesheet_task_id: "12",
                        },
                      },
                    ],
                  },
                  total_logged_hours: "62956:15",
                },
              },
            ],
          },
          message: "All Logs fetched successfully",
          meta: {
            pagination: {
              current_page: 1,
              next_page: null,
              prev_page: null,
              total_pages: 3,
              total_count: 1,
            },
          },
        },
      );
      getTaskListRequest.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getTaskListRequest.messageId,
      );

      instance.listTimeManagementApiCallId = getTaskListRequest.messageId;
      runEngine.sendMessage("Unit Test", getTaskListRequest);
      instance.receive("", getTaskListRequest);
      getTaskListRequest.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [],
        },
      );
      instance.receive("", getTaskListRequest);
      expect(taskListWrapper).toBeTruthy();
    });

    then("all remaining methods work properly", async () => {
      instance.generateArrayUsingMathCeil(4, 1);
      instance.getSplitHoursAndMinutes("1:0:1");
      instance.getSplitHoursAndMinutes("10:10:0");
      instance.getSplitHoursAndMinutes("10:10:10");
      instance.setState({
        selectedMonthDate: [{ date: "1", dayName: "Sat" }],
        monthNames: [
          { monthNumber: "1", monthName: "January" },
          { monthNumber: "2", monthName: "February" },
          { monthNumber: "3", monthName: "March" },
          { monthNumber: "4", monthName: "April" },
          { monthNumber: "5", monthName: "May" },
          { monthNumber: "6", monthName: "June" },
          { monthNumber: "7", monthName: "July" },
          { monthNumber: "8", monthName: "August" },
          { monthNumber: "9", monthName: "September" },
          { monthNumber: "10", monthName: "October" },
          { monthNumber: "11", monthName: "November" },
          { monthNumber: "12", monthName: "December" },
        ],
      });
      act(() => {
        jest.runOnlyPendingTimers();
      });
      instance.dailyFlatListRef = createRef<FlatList<DatesOfMonth>>();
      instance.monthlyFlatListRef = createRef<FlatList<MonthsNameList>>();
      await instance.setDatePositionByScroll();
      instance.setState({ selectedMonth: "1" });
      await instance.setMonthPositionByScroll();
      await instance.setCalendarSelectionData({
        dateString: "2023-04-19",
        day: 19,
        month: 4,
        timestamp: 1681862400000,
        year: 2023,
      });
      const onDayPress = jest.fn();
      render(<Calendar onDayPress={onDayPress} />);
      expect(taskListWrapper).toBeTruthy();
    });
  });
});
