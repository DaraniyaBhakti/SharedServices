import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import CvresumeCandidateTemplateList from "../../src/CvresumeCandidateTemplateList";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { mockResponseUpdate } from "../../src/mock";
import { runEngine } from "../../../../framework/src/RunEngine";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "CvresumeCandidateTemplateList",
};

const feature = loadFeature(
  "./__tests__/features/CvresumeCandidateTemplateList-scenario.feature",
);

defineFeature(feature, (test) => {
  test("User navigates to CvresumeCandidateTemplateList", ({
    given,
    when,
    then,
  }) => {
    let candidtateTemplate: ShallowWrapper;
    let instance: CvresumeCandidateTemplateList;

    given("I am a User loading CvresumeCandidateTemplateList", () => {
      candidtateTemplate = shallow(
        <CvresumeCandidateTemplateList {...screenProps} />,
      );
    });

    when("I navigate to the CvresumeCandidateTemplateList", () => {
      instance = candidtateTemplate.instance() as CvresumeCandidateTemplateList;
    });

    then("CvresumeCandidateTemplateList will load with out errors", () => {
      instance.componentDidMount();
      const hideKeyboard = candidtateTemplate.findWhere(
        (node) => node.prop("testID") === "hide-keyboard",
      );
      hideKeyboard.simulate("press");
      expect(candidtateTemplate).toBeTruthy();
    });
    then("component did mount get reponse success", () => {
      instance.componentDidMount();
      const apiMsgupdate = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      apiMsgupdate.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsgupdate.messageId,
      );
      apiMsgupdate.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseUpdate.getResumes,
      );
      instance.getResumesCallId = apiMsgupdate.messageId;
      runEngine.sendMessage("Unit Test", apiMsgupdate);
      expect(instance.state.templateResumes[0].id).toBe(1);
    });
    then("flat list render success", () => {
      const flatListTemplate = candidtateTemplate.findWhere(
        (node) => node.prop("testID") === "flat-list-template",
      );
      const shallowRender = shallow(
        flatListTemplate.props().renderItem({
          item: mockResponseUpdate.getResumes.data[0],
          index: 0,
        }),
      );
      flatListTemplate
        .props()
        .keyExtractor(mockResponseUpdate.getResumes.data[0]);

      const btnOpenLink = shallowRender.findWhere(
        (node) => node.prop("testID") === "btn-to-open-link",
      );
      expect(btnOpenLink.length).toBe(1);
      btnOpenLink.simulate("press");
    });
    then("I can leave the screen with out errors", () => {
      const apiMsgupdate = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      apiMsgupdate.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsgupdate.messageId,
      );
      apiMsgupdate.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseUpdate.error,
      );
      instance.getResumesCallId = apiMsgupdate.messageId;
      runEngine.sendMessage("Unit Test", apiMsgupdate);
      instance.componentWillUnmount();
      expect(candidtateTemplate).toBeTruthy();
    });
  });
});
