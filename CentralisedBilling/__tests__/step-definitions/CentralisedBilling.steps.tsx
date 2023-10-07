import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { orderListData, LoginData } from "./mockData";
import * as React from "react";
import CentralisedBilling from "../../src/CentralisedBilling";
import OrdersData from "../../src/Components/OrdersData";
import { handleTestApiCall } from "../../../../framework/src/Helpers/handle-test-api";

const navigation = { navigate: () => jest.fn() };

const screenProps = {
  navigation: navigation,
  id: "CentralisedBilling",
};

const feature = loadFeature(
  "./__tests__/features/CentralisedBilling-scenario.feature",
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to CentralisedBilling", ({ given, when, then }) => {
    let component: ShallowWrapper;
    let instance: CentralisedBilling;

    given("I am a User loading CentralisedBilling", () => {
      component = shallow(<CentralisedBilling {...screenProps} />);
    });

    when("I navigate to the CentralisedBilling", () => {
      instance = component.instance() as CentralisedBilling;
      expect(instance).toBeTruthy();
      component = shallow(<CentralisedBilling {...screenProps} />);
      instance = component.instance() as CentralisedBilling;
    });

    then("CentralisedBilling will load with out errors", () => {
      const wrapper = shallow(<CentralisedBilling {...screenProps} />);
      wrapper.instance().setState({ isLoading: false });
      const key = wrapper
        .findWhere((node) => node.prop("testID") === "flatListTest")
        .props()
        .keyExtractor({ id: "3" });
      expect(key).toBe("3");

      let flatList = wrapper
        .findWhere((node) => node.prop("testID") === "flatListTest")
        .renderProp("renderItem")({
        item: orderListData,
      });

      flatList = wrapper
        .findWhere((node) => node.prop("testID") === "flatListTest")
        .renderProp("renderItem")({
        item: null,
      });

      let container = component.findWhere(
        (node) => node.prop("testID") === "container",
      );
      expect(container).toBeTruthy();

      const orderDataCom: ShallowWrapper = shallow(
        <OrdersData data={orderListData} />,
      );
      expect(orderDataCom).toBeTruthy();

      instance.handleOpenInvoice({
        attributes: {
          order_items: [],
          invoice: "https://www.google.com",
        },
      });

      const loginApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      instance.loginApiCallId = loginApiCallId.messageId;
      handleTestApiCall(loginApiCallId, LoginData);

      instance.getOrdersList();
      const getOrdersDataAPICallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      instance.getOrdersDataAPICallId = getOrdersDataAPICallId.messageId;
      handleTestApiCall(getOrdersDataAPICallId, orderListData);

      const orderWrapper = shallow(<OrdersData data={orderListData} />);

      expect(orderWrapper).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(component).toBeTruthy();
    });
  });
});
