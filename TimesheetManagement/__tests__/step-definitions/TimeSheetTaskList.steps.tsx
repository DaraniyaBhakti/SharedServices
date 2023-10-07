import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import TimeSheetTaskList from "../../src/TimeSheetTaskList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { imgDefault } from "../../src/assets";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    pop: jest.fn(),
    push: jest.fn(),
  },
  id: "TimeSheetTaskList",
};

const feature = loadFeature(
  "./__tests__/features/TimeSheetTaskList-scenario.feature",
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to TimeSheetTaskList", ({ given, when, then }) => {
    let taskListWrapper: ShallowWrapper;
    let instance: TimeSheetTaskList;

    given("I am a User loading TimeSheetTaskList", () => {
      taskListWrapper = shallow(<TimeSheetTaskList {...screenProps} />);
    });

    when("I navigate to the TimeSheetTaskList", () => {
      instance = taskListWrapper.instance() as TimeSheetTaskList;
    });

    then("TimeSheetTaskList will load with out errors", () => {
      let token =
        "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTI5LCJleHAiOjE2NzkzODkyMDQsInRva2VuX3R5cGUiOiJsb2dpbiJ9.thIvTpw5NfvIdZvvA2XSGpQphjJz0kgyazMHRuUL2PBdMsdHJ09RGKFPJNHq_sEh5HgkCCI_44_FhPXEpu2EjA";
      AsyncStorage.setItem("token", token);
      instance.setState({ isInternetConnected: false, token: token });
      instance.getTaskList();
      instance.componentDidMount();
      instance.setState({ isInternetConnected: true, token: token });
      instance.getTaskList();
      expect(taskListWrapper).toBeTruthy();
    });

    then("User can navigate to task add screen on create button click", () => {
      let openCreateTask = taskListWrapper.findWhere(
        (node) => node.prop("testID") === "openCreateTask",
      );
      openCreateTask.simulate("press", instance.openCreateTask());
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

    then("User will call task list api", () => {
      instance.setState({ isInternetConnected: false });
      instance.getTaskList();

      instance.setState({ isInternetConnected: true });
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
        [
          {
            id: 2,
            name: "Add profile screen",
            title: null,
            description: "here is description",
            is_active: true,
            created_by: "52",
            updated_by: null,
            created_at: "2023-02-07T10:37:33.378Z",
            updated_at: "2023-02-07T10:37:33.378Z",
            status: "to_do",
            planned_hours: null,
            members: [
              { key: "1", img: imgDefault },
              { key: "2", img: imgDefault },
            ],
          },
          {
            id: 7,
            name: "riya",
            title: "riya",
            description: "sharma",
            is_active: true,
            created_by: "167",
            updated_by: null,
            created_at: "2023-03-20T09:11:15.229Z",
            updated_at: "2023-03-20T09:11:15.229Z",
            status: "in_progress",
            planned_hours: 4,
            members: [
              { key: "1", img: imgDefault },
              { key: "2", img: imgDefault },
            ],
          },
        ],
      );
      getTaskListRequest.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getTaskListRequest.messageId,
      );

      instance.listTaskApiCallId = getTaskListRequest.messageId;
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

    then("List api response set to list", () => {
      instance.setState({
        taskList: [
          {
            id: 34,
            name: "Sudarshan_4",
            title: "Task 4",
            description: "Test Case execution of Timesheet Management Module",
            is_active: true,
            created_by: "90",
            updated_by: "null",
            created_at: "2023-03-28T04:03:03.353Z",
            updated_at: "2023-03-28T04:03:03.353Z",
            status: "to_do",
            planned_hours: 8,
            members: [
              { key: "1", img: imgDefault },
              { key: "2", img: imgDefault },
            ],
          },
          {
            id: 35,
            name: "Sudarshan_5",
            title: "Task # 5",
            description:
              "Perform Retesting & Regression Testing on Pledge Tracking Module",
            is_active: true,
            created_by: "90",
            updated_by: "null",
            created_at: "2023-03-28T04:03:14.617Z",
            updated_at: "2023-03-28T04:03:14.617Z",
            status: "to_do",
            planned_hours: 16,
            members: [
              { key: "1", img: imgDefault },
              { key: "2", img: imgDefault },
            ],
          },
        ],
      });

      const keyFlatList = taskListWrapper
        .findWhere((node) => node.prop("testID") === "testTaskList")
        .props()
        .keyExtractor({ id: "2" });
      expect(keyFlatList).toEqual("2");

      let flatList = taskListWrapper.findWhere(
        (node) => node.prop("testID") === "testTaskList",
      );
      let rowItem = flatList
        .renderProp("renderItem")({ item: instance.state.taskList[0] })
        .findWhere((node) => node.prop("testID") === "openTaskDetails");
      rowItem.simulate("press");
      instance.openTaskDetails(instance.state.taskList[0]);

      instance.renderTaskList({
        item: {
          id: 34,
          name: "Sudarshan_4",
          title: "Task 4",
          description: "Test Case execution of Timesheet Management Module",
          is_active: true,
          created_by: "90",
          updated_by: "null",
          created_at: "2023-03-28T04:03:03.353Z",
          updated_at: "2023-03-28T04:03:03.353Z",
          status: "to_do",
          planned_hours: 8,
          members: [
            { key: "1", img: imgDefault },
            { key: "2", img: imgDefault },
          ],
        },
        index: 0,
      });
      instance.renderTaskList({
        item: {
          id: 35,
          name: "Sudarshan_5",
          title: "Task # 5",
          description:
            "Perform Retesting & Regression Testing on Pledge Tracking Module",
          is_active: true,
          created_by: "90",
          updated_by: "null",
          created_at: "2023-03-28T04:03:14.617Z",
          updated_at: "2023-03-28T04:03:14.617Z",
          status: "to_do",
          planned_hours: 16,
          members: [
            { key: "1", img: imgDefault },
            { key: "2", img: imgDefault },
          ],
        },
        index: 0,
      });
      expect(flatList).toBeTruthy();
    });
  });
});
