import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import TimeSheetCreateTask from "../../src/TimeSheetCreateTask";
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
  },
  id: "TimeSheetCreateTask",
};

const feature = loadFeature(
  "./__tests__/features/TimeSheetCreateTask-scenario.feature",
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to TimeSheetCreateTask", ({ given, when, then }) => {
    let createTaskWrapper: ShallowWrapper;
    let instance: TimeSheetCreateTask;

    given("I am a User loading TimeSheetCreateTask", () => {
      createTaskWrapper = shallow(<TimeSheetCreateTask {...screenProps} />);
    });

    when("I navigate to the TimeSheetCreateTask", () => {
      instance = createTaskWrapper.instance() as TimeSheetCreateTask;
    });

    then("TimeSheetCreateTask will load with out errors", () => {
      let token =
        "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTI5LCJleHAiOjE2NzkzODkyMDQsInRva2VuX3R5cGUiOiJsb2dpbiJ9.thIvTpw5NfvIdZvvA2XSGpQphjJz0kgyazMHRuUL2PBdMsdHJ09RGKFPJNHq_sEh5HgkCCI_44_FhPXEpu2EjA";
      AsyncStorage.setItem("token", token);
      instance.setState({
        token: token,
        isInternetConnected: true,
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
        allocatedTime: "",
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
        allocatedTime: "",
      });
      instance.checkValidation();

      let txtAllocatedTimeInput = createTaskWrapper.findWhere(
        (node) => node.prop("testID") === "txtAllocatedTimeInput",
      );
      txtAllocatedTimeInput.simulate("changeText", "1");
      instance.setState({
        isInternetConnected: true,
        title: "Title1",
        description: "Desc1",
        allocatedTime: "1",
      });

      let txtCreateTask = createTaskWrapper.findWhere(
        (node) => node.prop("testID") === "txtCreateTask",
      );
      txtCreateTask.simulate("press");
      instance.checkValidation();
      expect(createTaskWrapper).toBeTruthy();
    });

    then("User will call create task api", () => {
      instance.setState({ isInternetConnected: false });
      instance.createTasks();

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
          task_details: {
            id: 20,
            name: "chirag",
            title: "task2",
            description: "desc 2",
            is_active: true,
            created_by: "167",
            updated_by: null,
            created_at: "2023-03-20T12:54:53.313Z",
            updated_at: "2023-03-20T12:54:53.313Z",
            status: "to_do",
            planned_hours: 4,
          },
        },
      );
      getTaskCreateRequest.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getTaskCreateRequest.messageId,
      );

      instance.createTaskApiCallId = getTaskCreateRequest.messageId;
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
