import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import CvresumeCandidateManagement2 from "../../src/CvresumeCandidateManagement2.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "CvresumeCandidateManagement2",
};

const feature = loadFeature(
  "./__tests__/features/CvresumeCandidateManagement2-scenario.web.feature",
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to CvresumeCandidateManagement2", ({
    given,
    when,
    then,
  }) => {
    let CvresumeManagement: ShallowWrapper;
    let instance: CvresumeCandidateManagement2;

    given("I am a User loading CvresumeCandidateManagement2", () => {
      CvresumeManagement = shallow(
        <CvresumeCandidateManagement2 {...screenProps} />,
      );
    });

    when("I navigate to the CvresumeCandidateManagement2", () => {
      instance = CvresumeManagement.instance() as CvresumeCandidateManagement2;
    });

    then("CvresumeCandidateManagement2 will load with out errors", () => {
      expect(CvresumeManagement).toBeTruthy();
    });

    then("I can enter text with out errors", () => {
      const mockEmail = "hello@aol.com";
      let textInputComponent = CvresumeManagement.findWhere(
        (node) => node.prop("data-test-id") === "txtInput",
      );

      textInputComponent.simulate("change", {
        preventDefault() {},
        target: { value: mockEmail },
      });
      expect(instance.state.txtInputValue).toBe(mockEmail);
    });

    then("I can select the button with with out errors", () => {
      let buttonComponent = CvresumeManagement.findWhere(
        (node) => node.prop("data-test-id") === "btnAddExample",
      );
      buttonComponent.simulate("click");
      expect(CvresumeManagement).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.setEnableField();
      instance.btnExampleProps.onPress();
      instance.txtInputWebProps.onChangeText("test");
      instance.btnShowHideProps.onPress();
      instance.componentWillUnmount();
      expect(CvresumeManagement).toBeTruthy();
    });
  });
});
