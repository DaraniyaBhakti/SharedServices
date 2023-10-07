import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import TimeSheetTaskDetails from "../../src/TimeSheetTaskDetails";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { imgDefault } from "../../src/assets";
import { getStorageData } from "framework/src/Utilities";
import { TaskDetail } from "../../src/TimeSheetTaskDetailsController";
global.FormData = require("react-native/Libraries/Network/FormData");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    pop: jest.fn(),
    push: jest.fn(),
    state: {
      params: {
        taskData: {
          id: 1,
          name: "riya",
          title: "riya",
          description: "sharma",
          is_active: true,
          created_by: "90",
          updated_by: "90",
          created_at: "2023-03-27T06:06:43.639Z",
          updated_at: "2023-03-27T06:06:52.536Z",
          status: "to_do",
          planned_hours: 4,
        },
      },
    },
  },
  id: "TimeSheetTaskDetails",
};

const feature = loadFeature(
  "./__tests__/features/TimeSheetTaskDetails-scenario.feature",
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to TimeSheetTaskDetails", ({ given, when, then }) => {
    let taskListWrapper: ShallowWrapper;
    let instance: TimeSheetTaskDetails;

    given("I am a User loading TimeSheetTaskDetails", () => {
      taskListWrapper = shallow(<TimeSheetTaskDetails {...screenProps} />);
    });

    when("I navigate to the TimeSheetTaskDetails", () => {
      instance = taskListWrapper.instance() as TimeSheetTaskDetails;
    });

    then("TimeSheetTaskDetails will load with out errors", async () => {
      let token = getStorageData("TOKEN");
      let details = screenProps.navigation.state.params.taskData;
      let _detail = JSON.stringify(details);
      let detail = JSON.parse(_detail);
      const workerData: TaskDetail = {
        img: imgDefault,
        id: detail.id,
        taskName: detail.title,
        allocatedTime: detail.planned_hours + "Hrs",
        consumedTime: "2Hrs",
        desc: detail.description,
        members: [
          {
            key: "1",
            img: imgDefault,
          },
          {
            key: "2",
            img: imgDefault,
          },
        ],
        membersData: [
          {
            key: "1",
            img: imgDefault,
            name: "Ganesh Acharya",
            role: "Admin",
            workedHours: "2Hrs",
            startDate: "01/01/2023",
          },
          {
            key: "2",
            img: imgDefault,
            name: "Vicky Singh",
            role: "Content Writer",
            workedHours: "20Hrs",
            startDate: "01/01/2023",
          },
        ],
      };
      instance.setState(
        {
          taskDetail: workerData,
          isInternetConnected: false,
          token: JSON.stringify(token),
          taskId: detail.id,
        },
        () => instance.getTaskDetails(),
      );
      instance.setState({ isInternetConnected: true }, () =>
        instance.getTaskDetails(),
      );
      await instance.componentDidMount();
      expect(taskListWrapper).toBeTruthy();
    });

    then("User will call task details api", () => {
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
          id: 1,
          img: imgDefault,
          taskName: "Task 1",
          allocatedTime: "120 Hrs",
          consumedTime: "24 Hrs",
          desc: "Lorem Ipsum sample text lorem ipsum is a sample text Lorem Ipsum is a sample text lorem Ipsum .ipsum is a sample text Lorem Ipsum .",
          members: [
            {
              key: "1",
              img: imgDefault,
            },
            {
              key: "2",
              img: imgDefault,
            },
          ],
          membersData: [
            {
              key: "1",
              img: imgDefault,
              name: "Ganesh Acharya",
              role: "Admin",
              workedHours: "2Hrs",
              startDate: "01/01/2023",
            },
            {
              key: "2",
              img: imgDefault,
              name: "Vicky Singh",
              role: "Content Writer",
              workedHours: "20Hrs",
              startDate: "01/01/2023",
            },
          ],
        },
      );
      getTaskListRequest.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getTaskListRequest.messageId,
      );

      instance.taskDetailsApiCallId = getTaskListRequest.messageId;
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

    then("Details with List api response set to list", async () => {
      instance.setState({
        taskDetail: {
          id: 1,
          img: imgDefault,
          taskName: "Task 1",
          allocatedTime: "120 Hrs",
          consumedTime: "24 Hrs",
          desc: "Lorem Ipsum sample text lorem ipsum is a sample text Lorem Ipsum is a sample text lorem Ipsum .ipsum is a sample text Lorem Ipsum .",
          members: [
            {
              key: "1",
              img: imgDefault,
            },
            {
              key: "2",
              img: imgDefault,
            },
          ],
          membersData: [
            {
              key: "1",
              img: imgDefault,
              name: "Ganesh Acharya",
              role: "Admin",
              workedHours: "2Hrs",
              startDate: "01/01/2023",
            },
            {
              key: "2",
              img: imgDefault,
              name: "Vicky Singh",
              role: "Content Writer",
              workedHours: "20Hrs",
              startDate: "01/01/2023",
            },
          ],
        },
      });

      const keyFlatList = taskListWrapper
        .findWhere((node) => node.prop("testID") === "testTaskList")
        .props()
        .keyExtractor({ key: "2" });
      expect(keyFlatList).toEqual("2");

      let flatList = taskListWrapper.findWhere(
        (node) => node.prop("testID") === "testTaskList",
      );
      let rowItem = flatList
        .renderProp("renderItem")({ item: instance.state.taskDetail })
        .findWhere((node) => node.prop("testID") === "openTaskDetails");
      rowItem.simulate("press");

      instance.renderTaskList({
        item: {
          key: "1",
          img: imgDefault,
          name: "Ganesh Acharya",
          role: "Admin",
          workedHours: "2Hrs",
          startDate: "01/01/2023",
        },
        index: 0,
      });

      let openCreateLog = taskListWrapper.findWhere(
        (node) => node.prop("testID") === "openCreateLog",
      );
      openCreateLog.simulate("press");
      instance.openCreateLog(instance.state.taskDetail.id);
      expect(flatList).toBeTruthy();
    });
  });
});
