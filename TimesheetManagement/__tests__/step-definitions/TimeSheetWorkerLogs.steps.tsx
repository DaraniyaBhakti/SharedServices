import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "framework/src/Helpers";
import React from "react";
import TimeSheetWorkerLogs from "../../src/TimeSheetWorkerLogs";
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";
import { getStorageData } from "framework/src/Utilities";
import { WorkerData } from "../../src/TimeSheetWorkerLogsController";
import _ from "lodash";
import { imgDefault } from "../../src/assets";
global.FormData = require("react-native/Libraries/Network/FormData");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    pop: jest.fn(),
    state: {
      params: {
        taskData: {
          id: "90",
          type: "aggregate",
          attributes: {
            id: "90",
            email: "sudarshan.khairnar@qubited.com",
            first_name: "sss",
            last_name: "kkk",
            logs: {
              data: [],
            },
            total_logged_hours: "62956:15",
          },
        },
      },
    },
  },
  id: "TimeSheetWorkerLogs",
};

const feature = loadFeature(
  "./__tests__/features/TimeSheetWorkerLogs-scenario.feature",
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to TimeSheetWorkerLogs", ({ given, when, then }) => {
    let taskListWrapper: ShallowWrapper;
    let instance: TimeSheetWorkerLogs;

    given("I am a User loading TimeSheetWorkerLogs", () => {
      taskListWrapper = shallow(<TimeSheetWorkerLogs {...screenProps} />);
    });

    when("I navigate to the TimeSheetWorkerLogs", () => {
      instance = taskListWrapper.instance() as TimeSheetWorkerLogs;
    });

    then("TimeSheetWorkerLogs will load with out errors", async () => {
      let token = await getStorageData("TOKEN");
      let detail = screenProps.navigation.state.params.taskData;
      const workerData: WorkerData = {
        img: imgDefault,
        role: "Accountant",
        name:
          _.get(detail, "attributes.first_name", "") +
          " " +
          _.get(detail, "attributes.last_name", ""),
        totalHours: instance.getSplitHoursAndMinutes(
          _.get(detail, "attributes.total_logged_hours", "0"),
        ),
        workedHours: instance.getSplitHoursAndMinutes(
          _.get(detail, "attributes.total_logged_hours", "0"),
        ),
      };
      instance.setState(
        {
          isInternetConnected: false,
          token: JSON.stringify(token),
          workerData: workerData,
          logList: [
            {
              id: "90",
              type: "aggregate",
              attributes: {
                id: "90",
                email: "sudarshan.khairnar@qubited.com",
                first_name: "sss",
                last_name: "kkk",
                logs: {
                  data: [],
                },
                total_logged_hours: "62956:15",
              },
            },
          ],
        },
        () => instance.getTaskList(),
      );
      instance.setState({ isInternetConnected: true }, () =>
        instance.getTaskList(),
      );
      instance.setState({ isInternetConnected: false });
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
          requests: {
            data: [
              {
                id: "90",
                type: "aggregate",
                attributes: {
                  id: "90",
                  email: "sudarshan.khairnar@qubited.com",
                  first_name: "sss",
                  last_name: "kkk",
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
                          updated_by: "",
                          start_time: "2023-03-20T09:00:00.000Z",
                          end_time: "2023-03-20T18:00:00.000Z",
                          hours: "2023-03-20 09:00:00",
                          account_id: "90",
                          timesheet_task_id: "129",
                        },
                      },
                    ],
                  },
                  total_logged_hours: "62956:15",
                },
              },
              {
                id: "90",
                type: "aggregate",
                attributes: {
                  id: "90",
                  email: "sudarshan.khairnar@qubited.com",
                  first_name: "sss",
                  last_name: "kkk",
                  logs: {
                    data: [
                      {
                        id: "4",
                        type: "aggregate_log",
                        attributes: {
                          id: "4",
                          title: "Task4",
                          description: "Test Cases",
                          created_by: "90",
                          updated_by: "",
                          start_time: "2023-03-20T09:00:00.000Z",
                          end_time: "2023-03-20T18:00:00.000Z",
                          hours: "2023-03-20 09:00:00",
                          account_id: "90",
                          timesheet_task_id: "129",
                        },
                      },
                    ],
                  },
                  total_logged_hours: "1:0",
                },
              },
            ],
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

    then("Details with List api response set to list", async () => {
      instance.setState({
        logList: [
          {
            id: "90",
            type: "aggregate",
            attributes: {
              id: "90",
              email: "sudarshan.khairnar@qubited.com",
              first_name: "sss",
              last_name: "kkk",
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
                      updated_by: "",
                      start_time: "2023-03-20T09:00:00.000Z",
                      end_time: "2023-03-20T18:00:00.000Z",
                      hours: "2023-03-20 09:00:00",
                      account_id: "90",
                      timesheet_task_id: "129",
                    },
                  },
                ],
              },
              total_logged_hours: "62956:15",
            },
          },
        ],
      });

      const keyFlatList = taskListWrapper
        .findWhere((node) => node.prop("testID") === "testTaskList")
        .props()
        .keyExtractor({ id: "90" });
      expect(keyFlatList).toEqual("90");

      let flatList = taskListWrapper.findWhere(
        (node) => node.prop("testID") === "testTaskList",
      );
      let rowItem = flatList
        .renderProp("renderItem")({ item: instance.state.logList[0] })
        .findWhere((node) => node.prop("testID") === "openTaskDetails");
      rowItem.simulate("press");

      instance.generateArrayUsingMathCeil(4, 1);
      instance.getSplitHoursAndMinutes("1:0:1");
      instance.getSplitHoursAndMinutes("10:10:0");
      instance.getSplitHoursAndMinutes("10:10:10");
      expect(flatList).toBeTruthy();
    });
  });
});
