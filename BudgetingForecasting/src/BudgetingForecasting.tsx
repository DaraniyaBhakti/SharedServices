import React from "react";

// Customizable Area Start
import { View, Text, StyleSheet, ScrollView } from "react-native";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start

// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import BudgetingForecastingController, {
  Props,
} from "./BudgetingForecastingController";

export default class BudgetingForecasting extends BudgetingForecastingController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start

    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    const { data } = this.state;

    const revenuePrice = data?.revenues;
    const expensesPrice = data?.expenses;

    const rowRevenueNumb =
      (revenuePrice?.length && Math.ceil(revenuePrice?.length / 3)) || 0;
    const rowExpenseNumb =
      (expensesPrice?.length && Math.ceil(expensesPrice?.length / 3)) || 0;

    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        {!!data && (
          <View testID="container">
            <View style={styles.totalView}>
              <View style={styles.totalViewItem}>
                <Text style={styles.totalViewHeader}>Total Revenue</Text>
                <Text style={[styles.totalViewText, { color: "green" }]}>
                  ${data?.total_revenues_amount}
                </Text>
              </View>
              <View style={styles.totalViewItem}>
                <View style={[styles.verticalDivider, { left: 0 }]} />
                <Text style={styles.totalViewHeader}>Total Expense</Text>
                <Text style={[styles.totalViewText, { color: "blue" }]}>
                  ${data?.total_expenses_amount}
                </Text>
                <View style={[styles.verticalDivider, { right: 0 }]} />
              </View>
              <View style={styles.totalViewItem}>
                <Text style={styles.totalViewHeader}>Total Budget</Text>
                <Text style={[styles.totalViewText, { color: "red" }]}>
                  ${data?.total_budget_amount}
                </Text>
              </View>
            </View>
            <View style={styles.revenueViewHeader}>
              <Text style={{ fontWeight: "bold" }}>Revenue</Text>
            </View>
            <View style={{ marginTop: 16 }}>
              {revenuePrice &&
                Array.from(Array(rowRevenueNumb)).map((item, index) => (
                  <View key={revenuePrice[3 * index]?.attributes?.name}>
                    <View style={styles.revenueViewBody}>
                      <View style={styles.totalRevenueViewItem}>
                        <Text style={styles.itemText}>
                          {revenuePrice[3 * index]?.attributes?.name}
                        </Text>
                        <Text style={styles.revenuePrice}>
                          {this.currencyType(
                            revenuePrice[3 * index]?.attributes.currency,
                          )}
                          {revenuePrice[3 * index]?.attributes?.amount}
                        </Text>
                      </View>
                      <View style={styles.totalRevenueViewItem}>
                        <View style={[styles.verticalDivider, { left: 0 }]} />
                        <Text style={styles.itemText}>
                          {revenuePrice[3 * index + 1]?.attributes?.name}
                        </Text>
                        {revenuePrice[3 * index + 1] && (
                          <Text style={styles.revenuePrice}>
                            {this.currencyType(
                              revenuePrice[3 * index + 1]?.attributes.currency,
                            )}
                            {revenuePrice[3 * index + 1]?.attributes?.amount}
                          </Text>
                        )}
                        <View style={[styles.verticalDivider, { right: 0 }]} />
                      </View>
                      <View style={styles.totalRevenueViewItem}>
                        <Text style={styles.itemText}>
                          {revenuePrice[3 * index + 2]?.attributes?.name}
                        </Text>
                        {revenuePrice[3 * index + 2] && (
                          <Text style={styles.revenuePrice}>
                            {this.currencyType(
                              revenuePrice[3 * index + 2]?.attributes.currency,
                            )}
                            {revenuePrice[3 * index + 2]?.attributes?.amount}
                          </Text>
                        )}
                      </View>
                    </View>
                    {index + 1 !== rowRevenueNumb && (
                      <View style={styles.horizontalDivider} />
                    )}
                  </View>
                ))}
            </View>
            <View style={styles.revenueViewHeader}>
              <Text style={{ fontWeight: "bold", marginTop: 16 }}>
                Expenses
              </Text>
            </View>
            <View style={{ marginTop: 16, marginBottom: 50 }}>
              {expensesPrice &&
                Array.from(Array(rowExpenseNumb)).map((_, index) => (
                  <View key={expensesPrice[3 * index + 1]?.attributes?.name}>
                    <View style={styles.revenueViewBody}>
                      <View style={styles.totalRevenueViewItem}>
                        <Text style={styles.itemText}>
                          {expensesPrice[3 * index]?.attributes?.name}
                        </Text>
                        <Text style={styles.expensesPrice}>
                          {this.currencyType(
                            expensesPrice[3 * index]?.attributes.currency,
                          )}

                          {expensesPrice[3 * index]?.attributes?.amount}
                        </Text>
                      </View>
                      <View style={styles.totalRevenueViewItem}>
                        <View style={[styles.verticalDivider, { left: 0 }]} />
                        <Text style={styles.itemText}>
                          {expensesPrice[3 * index + 1]?.attributes?.name}
                        </Text>
                        {expensesPrice[3 * index + 1] && (
                          <Text style={styles.expensesPrice}>
                            {this.currencyType(
                              expensesPrice[3 * index + 1]?.attributes.currency,
                            )}

                            {expensesPrice[3 * index + 1]?.attributes?.amount}
                          </Text>
                        )}
                        <View style={[styles.verticalDivider, { right: 0 }]} />
                      </View>
                      <View style={styles.totalRevenueViewItem}>
                        <Text style={styles.itemText}>
                          {expensesPrice[3 * index + 2]?.attributes?.name}
                        </Text>
                        {expensesPrice[3 * index + 2] && (
                          <Text style={styles.expensesPrice}>
                            {this.currencyType(
                              expensesPrice[3 * index + 2]?.attributes.currency,
                            )}

                            {expensesPrice[3 * index + 2]?.attributes?.amount}
                          </Text>
                        )}
                      </View>
                    </View>
                    {index + 1 !== rowExpenseNumb && (
                      <View style={styles.horizontalDivider} />
                    )}
                  </View>
                ))}
            </View>
          </View>
        )}
      </ScrollView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  totalView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalViewHeader: {
    marginBottom: 8,
    color: "#404040",
    fontWeight: "600",
  },
  totalViewText: {
    fontWeight: "bold",
  },
  totalViewItem: {
    width: "33%",
    alignItems: "center",
  },
  totalRevenueViewItem: {
    width: "33%",
    alignItems: "center",
  },
  verticalDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#e5e5e5",
    position: "absolute",
  },
  revenueViewHeader: {
    backgroundColor: "#f5f5f5",
    paddingLeft: 16,
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#dadada",
    marginTop: 16,
  },
  horizontalDivider: {
    width: "100%",
    height: 1,
    backgroundColor: "#e5e5e5",
    marginBottom: 16,
  },
  revenueViewBody: {
    flexDirection: "row",
    marginBottom: 16,
  },
  itemText: {
    color: "darkgray",
    marginBottom: 4,
  },
  revenuePrice: {
    color: "green",
    fontWeight: "bold",
  },
  expensesPrice: {
    color: "red",
    fontWeight: "bold",
  },
});
// Customizable Area End
