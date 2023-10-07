import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import PayrollIntegration2 from "../../src/PayrollIntegration2.web";
const navigation = require("react-navigation");
import { handleTestApiCall } from "framework/src/Helpers/handle-test-api";
global.FormData = require("react-native/Libraries/Network/FormData");

const screenProps = {
  navigation: navigation,
  id: "PayrollIntegration2",
};
const feature = loadFeature(
  "./__tests__/features/PayrollIntegration2-scenario.web.feature",
);
const webLoginData = {
  meta: {
    token:
      "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MywiZXhwIjoxNjcyMjI2OTIyLCJ0b2tlbl90eXBlIjoibG9naW4ifQ.rfMUt1EWQVOkOO_1_uFKWRvyeRkQOUlqVv-rroSoZRDkIeVLESv_bxx2-ICngxogps6fmzOztLc82JR80m_9KA",
    id: 3,
  },
};
const webPayrollData = {
  data: [
    {
      id: 6,
      date: "01/23/2001, 12:00 AM",
      category: "fjkvf",
      description: "bds  fjndsbskkjdss",
      income: 2000,
      expense: 2000,
      is_active: true,
      created_by: "41",
      updated_by: "41",
    },
  ],
};
const exportWebData = {
  data: [["id", "date", "category", "description", "income", "expense"]],
};

defineFeature(feature, (webTest) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  webTest("User navigates to PayrollIntegration2", ({ given, when, then }) => {
    let payrollWebBlock: ShallowWrapper;
    let instance: PayrollIntegration2;

    given("I am a User loading PayrollIntegration2", () => {
      payrollWebBlock = shallow(<PayrollIntegration2 {...screenProps} />);
    });

    when("I navigate to the PayrollIntegration2", () => {
      instance = payrollWebBlock.instance() as PayrollIntegration2;
    });

    then("PayrollIntegration2 will load with out errors", () => {
      expect(payrollWebBlock).toBeTruthy();
      //LoginApi Test
      let webLoginMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      instance.loginApiCallIdWeb = webLoginMessage.messageId;
      handleTestApiCall(webLoginMessage, webLoginData);

      //get Payroll Data Test
      const webPayrollJsonData = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      webPayrollJsonData.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        webPayrollJsonData.messageId,
      );
      webPayrollJsonData.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        webPayrollData,
      );
      instance.getPayrollApiCallIdWeb = webPayrollJsonData.messageId;
      runEngine.sendMessage("Unit Test", webPayrollJsonData);
      expect(instance.state.filteredDataWeb.length).toBe(1);

      //getExportPayrollCsvData Test

      const getWebExportPayrollCsvData = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      getWebExportPayrollCsvData.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getWebExportPayrollCsvData.messageId,
      );
      getWebExportPayrollCsvData.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        exportWebData,
      );
      instance.getPayrollFilterDataCallIdWeb =
        getWebExportPayrollCsvData.messageId;
      runEngine.sendMessage("Unit Test", getWebExportPayrollCsvData);
      expect(instance.state.exportDataWeb.length).toBe(1);
    });

    then("I can click Selected Tab", () => {
      const webSelectedTabButton = payrollWebBlock.findWhere(
        (node) => node.prop("testID") === "select_which",
      );
      const webSelectedTabButton2 = payrollWebBlock.findWhere(
        (node) => node.prop("testID") === "select_which2",
      );
      expect(webSelectedTabButton).toBeTruthy();
      expect(webSelectedTabButton2).toBeTruthy();

      webSelectedTabButton.simulate("press");
      expect(instance.state.selectExpenseWeb).toBe(false);

      webSelectedTabButton2.simulate("press");
      expect(instance.state.selectExpenseWeb).toBe(true);
    });

    then("User can open modal", () => {
      instance.setState({ filterDataModalStateWeb: false });
      const webFilterModalStatus = payrollWebBlock.findWhere(
        (node) => node.prop("testID") === "filter_modal_web",
      );

      let startDatePicker = payrollWebBlock.find("#date-picker-inline");
      startDatePicker.simulate("change");
      let endDatePicker = payrollWebBlock.find("#date-picker-inline1");
      endDatePicker.simulate("change");

      expect(webFilterModalStatus).toBeTruthy();
      webFilterModalStatus.simulate("press");
      expect(instance.state.filterDataModalStateWeb).toBe(true);
    });

    then("User can clear filter data", () => {
      instance.setState({ filterDataModalStateWeb: true });
      const webClearFilterData = payrollWebBlock.findWhere(
        (node) => node.prop("testID") === "clear_filter_web",
      );
      expect(webClearFilterData).toBeTruthy();
      webClearFilterData.simulate("press");
      expect(instance.state.filterDataModalStateWeb).toBe(false);
    });

    then("User can filter data", () => {
      instance.setState({ filterDataModalStateWeb: true });
      const webFilterButton = payrollWebBlock.findWhere(
        (node) => node.prop("testID") === "filter_button_web",
      );
      expect(webFilterButton).toBeTruthy();
      webFilterButton.simulate("press");
      expect(instance.state.filterDataModalStateWeb).toBe(false);
    });

    then("TextInput field", () => {
      instance.setState({ filterDataModalStateWeb: true });
      const incomeLowValWeb = payrollWebBlock.findWhere(
        (node) => node.prop("testID") === "incomeLowValWeb",
      );
      const incomeHighValWeb = payrollWebBlock.findWhere(
        (node) => node.prop("testID") === "incomeHighValWeb",
      );
      const ExpenseLowValWeb = payrollWebBlock.findWhere(
        (node) => node.prop("testID") === "ExpenseLowValWeb",
      );
      const expenseHighValWeb = payrollWebBlock.findWhere(
        (node) => node.prop("testID") === "expenseHighValWeb",
      );
      expect(incomeLowValWeb).toBeTruthy();
      expect(incomeHighValWeb).toBeTruthy();
      expect(ExpenseLowValWeb).toBeTruthy();
      expect(expenseHighValWeb).toBeTruthy();

      incomeLowValWeb.simulate("changeText", "Add profile");
      expect(instance.state.incomeLowValueWeb).toBe("Add profile");

      incomeHighValWeb.simulate("changeText", "Add profile");
      expect(instance.state.incomeHighValueWeb).toBe("Add profile");

      ExpenseLowValWeb.simulate("changeText", "Add profile");
      expect(instance.state.expenseLowValueWeb).toBe("Add profile");

      expenseHighValWeb.simulate("changeText", "Add profile");
      expect(instance.state.expenseHighValueWeb).toBe("Add profile");
    });

    then("User can open chart modal", () => {
      const webChartModalStatusOpen = payrollWebBlock.findWhere(
        (node) => node.prop("testID") === "setChartWebModalView1",
      );
      const webChartModalStatusClose = payrollWebBlock.findWhere(
        (node) => node.prop("testID") === "setChartWebModalView2",
      );
      expect(webChartModalStatusOpen).toBeTruthy();
      expect(webChartModalStatusClose).toBeTruthy();

      webChartModalStatusOpen.simulate("press");
      expect(instance.state.chartModalStateWeb).toBe(true);
      webChartModalStatusClose.simulate("press");
      expect(instance.state.chartModalStateWeb).toBe(false);
    });

    then("I can click Export Csv Button", () => {
      const exportWebCsvButton = payrollWebBlock.findWhere(
        (node) => node.prop("testID") === "Export_Csv_Web",
      );
      expect(exportWebCsvButton).toBeTruthy();
      exportWebCsvButton.simulate("press");
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(payrollWebBlock).toBeTruthy();
    });
  });
});
