import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import TimesheetManagement from "../../src/TimesheetManagement.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "TimesheetManagement",
};

const feature = loadFeature(
  "./__tests__/features/TimesheetManagement-scenario.web.feature",
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
      instance.componentDidMount();
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can enter text with out errors", () => {
      instance.setState({ enableField: true });
      instance.render();
      instance.setState({ enableField: false });
      instance.render();
      instance.setInputValue("text");
      instance.setEnableField();
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "txtInput",
      );
      const event = {
        preventDefault() {},
        target: { value: "hello@aol.com" },
      };
      textInputComponent.simulate("change", event);
      textInputComponent.simulate("changeText", "Title1");

      expect(textInputComponent).toBeTruthy();
    });

    then("I can select the button with with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "btnAddExample",
      );
      buttonComponent.simulate("press");
      instance.doButtonPressed();

      let btnAdd = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "btnAdd",
      );
      btnAdd.simulate("press");
      instance.doButtonPressed();
      jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
      btnAdd.simulate("press");
      instance.doButtonPressed();
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
