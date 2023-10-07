import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import CentralisedBilling from "../../src/CentralisedBilling.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "CentralisedBilling",
};

const feature = loadFeature(
  "./__tests__/features/CentralisedBilling-scenario.web.feature",
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
    });

    then("CentralisedBilling will load with out errors", () => {
      instance.setState({
        ordersData: [
          {
            id: "1231434asd",
            type: "order_detail",
            invoice: "",
            attributes: {
              id: 80,
              name: "example",
              order_number: "324asd",
              order_date: "2023-123",
              order_detail_id: 23,
              product_id: 24,
              quantity: 2,
              price: "34",
              discount_price: "2",
              final_price: "32",
              created_at: "2023-123",
              updated_at: "2023-124",
              order_items: [
                {
                  order_item: {
                    id: 32,
                    order_detail_id: 82,
                    product_id: 92,
                    quantity: 5,
                    price: "200",
                    discount_price: "2",
                    final_price: "198",
                    created_at: "2023-343",
                    updated_at: "2023-344",
                  },
                  product_details: {
                    data: {
                      attributes: {
                        product_name: "produxt1",
                        serial_number: "2323asdda",
                        available_quantity: 3,
                        price: "194",
                        product_description: "desc",
                        product_status: "active",
                        image: "photo",
                        seller_details: {
                          data: {
                            attributes: {
                              activated: true,
                              email: "product@gmail.com",
                              first_name: "seller1",
                              full_phone_number: "1234567890",
                            },
                          },
                        },
                      },
                    },
                  },
                },
              ],
              invoice: "in",
            },
          },
          {
            id: "2231434asd98",
            type: "order_detail2",
            invoice: "",
          },
          {
            id: "12231434asdw76",
            type: "order_detail4",
            invoice: "",
            attributes: {
              id: 86,
              name: "example",
              order_number: "324asd",
              order_date: "2023-123",
              order_detail_id: 23,
              product_id: 24,
              quantity: 2,
              price: "34",
              discount_price: "2",
              final_price: "32",
              created_at: "2023-123",
              updated_at: "2023-124",
              order_items: [
                {
                  order_item: {
                    id: 33,
                    order_detail_id: 83,
                    product_id: 93,
                    quantity: 5,
                    price: "200",
                    discount_price: "2",
                    final_price: "198",
                    created_at: "2023-343",
                    updated_at: "2023-344",
                  },
                },
              ],
              invoice: "in",
            },
          },
        ],
      });

      let container = component.findWhere(
        (node) => node.prop("data-test-id") === "container",
      );
      expect(container).toBeTruthy();

      component
        .findWhere((node) => node.prop("data-test-id") === "invoiceLink")
        .first()
        .simulate("click");

      instance.handleInvoiceClick({
        id: "1231434asd",
        type: "order_detail",
        invoice: "",
        attributes: {
          id: 80,
          name: "example",
          order_number: "324asd",
          order_date: "2023-123",
          order_detail_id: 23,
          product_id: 24,
          quantity: 2,
          price: "34",
          discount_price: "2",
          final_price: "32",
          created_at: "2023-123",
          updated_at: "2023-124",
          order_items: [
            {
              order_item: {
                id: 32,
                order_detail_id: 82,
                product_id: 92,
                quantity: 5,
                price: "200",
                discount_price: "2",
                final_price: "198",
                created_at: "2023-343",
                updated_at: "2023-344",
              },
              product_details: {
                data: {
                  attributes: {
                    product_name: "produxt1",
                    serial_number: "2323asdda",
                    available_quantity: 3,
                    price: "194",
                    product_description: "desc",
                    product_status: "active",
                    image: "photo",
                    seller_details: {
                      data: {
                        attributes: {
                          activated: true,
                          email: "product@gmail.com",
                          first_name: "seller1",
                          full_phone_number: "1234567890",
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
          invoice: "in",
        },
      });

      expect(component).toBeTruthy();
    });

    then("I can enter text with out errors", () => {
      instance.handleGoToPage(undefined, 1);

      component
        .findWhere((node) => node.prop("data-test-id") === "invoiceLink")
        .first()
        .simulate("click");

      expect(component).toBeTruthy();
    });

    then("I can select the button with with out errors", () => {
      instance.handleUpdatePaginationWeb({
        pagination: {
          current_page: 1,
          next_page: 2,
          prev_page: 1,
          total_pages: 10,
          total_count: 10,
          current_count: 10,
          per_page: 10,
        },
      });

      expect(component).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(component).toBeTruthy();
    });
  });
});
