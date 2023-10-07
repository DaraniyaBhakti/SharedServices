import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import CvresumeCandidateManagement2 from "../../src/CvresumeCandidateManagement2";
import DocumentPicker from "react-native-document-picker";
import { Platform } from "react-native";
import {
  mockResponseUpdate,
  mockData,
  mockProps,
  mockProps1,
} from "../../src/mock";
import Button from "../../src/Button";
const screenProps = {
  navigation: {
    navigate: jest.fn(),
  },
  id: "CvresumeCandidateManagement2",
};

const feature = loadFeature(
  "./__tests__/features/CvresumeCandidateManagement2-scenario.feature",
);

jest
  .spyOn(DocumentPicker, "pick")
  .mockImplementationOnce((() =>
    Promise.reject("user cancel the file uploading")) as any)
  .mockImplementation((() =>
    Promise.resolve(mockResponseUpdate.fileReponse)) as any);

global.FormData = jest.fn().mockImplementation(() => ({
  append: jest.fn(),
}));

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
    let CvresumeManagementMobile: ShallowWrapper;
    let instance: CvresumeCandidateManagement2;
    let shalloRenderResume: ShallowWrapper;

    given("I am a User loading CvresumeCandidateManagement2", () => {
      CvresumeManagementMobile = shallow(
        <CvresumeCandidateManagement2 {...screenProps} />,
      );
    });

    when("I navigate to the CvresumeCandidateManagement2", () => {
      instance =
        CvresumeManagementMobile.instance() as CvresumeCandidateManagement2;
    });

    then("first handle login user called and get auth token", () => {
      const apiMsgupdate = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );

      apiMsgupdate.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsgupdate.messageId,
      );

      apiMsgupdate.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseUpdate.success,
      );
      instance.loginApiCallId = apiMsgupdate.messageId;
      runEngine.sendMessage("Unit Test", apiMsgupdate);
      expect(instance.state.authToken).toBe("");
    });
    then("first handle login user called and failed", () => {
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

      instance.loginApiCallId = apiMsgupdate.messageId;
      runEngine.sendMessage("Unit Test", apiMsgupdate);
      expect(instance.state.authToken).toBe("");
    });
    then("login and get the candidate details failed", () => {
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

      instance.getCandidateDetailsCallId = apiMsgupdate.messageId;
      runEngine.sendMessage("Unit Test", apiMsgupdate);
      expect(instance.state.profileData).toBe(undefined);
    });
    then("login and get the candidate details success", () => {
      expect(instance.state.authToken).toBe(
        mockResponseUpdate.success.meta.token,
      );
      const apiMsgupdate = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );

      apiMsgupdate.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsgupdate.messageId,
      );

      apiMsgupdate.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseUpdate.getCandidatesSuccess,
      );

      instance.getCandidateDetailsCallId = apiMsgupdate.messageId;
      runEngine.sendMessage("Unit Test", apiMsgupdate);

      expect(instance.state.profileData).toBe(
        mockResponseUpdate.getCandidatesSuccess.data.attributes,
      );
    });

    then("CvresumeCandidateManagement2 will load with out errors", () => {
      instance.componentDidMount();
      expect(CvresumeManagementMobile).toBeTruthy();
    });
    then(
      "token is directly availble in session storage and get the null data",
      () => {
        const apiMsgupdate = new Message(
          getName(MessageEnum.RestAPIResponceMessage),
        );

        apiMsgupdate.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          apiMsgupdate.messageId,
        );

        apiMsgupdate.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          mockResponseUpdate.getCandidatesSuccess2,
        );

        instance.getCandidateDetailsCallId = apiMsgupdate.messageId;
        runEngine.sendMessage("Unit Test", apiMsgupdate);
        expect(instance.state.profileData).toBe(
          mockResponseUpdate.getCandidatesSuccess.data.attributes,
        );
      },
    );
    then(
      "token is directly availble in session storage and get the data",
      () => {
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

        instance.getCandidateDetailsCallId = apiMsgupdate.messageId;
        runEngine.sendMessage("Unit Test", apiMsgupdate);
        expect(instance.state.profileData).toBe(
          mockResponseUpdate.getCandidatesSuccess.data.attributes,
        );
      },
    );
    then("get the resumes after get candidates details", () => {
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

      instance.getResumesDataCallId = apiMsgupdate.messageId;
      runEngine.sendMessage("Unit Test", apiMsgupdate);
      expect(instance.state.summaryDetails).toBe(
        mockResponseUpdate.getResumes.data,
      );
    });
    then("get the resumes after get candidates details failed", () => {
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

      instance.getResumesDataCallId = apiMsgupdate.messageId;
      expect(instance.getResumesDataCallId).toBe(apiMsgupdate.messageId);
      runEngine.sendMessage("Unit Test", apiMsgupdate);
    });
    when("user render all resume", () => {
      const renderResumes = CvresumeManagementMobile.findWhere(
        (node) => node.prop("testID") === "render-all-resume",
      );
      renderResumes.props().keyExtractor(mockResponseUpdate.getResumes.data[0]);
      shalloRenderResume = shallow(
        renderResumes.props().renderItem({
          item: mockResponseUpdate.getResumes.data[0],
          index: 0,
        }),
      );
    });
    then("user can view resume", () => {
      const eye_btn = shalloRenderResume.findWhere(
        (node) => node.prop("testID") === "eye-btn-test-0",
      );
      eye_btn.simulate("press");
      expect(eye_btn.length).toBe(1);
    });
    then("user can edit resume", () => {
      const btnHandleResume = CvresumeManagementMobile.findWhere(
        (node) => node.prop("testID") === "btn-handle-resume",
      );
      btnHandleResume.simulate("press");
      const edit_btn = shalloRenderResume.findWhere(
        (node) => node.prop("testID") === "edit-btn-test-0",
      );
      edit_btn.simulate("press", mockResponseUpdate.getResumes.data[0]);
      const toggleResume = CvresumeManagementMobile.findWhere(
        (node) => node.prop("testID") === "toggle-resume",
      );
      toggleResume.simulate("press");
      edit_btn.simulate("press", mockResponseUpdate.getResumes.data[0]);
      const inptutitle = CvresumeManagementMobile.findWhere(
        (node) => node.prop("testID") === "inptu-title",
      );
      inptutitle.simulate("changeText", mockResponseUpdate.title);
      btnHandleResume.simulate("press");
      expect(btnHandleResume.length).toBe(1);
    });
    then("change text input and submit", () => {
      const btnHandleResume = CvresumeManagementMobile.findWhere(
        (node) => node.prop("testID") === "btn-handle-resume",
      );
      expect(instance.state.title).toBe(mockResponseUpdate.title);
      const inputFile = CvresumeManagementMobile.findWhere(
        (node) => node.prop("testID") === "inptu-file",
      );
      inputFile.simulate("press");
      btnHandleResume.simulate("press");
      inputFile.simulate("press");
      expect(inputFile.length).toBe(1);
    });
    then("filled all input and submit", () => {
      expect(instance.state.fileResponse).toBe(mockResponseUpdate.fileReponse);
      const btnHandleResume = CvresumeManagementMobile.findWhere(
        (node) => node.prop("testID") === "btn-handle-resume",
      );
      const inputSummary1 = CvresumeManagementMobile.findWhere(
        (node) => node.prop("testID") === "inptu-summary-1",
      );
      inputSummary1.simulate("changeText", "");
      btnHandleResume.simulate("press");
      const inputSummary = CvresumeManagementMobile.findWhere(
        (node) => node.prop("testID") === "inptu-summary-1",
      );

      inputSummary.simulate("changeText", mockResponseUpdate.title);
      const ChackboxBtn = CvresumeManagementMobile.findWhere(
        (node) => node.prop("testID") === "chekc-box-btn",
      );
      expect(instance.state.allow_publish).toBe(false);
      ChackboxBtn.simulate("press");
      expect(instance.state.allow_publish).toBe(true);
      btnHandleResume.simulate("press");
    });
    then("user can edit and update resume successfully", () => {
      const apiMsgupdate = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      apiMsgupdate.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsgupdate.messageId,
      );
      apiMsgupdate.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseUpdate.successMessage,
      );
      instance.updateResumesDataCallId = apiMsgupdate.messageId;
      expect(Platform.OS).toBe("macos");
      runEngine.sendMessage("Unit Test", apiMsgupdate);
    });
    then("user can edit and update resume", () => {
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
      instance.updateResumesDataCallId = apiMsgupdate.messageId;
      runEngine.sendMessage("Unit Test", apiMsgupdate);
      expect(instance.updateResumesDataCallId).toBe(apiMsgupdate.messageId);
    });
    then("user can trash resume", () => {
      const trash_btn = shalloRenderResume.findWhere(
        (node) => node.prop("testID") === "trash-btn-test-0",
      );
      trash_btn.simulate("press", mockResponseUpdate.getResumes.data[0].id);
      expect(trash_btn.length).toBe(1);

      const deleteApiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      deleteApiMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        deleteApiMessage.messageId,
      );
      deleteApiMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseUpdate.error,
      );
      instance.deleteResumesDataCallId = deleteApiMessage.messageId;
      runEngine.sendMessage("Unit Test", deleteApiMessage);
    });
    then("user can trash resume success", () => {
      const trash_btn = shalloRenderResume.findWhere(
        (node) => node.prop("testID") === "trash-btn-test-0",
      );
      trash_btn.simulate("press", mockResponseUpdate.getResumes.data[0].id);
      expect(trash_btn.length).toBe(1);

      const deleteSuccess = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      deleteSuccess.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        deleteSuccess.messageId,
      );
      deleteSuccess.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseUpdate.successMessage,
      );
      instance.deleteResumesDataCallId = deleteSuccess.messageId;
      runEngine.sendMessage("Unit Test", deleteSuccess);
    });

    then("clicked on eye options", () => {
      const eyeBtn = CvresumeManagementMobile.findWhere(
        (node) => node.prop("testID") === "eye-btn-1",
      );
      const eyeBtn2 = CvresumeManagementMobile.findWhere(
        (node) => node.prop("testID") === "eye-btn-2",
      );
      eyeBtn.simulate("press");
      expect(eyeBtn.length).toBe(1);

      eyeBtn2.simulate("press");
    });
    then("button edit profile page", () => {
      const profileEdit = CvresumeManagementMobile.findWhere(
        (node) => node.prop("testID") === "btn-edit-profile",
      );
      profileEdit.simulate("press");
      expect(profileEdit.length).toBe(1);
    });
    then("handle validation add profile", () => {
      const btnHandleresume = CvresumeManagementMobile.findWhere(
        (node) => node.prop("testID") === "btn-handle-add-resume",
      );
      const btninputname = CvresumeManagementMobile.findWhere(
        (node) => node.prop("testID") === "input-name",
      );
      btninputname.simulate("changeText", "");
      btnHandleresume.simulate("press");
      btninputname.simulate("changeText", mockData.attributes.name);
      expect(instance.state.name).toBe(mockData.attributes.name);
      const btninputAge = CvresumeManagementMobile.findWhere(
        (node) => node.prop("testID") === "input-age",
      );
      btninputAge.simulate("changeText", mockData.attributes.age);
      expect(instance.state.personAge).toBe(mockData.attributes.age);
      const btninputExperience = CvresumeManagementMobile.findWhere(
        (node) => node.prop("testID") === "input-experience",
      );
      btninputExperience.simulate(
        "changeText",
        mockData.attributes.years_of_experience,
      );
      expect(instance.state.years_of_experience).toBe(
        mockData.attributes.years_of_experience,
      );
      const btninputinputsummary = CvresumeManagementMobile.findWhere(
        (node) => node.prop("testID") === "input-experience_summary",
      );
      btninputinputsummary.simulate(
        "changeText",
        mockData.attributes.experience_summary,
      );
      expect(instance.state.experience_summary).toBe(
        mockData.attributes.experience_summary,
      );
      const btninpusummary = CvresumeManagementMobile.findWhere(
        (node) => node.prop("testID") === "input-education_summary",
      );
      btninpusummary.simulate(
        "changeText",
        mockData.attributes.education_summary,
      );
      expect(instance.state.education_summary).toBe(
        mockData.attributes.education_summary,
      );
      const btninpuFilesummary = CvresumeManagementMobile.findWhere(
        (node) => node.prop("testID") === "btn-upload-file-2",
      );
      jest
        .spyOn(DocumentPicker, "pick")
        .mockImplementationOnce((() =>
          Promise.reject("user cancel the file uploading")) as any)
        .mockImplementation((() =>
          Promise.resolve(mockResponseUpdate.fileReponse)) as any);
      jest
        .spyOn(DocumentPicker, "isCancel")
        .mockImplementation(((props: any) => Promise.reject(props)) as any);
      btninpuFilesummary.simulate("press");
      btninpuFilesummary.simulate("press");
    });
    then("user can select file and submit", () => {
      const btninpusummary2 = CvresumeManagementMobile.findWhere(
        (node) => node.prop("testID") === "btn-upload-file-1",
      );
      expect(instance.state.education_summary).toBe(
        mockData.attributes.education_summary,
      );
      jest
        .spyOn(DocumentPicker, "pick")
        .mockImplementationOnce((() =>
          Promise.reject("user cancel the file uploading")) as any)
        .mockImplementation((() =>
          Promise.resolve(mockResponseUpdate.fileReponse)) as any);
      jest
        .spyOn(DocumentPicker, "isCancel")
        .mockImplementation((() => undefined) as any);
      btninpusummary2.simulate("press");

      btninpusummary2.simulate("press");
      const btnHandleresume = CvresumeManagementMobile.findWhere(
        (node) => node.prop("testID") === "btn-handle-add-resume",
      );
      btnHandleresume.simulate("press");
    });
    then("to hide the keyboard", () => {
      instance.setState({ isLoading: false });
      const hideButton = CvresumeManagementMobile.findWhere(
        (node) => node.prop("data-testID") === "hide-keyboard",
      );
      hideButton.simulate("press");
      expect(hideButton.length).toBe(1);
    });
    then("search by name", () => {
      const searchText = CvresumeManagementMobile.findWhere(
        (node) => node.prop("data-testID") === "search-id",
      );
      searchText.simulate("changeText", mockResponseUpdate.title);
      expect(searchText.props().value).toBe("");
    });
    then("filter by dropdown", () => {
      const filterByType = CvresumeManagementMobile.findWhere(
        (node) => node.prop("data-testID") === "bntFilter-resume",
      );
      filterByType.simulate("select", "public");
      filterByType.props().renderCustomizedRowChild("public");
      filterByType.props().buttonTextAfterSelection("public");
      filterByType.props().rowTextForSelection("public");
      filterByType.props().renderCustomizedButtonChild();
      filterByType.simulate("changeSearchInputText", "public");
      expect(filterByType.text).toBeTruthy();
    });
    then("render button", () => {
      const renderShallowButton = shallow(<Button {...mockProps} />);
      const renderShallowButton1 = shallow(<Button {...mockProps1} />);
      expect(renderShallowButton).toBeTruthy();
      expect(renderShallowButton1).toBeTruthy();
    });
    then("API get edit add profile response success", () => {
      const apiMsgupdate = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      apiMsgupdate.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsgupdate.messageId,
      );
      apiMsgupdate.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseUpdate.successMessage,
      );
      instance.editCandidateDetailsCallId = apiMsgupdate.messageId;
      runEngine.sendMessage("Unit Test", apiMsgupdate);
      const apiMsgupdate1 = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      apiMsgupdate1.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsgupdate1.messageId,
      );
      apiMsgupdate1.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseUpdate.getCandidatesSuccess1,
      );
      instance.editCandidateDetailsCallId = apiMsgupdate1.messageId;
      runEngine.sendMessage("Unit Test", apiMsgupdate1);
      const apiMsgadd = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      apiMsgadd.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsgadd.messageId,
      );
      apiMsgadd.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseUpdate.successMessage,
      );
      instance.addCandidateDetailsCallId = apiMsgadd.messageId;
      expect(instance.addCandidateDetailsCallId).toBeTruthy();
      runEngine.sendMessage("Unit Test", apiMsgadd);
      const apiMsgadd1 = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      apiMsgadd1.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsgadd1.messageId,
      );
      apiMsgadd1.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseUpdate.success,
      );
      instance.addCandidateDetailsCallId = apiMsgadd1.messageId;
      runEngine.sendMessage("Unit Test", apiMsgadd1);
    });
    then("API get edit add profile response failed", () => {
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
      instance.editCandidateDetailsCallId = apiMsgupdate.messageId;
      expect(instance.editCandidateDetailsCallId).toBeTruthy();

      runEngine.sendMessage("Unit Test", apiMsgupdate);
      const apiMsgadd = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      apiMsgadd.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsgadd.messageId,
      );
      apiMsgadd.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseUpdate.error,
      );
      instance.addCandidateDetailsCallId = apiMsgadd.messageId;
      runEngine.sendMessage("Unit Test", apiMsgadd);
      instance.toggleProfile();
      instance.toggleProfile();
    });
    then("toggle add resumes clicked and called", () => {
      const addNewBtn = CvresumeManagementMobile.findWhere(
        (node) => node.prop("testID") === "add-new-resume-button",
      );
      addNewBtn.simulate("press");
      instance.setState({ fileResponse: mockResponseUpdate.fileReponse });
      instance.addResumeFile();
      const apiMsgadd = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      apiMsgadd.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsgadd.messageId,
      );
      apiMsgadd.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseUpdate.error,
      );
      instance.addResumesDataCallId = apiMsgadd.messageId;
      runEngine.sendMessage("Unit Test", apiMsgadd);
      const apiMsgaddSuccess = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      apiMsgaddSuccess.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsgaddSuccess.messageId,
      );
      apiMsgaddSuccess.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseUpdate.successMessage,
      );
      instance.addResumesDataCallId = apiMsgaddSuccess.messageId;
      runEngine.sendMessage("Unit Test", apiMsgaddSuccess);
      Platform.OS = "ios";
      instance.setState({
        fileResponse: mockResponseUpdate.fileReponse,

        resumeEditId: "",
      });
      instance.addResumeFile();
      instance.updateById();
      instance.searchByText("");
      instance.filteredByType("all");
      instance.handleSubmitResume();
      expect(instance.state.resumeEditId).toBe("");
    });
    then("called remaining function", () => {
      expect(instance.state.name).toBe(
        mockResponseUpdate.getCandidatesSuccess.data.attributes.name,
      );
      instance.setState({ personAge: "" });
      expect(instance.state.personAge).toBe("");
      instance.handleSubmit();
      instance.setState({
        personAge: mockResponseUpdate.getCandidatesSuccess.data.attributes.name,
      });
      expect(instance.state.personAge).toBe(
        mockResponseUpdate.getCandidatesSuccess.data.attributes.name,
      );
      instance.handleSubmit();
      instance.setState({
        personAge:
          mockResponseUpdate.getCandidatesSuccess.data.attributes.age.toString(),
        years_of_experience:
          mockResponseUpdate.getCandidatesSuccess.data.attributes.name,
      });
      instance.handleSubmit();
      instance.setState({
        years_of_experience: "",
      });
      instance.handleSubmit();
      instance.setState({
        years_of_experience:
          mockResponseUpdate.getCandidatesSuccess.data.attributes.years_of_experience.toString(),
        education_summary: "",
      });
      instance.handleSubmit();
      instance.setState({
        education_summary:
          mockResponseUpdate.getCandidatesSuccess.data.attributes
            .education_summary,
        experience_summary: "",
      });
      instance.handleSubmit();
      instance.setState({
        experience_summary:
          mockResponseUpdate.getCandidatesSuccess.data.attributes
            .experience_summary,
      });
    });
    then("all functions remining", () => {
      instance.setState({ isEditProfile: false });
      instance.handleSubmit();
      Platform.OS = "android";
      instance.handleSubmit();
      instance.setState({ isLoading: false, isAddResumeModalOpen: false });
      const publicResumeButton = CvresumeManagementMobile.findWhere(
        (node) => node.prop("testID") === "public-resume-button",
      );
      expect(instance.state.isLoading).toBe(false);
      publicResumeButton.simulate("press");
      const publicTempateButton = CvresumeManagementMobile.findWhere(
        (node) => node.prop("testID") === "go-to-template-button",
      );
      publicTempateButton.simulate("press");
      instance.onSuccessAddCandidates();
    });
    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(CvresumeManagementMobile).toBeTruthy();
    });
  });
});
