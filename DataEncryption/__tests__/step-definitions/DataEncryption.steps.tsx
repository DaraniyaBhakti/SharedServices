import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import DataEncryption from "../../src/DataEncryption";
const navigation = require("react-navigation");
import RNFS, { DownloadFileOptions, DownloadResult } from "react-native-fs";
import { PermissionsAndroid, Platform } from "react-native";
global.FormData = require("react-native/Libraries/Network/FormData");
const screenProps = {
  navigation: navigation,
  id: "DataEncryption",
};
const feature = loadFeature(
  "./__tests__/features/DataEncryption-scenario.feature",
);
interface DownloadFileMock {
  (options: DownloadFileOptions): {
    jobId: number;
    promise: Promise<DownloadResult>;
  };
}
defineFeature(feature, (test) => {
  const loginAPiResponse = {
    meta: {
      token: "eyJhbGciOiJIUzUxMiJ9.eNjk1NDkzMywidG9rZW5fbgJmUaaPl7Cw",
      refresh_token: "VU8uN7FR08fso4sqKgg1N9hLXwIRd1MlEyfbw1g",
      id: 24,
    },
  };
  const downloadFileMock =
    RNFS.downloadFile as jest.MockedFunction<DownloadFileMock>;
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
    jest.mock("react-native-fs", () => ({ downloadFile: downloadFileMock }));
  });
  test("User navigates to DataEncryption", ({ given, when, then }) => {
    let dataEncryptionBlock: ShallowWrapper;
    let instance: DataEncryption;
    given("I am a User loading DataEncryption", () => {
      dataEncryptionBlock = shallow(<DataEncryption {...screenProps} />);
    });
    when("I navigate to the DataEncryption", () => {
      instance = dataEncryptionBlock.instance() as DataEncryption;
    });
    then("DataEncryption will load with out errors", () => {
      expect(dataEncryptionBlock).toBeTruthy();
    });
    then(
      "I can select the touchable without feedback with without errors",
      () => {
        let touchableWithoutFeedback = dataEncryptionBlock.findWhere(
          (node) => node.prop("testID") === "touchableWithoutFeedback",
        );
        touchableWithoutFeedback.simulate("press");
        expect(touchableWithoutFeedback).toHaveLength(1);
      },
    );
    then("I can enter text with out errors", () => {
      let textInputEncryptionComponent = dataEncryptionBlock.findWhere(
        (node) => node.prop("testID") === "encryptionString",
      );
      textInputEncryptionComponent.simulate("changeText", "hello@aol.com");
      expect(textInputEncryptionComponent).toHaveLength(1);
      let textInputDecryptionComponent = dataEncryptionBlock.findWhere(
        (node) => node.prop("testID") === "decryptionString",
      );
      textInputDecryptionComponent.simulate("changeText", "hello@aol.com");
      expect(textInputDecryptionComponent).toHaveLength(1);
      Platform.OS = "android";
      const responseJson = { data: 'test data', message: 'test message' };
      const fileName = 'test.txt';
      PermissionsAndroid.check = jest.fn().mockReturnValue(true);
      PermissionsAndroid.request = jest.fn().mockResolvedValueOnce('granted');
      instance.checkPermission(responseJson, fileName);
      PermissionsAndroid.check = jest.fn().mockReturnValue(false);
      PermissionsAndroid.request = jest.fn().mockResolvedValueOnce('denied');
      instance.checkPermission(responseJson, fileName);
      downloadFileMock.mockReturnValueOnce({
        promise: Promise.resolve({
          jobId: 121,
          statusCode: 200,
          bytesWritten: 2048,
        }),
        jobId: 0,
      });
      instance.downloadOutputFiles(
        {
          message: "File encrypted",
          data: "https://b21ksharedservicesinr-294805-ruby.b294805.dev.eastus.az.svc.builder.cafe/data/encrypted_ipCoRKs4N3guMor-kPJ_Ew.txt",
        },
        "sample.txt",
      );
    });
    then("I can select the button with with out errors", async () => {
      let btnEncryptString = dataEncryptionBlock.findWhere(
        (node) => node.prop("testID") === "btnEncryptString",
      );
      btnEncryptString.simulate("press");
      expect(btnEncryptString).toHaveLength(1);
      let btnDecryptString = dataEncryptionBlock.findWhere(
        (node) => node.prop("testID") === "btnDecryptString",
      );
      btnDecryptString.simulate("press");
      expect(btnDecryptString).toHaveLength(1);
      let btnEncryptFile = dataEncryptionBlock.findWhere(
        (node) => node.prop("testID") === "btnEncryptFile",
      );
      btnEncryptFile.simulate("press");
      expect(btnEncryptFile).toHaveLength(1);
      let btnDecryptFile = dataEncryptionBlock.findWhere(
        (node) => node.prop("testID") === "btnDecryptFile",
      );
      btnDecryptFile.simulate("press");
      expect(btnDecryptFile).toHaveLength(1);
      let btnEncryptFolder = dataEncryptionBlock.findWhere(
        (node) => node.prop("testID") === "btnEncryptFolder",
      );
      btnEncryptFolder.simulate("press");
      expect(btnEncryptFolder).toHaveLength(1);
      let btnDecryptFolder = dataEncryptionBlock.findWhere(
        (node) => node.prop("testID") === "btnDecryptFolder",
      );
      btnDecryptFolder.simulate("press");
      expect(btnDecryptFolder).toHaveLength(1);
      Platform.OS = "ios";
      downloadFileMock.mockReturnValueOnce({
        promise: Promise.resolve({
          jobId: 122,
          statusCode: 200,
          bytesWritten: 1024,
        }),
        jobId: 0,
      });
      instance.downloadOutputFiles(
        {
          message: "File encrypted",
          data: "https://b21ksharedservicesinr-294805-ruby.b294805.dev.eastus.az.svc.builder.cafe/data/encrypted_ipCoRKs4N3guMor-kPJ_Ew.txt",
        },
        "sample.txt",
      );
      downloadFileMock.mockReturnValueOnce({
        promise: Promise.resolve({
          jobId: 123,
          statusCode: 404,
          bytesWritten: 0,
        }),
        jobId: 0,
      });
      instance.downloadOutputFiles(
        {
          message: "File encrypted",
          data: "https://b21ksharedservicesinr-294805-ruby.b294805.dev.eastus.az.svc.builder.cafe/encrypted_ipCoRKs4N3guMor-kPJ_Ew.txt",
        },
        "sample.txt",
      );
      downloadFileMock.mockReturnValueOnce({
        promise: Promise.reject(),
        jobId: 0,
      });
      instance.downloadOutputFiles(
        {
          message: "File encrypted",
          data: "https://b21ksharedservicesinr-294805-ruby.b294805.dev.eastus.az.svc.builder.cafe/encrypted_ipCoRKs4N3guMor-kPJ_Ew.txt",
        },
        "sample.txt",
      );
    });
    then("Login API load with out errors", () => {
      const loginApi: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      loginApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        loginApi.messageId,
      );
      loginApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(loginAPiResponse)),
      );
      loginApi.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        "Error",
      );
      instance.apiEmailLoginCallId = loginApi.messageId;
      runEngine.sendMessage("Unit Test", loginApi);
      expect(dataEncryptionBlock).toBeTruthy();
    });
    then("String encryption API load with out errors", () => {
      const apiEncryptString: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      apiEncryptString.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiEncryptString.messageId,
      );
      apiEncryptString.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(
          JSON.stringify({
            data: "aGVsbG8gaSBhbSB0ZXN0aW5nIHN0cmluZw==\n",
            message: "String Encrypted successfully",
          }),
        ),
      );
      apiEncryptString.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        "Error",
      );
      instance.apiEncryptString = apiEncryptString.messageId;
      runEngine.sendMessage("Unit Test", apiEncryptString);
      expect(dataEncryptionBlock).toBeTruthy();
    });
    then("String decryption API load with out errors", () => {
      const apiDecryptString: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      apiDecryptString.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiDecryptString.messageId,
      );
      apiDecryptString.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(
          JSON.stringify({
            message: "String Decrypted successfully",
            data: "hello i am testing string",
          }),
        ),
      );
      apiDecryptString.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        "Error",
      );
      instance.apiDecryptString = apiDecryptString.messageId;
      runEngine.sendMessage("Unit Test", apiDecryptString);
      expect(dataEncryptionBlock).toBeTruthy();
    });
    then("File encryption API load with out errors", () => {
      const apiEncryptFile: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      apiEncryptFile.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiEncryptFile.messageId,
      );
      apiEncryptFile.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(
          JSON.stringify({
            message: "File encrypted",
            data: "https://b21ksharedservicesinr-294805-ruby.b294805.dev.eastus.az.svc.builder.cafe/data/encrypted_ipCoRKs4N3guMor-kPJ_Ew.txt",
          }),
        ),
      );
      apiEncryptFile.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        "Error",
      );
      instance.apiEncryptFile = apiEncryptFile.messageId;
      runEngine.sendMessage("Unit Test", apiEncryptFile);
      expect(dataEncryptionBlock).toBeTruthy();
    });
    then("File decryption API load with out errors", () => {
      const apiDecryptFile: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      apiDecryptFile.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiDecryptFile.messageId,
      );
      apiDecryptFile.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(
          JSON.stringify({
            message: "File decrypted",
            data: "https://b21ksharedservicesinr-294805-ruby.b294805.dev.eastus.az.svc.builder.cafe/data/decrypted_kPYzHpQ4zkAPTUnqxUCxeQ.txt",
          }),
        ),
      );
      apiDecryptFile.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        "Error",
      );
      instance.apiDecryptFile = apiDecryptFile.messageId;
      runEngine.sendMessage("Unit Test", apiDecryptFile);
      expect(dataEncryptionBlock).toBeTruthy();
    });
    then("Folder encryption API load with out errors", () => {
      const apiEncryptFolder: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      apiEncryptFolder.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiEncryptFolder.messageId,
      );
      apiEncryptFolder.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(
          JSON.stringify({
            message: "Folder encrypted",
            data: "https://b21ksharedservicesinr-294805-ruby.b294805.dev.eastus.az.svc.builder.cafe/encrypted_1YTmw1L6Ob-F7o_GN5331g.zip",
          }),
        ),
      );
      apiEncryptFolder.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        "Error",
      );
      instance.apiEncryptFolder = apiEncryptFolder.messageId;
      runEngine.sendMessage("Unit Test", apiEncryptFolder);
      expect(dataEncryptionBlock).toBeTruthy();
    });
    then("Folder decryption API load with out errors", () => {
      const apiDecryptFolder: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      apiDecryptFolder.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiDecryptFolder.messageId,
      );
      apiDecryptFolder.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(
          JSON.stringify({
            message: "Folder decrypted",
            data: "https://b21ksharedservicesinr-294805-ruby.b294805.dev.eastus.az.svc.builder.cafe/decrypted_OusY3tALu-Y7yPs1ykDt4w.zip",
          }),
        ),
      );
      apiDecryptFolder.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        "Error",
      );
      instance.apiDecryptFolder = apiDecryptFolder.messageId;
      runEngine.sendMessage("Unit Test", apiDecryptFolder);
      expect(dataEncryptionBlock).toBeTruthy();
    });
    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(dataEncryptionBlock).toBeTruthy();
    });
  });
});
