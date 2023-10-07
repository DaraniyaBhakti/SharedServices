import * as React from "react";
import { PropsWithChildren, ReactElement } from "react";
import { Text, Image, StyleSheet, View } from "react-native";
import { OrderItems } from "../types";

export function OrdersData(
  props: PropsWithChildren<OrdersDataProps>,
): ReactElement {
  return (
    <>
      {props.data.attributes?.order_items.map((itemProduct) => {
        return (
          <View
            key={itemProduct?.product_details?.data.attributes.serial_number.toString()}
            style={styles.productCon}>
            <View style={styles.row}>
              <View>
                <Image
                  source={{
                    uri: itemProduct?.product_details?.data.attributes.image,
                  }}
                  style={styles.img}
                  resizeMode="stretch"
                />
              </View>
              <View style={styles.M20}>
                <View style={styles.row}>
                  <Text style={styles.txt}>Product Name: </Text>
                  <Text style={styles.txt}>
                    {itemProduct?.product_details?.data.attributes.product_name}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.txt}>Serial Number: </Text>
                  <Text style={styles.txt}>
                    {
                      itemProduct?.product_details?.data.attributes
                        .serial_number
                    }
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.txt}>Price: </Text>
                  <Text style={styles.txt}>
                    ${itemProduct?.product_details?.data.attributes.price}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.txt}>Quantity: </Text>
                  <Text style={styles.txt}>
                    {
                      itemProduct?.product_details?.data.attributes
                        .available_quantity
                    }
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.txt}>Description: </Text>
                  <Text style={styles.txt} numberOfLines={10}>
                    {
                      itemProduct?.product_details?.data.attributes
                        .product_description
                    }
                  </Text>
                </View>
              </View>
            </View>
            <Text style={styles.txt}>Seller Details</Text>

            <View style={styles.row}>
              <Text style={styles.txt}>Name: </Text>
              <Text style={styles.txt} numberOfLines={10}>
                {
                  itemProduct?.product_details?.data.attributes?.seller_details
                    .data?.attributes.first_name
                }
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.txt}>Email: </Text>
              <Text style={styles.txt} numberOfLines={10}>
                {
                  itemProduct?.product_details?.data.attributes?.seller_details
                    .data?.attributes.email
                }
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.txt}>Number: </Text>
              <Text style={styles.txt} numberOfLines={10}>
                +
                {
                  itemProduct?.product_details?.data.attributes?.seller_details
                    .data?.attributes.full_phone_number
                }
              </Text>
            </View>
            <View style={styles.line} />
          </View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  line: {
    width: "100%",
    height: 2,
    backgroundColor: "#000",
    marginTop: 10,
    marginBottom: 10,
  },
  loader: { flex: 1, width: "100%", height: "100%", marginTop: "40%" },
  productCon: {
    marginBottom: 10,
  },
  M20: { marginLeft: 20 },
  img: { width: 100, height: 100 },

  row: { flexDirection: "row" },
  txt: { fontSize: 16, textTransform: "capitalize" },
});

export interface OrdersDataProps {
  data: OrderItems;
}

OrdersData.defaultProps = {
  //
};

export default OrdersData;
