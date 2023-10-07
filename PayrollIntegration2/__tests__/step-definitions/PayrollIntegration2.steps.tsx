import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import PayrollIntegration2 from "../../src/PayrollIntegration2";
const navigation = require("react-navigation");
import { handleTestApiCall } from "framework/src/Helpers/handle-test-api";
global.FormData = require("react-native/Libraries/Network/FormData");

const screenProps = {
  navigation: navigation,
  id: "PayrollIntegration2",
};

const feature = loadFeature(
  "./__tests__/features/PayrollIntegration2-scenario.feature",
);

const loginData = {
  meta: {
    token:
      "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MywiZXhwIjoxNjcyMjI2OTIyLCJ0b2tlbl90eXBlIjoibG9naW4ifQ.rfMUt1EWQVOkOO_1_uFKWRvyeRkQOUlqVv-rroSoZRDkIeVLESv_bxx2-ICngxogps6fmzOztLc82JR80m_9KA",
    id: 3,
  },
};
const payrollData = {
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
const exportData = {
  data: [["id", "date", "category", "description", "income", "expense"]],
};

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to PayrollIntegration2", ({ given, when, then }) => {
    let payrollBlock: ShallowWrapper;
    let instance: PayrollIntegration2;

    given("I am a User loading PayrollIntegration2", () => {
      payrollBlock = shallow(<PayrollIntegration2 {...screenProps} />);
    });

    when("I navigate to the PayrollIntegration2", () => {
      instance = payrollBlock.instance() as PayrollIntegration2;
    });

    then("PayrollIntegration2 will load with out errors", () => {
      expect(payrollBlock).toBeTruthy();

      //LoginApi Test
      let loginMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      instance.loginApiCallId = loginMessage.messageId;
      handleTestApiCall(loginMessage, loginData);
      //get Payroll Data Test
      const payrollJsonData = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      payrollJsonData.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        payrollJsonData.messageId,
      );
      payrollJsonData.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        payrollData,
      );
      instance.getPayrollApiCallId = payrollJsonData.messageId;
      runEngine.sendMessage("Unit Test", payrollJsonData);
      expect(instance.state.filteredData.length).toBe(1);

      //getExportPayrollCsvData Test

      const getExportPayrollCsvData = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      getExportPayrollCsvData.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getExportPayrollCsvData.messageId,
      );
      getExportPayrollCsvData.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        exportData,
      );
      instance.getPayrollFilterDataCallId = getExportPayrollCsvData.messageId;
      runEngine.sendMessage("Unit Test", getExportPayrollCsvData);
      expect(instance.state.exportData.length).toBe(1);
    });
    then("I can click Selected Tab", () => {
      const selectedTabButton = payrollBlock.findWhere(
        (node) => node.prop("testID") === "selected_view",
      );
      const selectedTabButton2 = payrollBlock.findWhere(
        (node) => node.prop("testID") === "selected_view2",
      );
      expect(selectedTabButton).toBeTruthy();
      expect(selectedTabButton2).toBeTruthy();
      const formData = new FormData();
      instance.postImportPayrollCsvData(formData);

      selectedTabButton.simulate("press");
      expect(instance.state.selectExpense).toBe(false);

      selectedTabButton2.simulate("press");
      expect(instance.state.selectExpense).toBe(true);
    });
    then("User can open modal", () => {
      instance.setState({ filterDataModalState: false });
      const filterModalStatus = payrollBlock.findWhere(
        (node) => node.prop("testID") === "filter_modal",
      );
      expect(filterModalStatus).toBeTruthy();
      filterModalStatus.simulate("press");
      expect(instance.state.filterDataModalState).toBe(true);
    });
    then("User can clear filter data", () => {
      instance.setState({ filterDataModalState: true });
      const clearFilterData = payrollBlock.findWhere(
        (node) => node.prop("testID") === "clear_filter",
      );
      expect(clearFilterData).toBeTruthy();
      clearFilterData.simulate("press");
      expect(instance.state.filterDataModalState).toBe(false);
    });
    then("User can filter data", () => {
      instance.setState({ filterDataModalState: true });
      const filterButton = payrollBlock.findWhere(
        (node) => node.prop("testID") === "filter_button",
      );
      expect(filterButton).toBeTruthy();
      filterButton.simulate("press");
      expect(instance.state.filterDataModalState).toBe(false);
    });
    then("TextInput field", () => {
      instance.setState({ filterDataModalState: true });
      const incomeLowVal = payrollBlock.findWhere(
        (node) => node.prop("testID") === "incomeLowVal",
      );
      const incomeHighVal = payrollBlock.findWhere(
        (node) => node.prop("testID") === "incomeHighVal",
      );
      const ExpenseLowVal = payrollBlock.findWhere(
        (node) => node.prop("testID") === "ExpenseLowVal",
      );
      const expenseHighVal = payrollBlock.findWhere(
        (node) => node.prop("testID") === "expenseHighVal",
      );
      expect(incomeLowVal).toBeTruthy();
      expect(incomeHighVal).toBeTruthy();
      expect(ExpenseLowVal).toBeTruthy();
      expect(expenseHighVal).toBeTruthy();

      incomeLowVal.simulate("changeText", "Add profile");
      expect(instance.state.incomeLowValue).toBe("Add profile");

      incomeHighVal.simulate("changeText", "Add profile");
      expect(instance.state.incomeHighValue).toBe("Add profile");

      ExpenseLowVal.simulate("changeText", "Add profile");
      expect(instance.state.expenseLowValue).toBe("Add profile");

      expenseHighVal.simulate("changeText", "Add profile");
      expect(instance.state.expenseHighValue).toBe("Add profile");
    });
    then("User can open chart modal", () => {
      const chartModalStatusOpen = payrollBlock.findWhere(
        (node) => node.prop("testID") === "setChartModalView1",
      );
      const chartModalStatusClose = payrollBlock.findWhere(
        (node) => node.prop("testID") === "setChartModalView2",
      );
      expect(chartModalStatusOpen).toBeTruthy();
      expect(chartModalStatusClose).toBeTruthy();

      chartModalStatusOpen.simulate("press");
      expect(instance.state.chartModalState).toBe(true);
      chartModalStatusClose.simulate("press");
      expect(instance.state.chartModalState).toBe(false);
    });
    then("I can click Export Csv Button", () => {
      const exportCsvButton = payrollBlock.findWhere(
        (node) => node.prop("testID") === "Export_Csv",
      );
      expect(exportCsvButton).toBeTruthy();
      exportCsvButton.simulate("press");
    });
    then("I can click Import Csv Button", () => {
      const importCsvButton = payrollBlock.findWhere(
        (node) => node.prop("testID") === "Import_Csv",
      );
      expect(importCsvButton).toBeTruthy();
      importCsvButton.simulate("press");

      let postImportPayrollCsvData = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      instance.importPayrollDataCallId = postImportPayrollCsvData.messageId;
      handleTestApiCall(postImportPayrollCsvData);
    });
    then("Click open date picker", () => {
      instance.setState({ filterDataModalState: true });
      const openDatePicker1 = payrollBlock.findWhere(
        (node) => node.prop("testID") === "openDatePicker1",
      );
      const openDatePicker2 = payrollBlock.findWhere(
        (node) => node.prop("testID") === "openDatePicker2",
      );
      expect(openDatePicker1).toBeTruthy();
      openDatePicker1.simulate("press");
      expect(instance.state.isOpenStartDatePicker).toBe(true);

      expect(openDatePicker2).toBeTruthy();
      openDatePicker2.simulate("press");
      expect(instance.state.isOpenEndDatePicker).toBe(true);
    });
  });
});
