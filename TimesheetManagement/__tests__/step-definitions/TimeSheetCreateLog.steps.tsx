import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import TimeSheetCreateLog from "../../src/TimeSheetCreateLog";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    pop: jest.fn(),
    state: {
      params: {
        taskId: 1,
      },
    },
  },
  id: "TimeSheetCreateLog",
};

const feature = loadFeature(
  "./__tests__/features/TimeSheetCreateLog-scenario.feature",
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to TimeSheetCreateLog", ({ given, when, then }) => {
    let createTaskWrapper: ShallowWrapper;
    let instance: TimeSheetCreateLog;

    given("I am a User loading TimeSheetCreateLog", () => {
      createTaskWrapper = shallow(<TimeSheetCreateLog {...screenProps} />);
    });

    when("I navigate to the TimeSheetCreateLog", () => {
      instance = createTaskWrapper.instance() as TimeSheetCreateLog;
    });

    then("TimeSheetCreateLog will load with out errors", () => {
      let token =
        "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTI5LCJleHAiOjE2NzkzODkyMDQsInRva2VuX3R5cGUiOiJsb2dpbiJ9.thIvTpw5NfvIdZvvA2XSGpQphjJz0kgyazMHRuUL2PBdMsdHJ09RGKFPJNHq_sEh5HgkCCI_44_FhPXEpu2EjA";
      AsyncStorage.setItem("token", token);
      instance.setState({
        token: token,
        isInternetConnected: true,
        taskId: screenProps.navigation.state.params.taskId,
      });
      instance.componentDidMount();
      expect(createTaskWrapper).toBeTruthy();
    });

    then("User will add data into all textInputs and validate them", () => {
      instance.checkValidation();

      let txtTitleInput = createTaskWrapper.findWhere(
        (node) => node.prop("testID") === "txtTitleInput",
      );
      txtTitleInput.simulate("changeText", "Title1");
      instance.setState({
        isInternetConnected: true,
        title: "Title1",
        description: "",
        startDate: "",
        endDate: "",
      });
      instance.checkValidation();

      let txtDescriptionInput = createTaskWrapper.findWhere(
        (node) => node.prop("testID") === "txtDescriptionInput",
      );
      txtDescriptionInput.simulate("changeText", "Desc1");
      instance.setState({
        isInternetConnected: true,
        title: "Title1",
        description: "Desc1",
        startDate: "",
        endDate: "",
      });
      instance.checkValidation();
      instance.setState({
        isInternetConnected: true,
        title: "Title1",
        description: "Desc1",
        startDate: new Date().toString(),
        endDate: "",
      });
      instance.checkValidation();
      instance.setState({
        isInternetConnected: true,
        title: "Title1",
        description: "Desc1",
        endDate: "2023-04-03T05:23:23.000Z",
        startDate: "2023-04-04T05:23:23.000Z",
      });
      instance.checkValidation();
      instance.setState({
        isInternetConnected: true,
        title: "Title1",
        description: "Desc1",
        startDate: "2023-04-03T05:23:23.000Z",
        endDate: "2023-04-04T05:23:23.000Z",
      });
      instance.checkValidation();

      let txtStartTimeView = createTaskWrapper.findWhere(
        (node) => node.prop("testID") === "txtStartTimeView",
      );
      let txtStartTimeTouch = txtStartTimeView.findWhere(
        (node) => node.prop("testID") === "txtStartTimeTouch",
      );
      txtStartTimeTouch.simulate("press");
      instance.pressStartDate();

      let txtEndTimeView = createTaskWrapper.findWhere(
        (node) => node.prop("testID") === "txtEndTimeView",
      );
      let txtEndTimeTouch = txtEndTimeView.findWhere(
        (node) => node.prop("testID") === "txtEndTimeTouch",
      );
      txtEndTimeTouch.simulate("press");
      instance.pressEndDate();

      let txtCreateTask = createTaskWrapper.findWhere(
        (node) => node.prop("testID") === "txtCreateTask",
      );
      txtCreateTask.simulate("press");
      instance.checkValidation();

      instance.setState({
        isStartDatePressed: true,
      });
      instance.handleConfirm(new Date());
      instance.setState({
        isStartDatePressed: false,
        isEndDatePressed: false,
      });
      instance.handleConfirm(new Date());
      instance.setState({
        isStartDatePressed: false,
        isEndDatePressed: true,
      });
      instance.handleConfirm(new Date());
      instance.handleCancel();
      expect(createTaskWrapper).toBeTruthy();
    });

    then("User will call create task api", () => {
      instance.setState({ isInternetConnected: false });
      instance.createLogs();

      const getTaskCreateRequest = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      getTaskCreateRequest.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getTaskCreateRequest,
      );
      getTaskCreateRequest.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          log: {
            id: 44,
            title: "title 3 3",
            description: "desc 3 3",
            created_by: 129,
            updated_by: null,
            start_time: "2023-04-03T06:23:23.000Z",
            end_time: "2023-04-03T07:23:23.000Z",
            hours: "01:00:00",
            account_id: 129,
            timesheet_task_id: 42,
          },
        },
      );
      getTaskCreateRequest.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getTaskCreateRequest.messageId,
      );

      instance.createLogApiCallId = getTaskCreateRequest.messageId;
      runEngine.sendMessage("Unit Test", getTaskCreateRequest);
      instance.receive("", getTaskCreateRequest);
      getTaskCreateRequest.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [],
        },
      );
      instance.receive("", getTaskCreateRequest);
      expect(createTaskWrapper).toBeTruthy();
    });

    then("User can navigate to back screen on cancel click", () => {
      let txtCancelTask = createTaskWrapper.findWhere(
        (node) => node.prop("testID") === "txtCancelTask",
      );
      txtCancelTask.simulate("press");
      instance.cancelTasks();
      expect(createTaskWrapper).toBeTruthy();
    });

    then("keyboard will hide while touch outside of input area", () => {
      let hideKeyboard = createTaskWrapper.findWhere(
        (node) => node.prop("testID") === "hideKeyboard",
      );
      hideKeyboard.simulate("press");
      instance.hideKeyboard();
      expect(createTaskWrapper).toBeTruthy();
    });
  });
});
