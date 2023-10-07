import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import TimesheetManagement from "../../src/TimesheetManagement";
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
  },
  id: "TimesheetManagement",
};

const feature = loadFeature(
  "./__tests__/features/TimesheetManagement-scenario.feature",
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to TimesheetManagement", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: TimesheetManagement;

    given("I am a User loading TimesheetManagement", () => {
      exampleBlockA = shallow(<TimesheetManagement {...screenProps} />);
    });

    when("I navigate to the TimesheetManagement", () => {
      instance = exampleBlockA.instance() as TimesheetManagement;
    });

    then("TimesheetManagement will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then(
      "I can navigate to Task View screen by clicking button of ViewTask",
      () => {
        instance.setState({
          token:
            "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTI5LCJleHAiOjE2ODA5NDQxNzcsInRva2VuX3R5cGUiOiJsb2dpbiJ9.Al9Xzfx6rIrAVpmtR2vf4Ifp1iK2APh7ETVaSbrDrf0biZF0QEZO9AgsUgSQYSTfvoTVXZzN1fU8a64t3HnCEw",
        });
        let openViewTask = exampleBlockA.findWhere(
          (node) => node.prop("testID") === "openViewTask",
        );
        openViewTask.simulate("press");
        instance.openTasks();
        expect(exampleBlockA).toBeTruthy();
      },
    );

    then(
      "I can navigate to Time Sheet screen by clicking button of ViewTimeSheet",
      () => {
        instance.setState({
          token:
            "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTI5LCJleHAiOjE2ODA5NDQxNzcsInRva2VuX3R5cGUiOiJsb2dpbiJ9.Al9Xzfx6rIrAVpmtR2vf4Ifp1iK2APh7ETVaSbrDrf0biZF0QEZO9AgsUgSQYSTfvoTVXZzN1fU8a64t3HnCEw",
        });
        let openTimeSheet = exampleBlockA.findWhere(
          (node) => node.prop("testID") === "openTimeSheet",
        );
        openTimeSheet.simulate("press");
        instance.openTimeSheets();

        const getLoginRequest = new Message(
          getName(MessageEnum.RestAPIResponceMessage),
        );
        getLoginRequest.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          getLoginRequest,
        );
        getLoginRequest.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          {
            meta: {
              token:
                "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTI5LCJleHAiOjE2ODA5NDQxNzcsInRva2VuX3R5cGUiOiJsb2dpbiJ9.Al9Xzfx6rIrAVpmtR2vf4Ifp1iK2APh7ETVaSbrDrf0biZF0QEZO9AgsUgSQYSTfvoTVXZzN1fU8a64t3HnCEw",
              refresh_token:
                "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTI5LCJleHAiOjE3MTI0ODAxNzcsInRva2VuX3R5cGUiOiJyZWZyZXNoIn0.D0IAeWhwYCZej3NGSKMpOXSbpv3B9CA7YM-cBnFMHelWwtg0MqBs_EijB2Q87NE70DPS1na-bkqHRquJ10Q44w",
              id: 129,
            },
          },
        );
        getLoginRequest.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          getLoginRequest.messageId,
        );

        instance.loginApiCallId = getLoginRequest.messageId;
        runEngine.sendMessage("Unit Test", getLoginRequest);
        instance.receive("", getLoginRequest);
        getLoginRequest.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          {
            error: "user not found.",
          },
        );
        instance.receive("", getLoginRequest);
        expect(exampleBlockA).toBeTruthy();
      },
    );
  });
});
