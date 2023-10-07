import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import BudgetingForecasting from "../../src/BudgetingForecasting.web";
import { handleTestApiCall } from "../../../../framework/src/Helpers/handle-test-api";
const navigation = require("react-navigation");
const screenProps = {navigation: navigation,id: "BudgetingForecasting",};
const feature = loadFeature("./__tests__/features/BudgetingForecasting-scenario.web.feature",);
const loginData = {
  meta: {
    token:
      "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MywiZXhwIjoxNjcyMjI2OTIyLCJ0b2tlbl90eXBlIjoibG9naW4ifQ.rfMUt1EWQVOkOO_1_uFKWRvyeRkQOUlqVv-rroSoZRDkIeVLESv_bxx2-ICngxogps6fmzOztLc82JR80m_9KA",
    id: 3,
  },
};
const budgetingForecastingData = {
  data: {
    total_revenues_amount: "4200.0",
    total_expenses_amount: "885.0",
    total_budget_amount: "3315.0",
    revenues: [
      {attributes: {name: "loan",amount: "2000.0",currency: "Dollar",},},
      {attributes: {amount: "2000.0",currency: "Dollar",},},
      {attributes: {amount: "2000.0",currency: "Dollar",},
      },
    ],
    expences: [
      {attributes: {name: "service",amount: "2000.0",currency: "INR",},},
      {attributes: {name: "service",amount: "2000.0",currency: "Pound",},},
      {attributes: {amount: "2000.0",currency: "Pound",},},
    ],
  },
};
defineFeature(feature, (test) => {
  beforeEach(() => {jest.resetModules();jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });
  test("User navigates to BudgetingForecasting", ({ given, when, then }) => {
    let component: ShallowWrapper;let instance: BudgetingForecasting;
    given("I am a User loading BudgetingForecasting", () => {component = shallow(<BudgetingForecasting {...screenProps} />);});
    when("I navigate to the BudgetingForecasting", () => {instance = component.instance() as BudgetingForecasting;instance.setState({data: budgetingForecastingData.data,token: loginData.meta.token,});});
    then("BudgetingForecasting will load with out errors", () => {
      let container = component.find("#container");
      expect(container).toBeTruthy();
      let requestMessage = new Message(getName(MessageEnum.RestAPIResponceMessage),);
      instance.loginApiCallId = requestMessage.messageId;
      handleTestApiCall(requestMessage, 
        { errors: ["error message"] 
      });
      handleTestApiCall(
        requestMessage, loginData
        );
      let requestMessage2 = new Message(getName(MessageEnum.RestAPIResponceMessage),);
      instance.getBudgetingForecastingApiCallId = requestMessage2.messageId;
      handleTestApiCall(requestMessage2, { 
        errors: ["error message"]
       });
      handleTestApiCall(
        requestMessage2, budgetingForecastingData
        );
    });
    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(component)
      .toBeTruthy();
    });
  });
});
