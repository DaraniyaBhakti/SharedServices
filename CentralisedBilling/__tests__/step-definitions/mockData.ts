import { OrderItems, Login } from "../../src/types";

export const orderListData: OrderItems = {
  id: "42",
  type: "order_detail",
  attributes: {
    id: 42,
    name: "teja",
    order_date: "2023-02-08T10:15:23.879Z",
    order_number: "ORDFW5QR6W",
    order_items: [
      {
        order_item: {
          id: 42,
          order_detail_id: 34,
          product_id: 122,
          quantity: 12,
          price: "sd1sd",
          discount_price: "sdssd",
          final_price: "sd3sd",
          created_at: "sdsd2",
          updated_at: "sds3d",
        },
        product_details: {
          data: {
            attributes: {
              product_name: "sds",
              serial_number: "223",
              available_quantity: 23,
              price: "a2",
              product_description: "sd",
              product_status: "sdd",
              image: "sdw3",
              seller_details: {
                data: {
                  attributes: {
                    activated: true,
                    email: "kskds",
                    first_name: "aas",
                    full_phone_number: "89890",
                  },
                },
              },
            },
          },
        },
      },
    ],
    invoice: "https://www.google.com",
  },
};

export const LoginData: Login = {
  meta: {
    token:
      "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NiwiZXhwIjoxNjc1OTU5MzI3LCJ0b2tlbl90eXBlIjoibG9naW4ifQ.tppduwSYufhs82lfPav7-7NukesKf8AhGTcPrbzr3eufMLpCDLGzI-_zEsK3ZGUFFg3p90G4TC7y3YXyU2LvTA",
    refresh_token:
      "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NiwiZXhwIjoxNzA3NDA4OTI3LCJ0b2tlbl90eXBlIjoicmVmcmVzaCJ9.rL5jofBVHEMjnNtxV7NteeCU9zZXS1o2__hH0KWXchZBLTVMF0rgVvys495NFV_oHzU1QZA4dBY-kWJqO-5sRQ",
    id: 6,
  },
};
