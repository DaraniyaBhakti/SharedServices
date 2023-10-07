import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import CvresumeCandidateList from "../../src/CvresumeCandidateList";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../../framework/src/Message";
import { runEngine } from "../../../../framework/src/RunEngine";
import { mockProps, mockProps1, mockResponseUpdate } from "../../src/mock";
import Button from "../../src/Button";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "CvresumeCandidateList",
};

const feature = loadFeature(
  "./__tests__/features/CvresumeCandidateList-scenario.feature",
);

defineFeature(feature, (test) => {
  test("User navigates to CvresumeCandidateList", ({ given, when, then }) => {
    let candidateList: ShallowWrapper;
    let instance: CvresumeCandidateList;
    given("I am a User loading CvresumeCandidateList", () => {
      candidateList = shallow(<CvresumeCandidateList {...screenProps} />);
    });

    when("I navigate to the CvresumeCandidateList", () => {
      instance = candidateList.instance() as CvresumeCandidateList;
    });

    then("CvresumeCandidateList will load with out errors", () => {
      instance.componentDidMount();
      expect(candidateList).toBeTruthy();
    });
    then(
      "render component did mount and get the token and get templates",
      () => {
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
          mockResponseUpdate.error,
        );

        instance.getResumesCallId = apiMsgupdate.messageId;
        runEngine.sendMessage("Unit Test", apiMsgupdate);
        expect(instance.state.publicResumes[0]).toBe(undefined);
      },
    );
    then("getting reumes with success", () => {
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
      expect(instance.state.publicResumes).toBe(
        mockResponseUpdate.getResumes.data,
      );
    });
    then("hide keyboard test", () => {
      const hideKeyboard = candidateList.findWhere(
        (node) => node.prop("testID") === "hide-keyboard",
      );
      expect(hideKeyboard.length).toBe(1);

      hideKeyboard.simulate("press");
      const getPublicResume = candidateList.findWhere(
        (node) => node.prop("testID") === "flat-list-public-resume",
      );

      getPublicResume
        .props()
        .keyExtractor(mockResponseUpdate.getResumes.data[0]);
      const renderItemShallow2 = shallow(
        getPublicResume.props().renderItem({
          item: undefined,
          index: 1,
        }),
      );
      const eyeIcon2 = renderItemShallow2.findWhere(
        (node) => node.prop("testID") === "eye-icon",
      );
      eyeIcon2.simulate("press");
      const renderItemShallow1 = shallow(
        getPublicResume.props().renderItem({
          item: {
            ...mockResponseUpdate.getResumes.data[0],
            attributes: undefined,
          },
          index: 1,
        }),
      );
      const eyeIcon1 = renderItemShallow1.findWhere(
        (node) => node.prop("testID") === "eye-icon",
      );
      eyeIcon1.simulate("press");
      const renderItemShallow = shallow(
        getPublicResume.props().renderItem({
          item: mockResponseUpdate.getResumes.data[0],
          index: 0,
        }),
      );

      const eyeIcon = renderItemShallow.findWhere(
        (node) => node.prop("testID") === "eye-icon",
      );
      eyeIcon.simulate("press");

      const goToHome1 = renderItemShallow.findWhere(
        (node) => node.prop("testID") === "go-to-home",
      );
      goToHome1.simulate("press");
      const goToHome = renderItemShallow1.findWhere(
        (node) => node.prop("testID") === "go-to-home",
      );
      goToHome.simulate("press");

      const apiMsgupdate = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );

      apiMsgupdate.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsgupdate.messageId,
      );

      apiMsgupdate.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseUpdate.getCandidatesSuccess1,
      );

      instance.getProfileCallId = apiMsgupdate.messageId;
      runEngine.sendMessage("Unit Test", apiMsgupdate);
      const apiMsgResponseSuccess = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );

      apiMsgResponseSuccess.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsgResponseSuccess.messageId,
      );

      apiMsgResponseSuccess.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseUpdate.getCandidatesSuccess2,
      );

      instance.getProfileCallId = apiMsgResponseSuccess.messageId;
      runEngine.sendMessage("Unit Test", apiMsgResponseSuccess);
      const apiMsgResponseSuccess2 = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );

      apiMsgResponseSuccess2.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsgResponseSuccess2.messageId,
      );

      apiMsgResponseSuccess2.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseUpdate.getCandidatesSuccess,
      );

      instance.getProfileCallId = apiMsgResponseSuccess2.messageId;
      runEngine.sendMessage("Unit Test", apiMsgResponseSuccess2);
    });
    then("render button", () => {
      const renderShallowButton = shallow(<Button {...mockProps} />);
      const renderShallowButton1 = shallow(<Button {...mockProps1} />);
      expect(renderShallowButton).toBeTruthy();
      expect(renderShallowButton1).toBeTruthy();
    });
    then("clicked on button view candidate", () => {
      expect(instance.state.profileData).toBe(
        mockResponseUpdate.getCandidatesSuccess.data.attributes,
      );
      const eyeBtn1 = candidateList.findWhere(
        (node) => node.prop("testID") === "eye-btn-2",
      );
      eyeBtn1.simulate("press");
      const eyeBtn2 = candidateList.findWhere(
        (node) => node.prop("testID") === "eye-btn-1",
      );
      eyeBtn2.simulate("press");
    });
    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(candidateList).toBeTruthy();
    });
  });
});
