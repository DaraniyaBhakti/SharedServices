import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import OrdersData from "./Components/OrdersData";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start

// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import CentralisedBillingController, {
  Props,
} from "./CentralisedBillingController";

export default class CentralisedBilling extends CentralisedBillingController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  // Customizable Area End

  render() {
    // Customizable Area Start
    const { ordersData, isLoading } = this.state;
    // Merge Engine - render - Start
    return (
      <View testID="container">
        <FlatList
          testID="flatListTest"
          data={ordersData}
          refreshing={isLoading}
          onRefresh={this.getOrdersList}
          renderItem={({ item }) => (
            <View>
              <View style={styles.orderContainer} key={item?.id}>
                <View style={styles.orderHeader}>
                  <Text>OrderNo: #{item?.attributes?.order_number}</Text>
                  <Text>
                    Order Date :{item?.attributes?.order_date?.substring(0, 10)}
                  </Text>
                </View>
                <OrdersData data={item} />
                <TouchableOpacity
                  testID="invoiceLink"
                  onPress={() => this.handleOpenInvoice(item)}
                  style={styles.invoiceCon}>
                  <Text style={styles.invoiceTxt}>Download Invoice</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id!.toString()}
        />
      </View>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  invoiceTxt: { color: "#fff" },
  invoiceCon: {
    width: "100%",
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  orderContainer: {
    width: "90%",
    minHeight: 180,
    backgroundColor: "#eee",
    margin: 10,
    padding: 10,
    paddingRight: 15,
    alignSelf: "center",
    borderRadius: 8,
  },
  container: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
    paddingBottom: 100,
  },
});
// Customizable Area End
