import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BarChart } from "react-native-chart-kit";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start

// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import PayrollIntegration2Controller, {
  Props,
} from "./PayrollIntegration2Controller";

export default class PayrollIntegration2 extends PayrollIntegration2Controller {
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

    const {
      selectExpense,
      filteredData,
      isOpenStartDatePicker,
      isOpenEndDatePicker,
      startDate,
      endDate,
      shownStartDate,
      shownEndDate,
      filterDataModalState,
      chartModalState,
      expenseLowValue,
      expenseHighValue,
      incomeLowValue,
      incomeHighValue,
    } = this.state;

    return (
      <>
        <View style={styles.firstView}>
          <TouchableOpacity
            testID="setChartModalView1"
            onPress={() => this.setChartModalView(true)}
            style={styles.buttonBorderView}>
            <Text>Show Cart</Text>
          </TouchableOpacity>
          <View style={styles.firstPageView}>
            <TouchableOpacity
              testID="selected_view"
              style={styles.headerText}
              onPress={() => {
                this.setSelectedView(false);
              }}>
              <Text
                style={
                  !selectExpense
                    ? styles.headerSelectedText
                    : styles.headerUnselectedText
                }>
                Income
              </Text>
              {!selectExpense && <View style={styles.selectedDivider} />}
            </TouchableOpacity>
            <TouchableOpacity
              testID="selected_view2"
              style={styles.selectedViewPress}
              onPress={() => {
                this.setSelectedView(true);
              }}>
              <Text
                style={
                  selectExpense
                    ? styles.headerSelectedText
                    : styles.headerUnselectedText
                }>
                Expense
              </Text>
              {selectExpense && <View style={styles.selectedDivider} />}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            testID="filter_modal"
            onPress={() => {
              this.setFilterModalView(true);
            }}
            style={styles.buttonBorderView}>
            <Text>Filter</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollViewPadding}>
          {filteredData &&
            filteredData.map((item, index) => (
              <View key={item.id}>
                <View style={styles.isSelectedView}>
                  <View style={styles.firstPageView}>
                    <Text>
                      {!selectExpense
                        ? `Income ${index + 1}`
                        : `Expense ${index + 1}`}
                    </Text>
                    <Text style={styles.showingPadding}>-</Text>
                    <Text>{item.category} </Text>
                  </View>

                  <Text style={styles.boldFontWeight}>
                    {!selectExpense ? item.income : item.expense}$
                  </Text>
                </View>
                <View style={styles.horizontalDivider} />
              </View>
            ))}
        </ScrollView>
        <View style={styles.csvView}>
          <TouchableOpacity
            testID="Export_Csv"
            onPress={() => this.getExportPayrollCsvData()}
            style={styles.buttonBorderView}>
            <Text>Export CSV</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="Import_Csv"
            onPress={() => this.importCsvFile()}
            style={styles.buttonBorderView}>
            <Text>Import CSV</Text>
          </TouchableOpacity>
        </View>
        <Modal
          visible={filterDataModalState}
          presentationStyle={"fullScreen"}
          animationType={"slide"}>
          <SafeAreaView style={styles.filterTitleText}>
            <Text style={styles.filterModalHeader}>FILTER PAYROLL</Text>
            <View style={styles.filterFirstView}>
              <TouchableOpacity
                testID="openDatePicker1"
                onPress={this.openStartDatePicker}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Start Date"
                  editable={false}
                  value={shownStartDate}
                />
              </TouchableOpacity>
              {isOpenStartDatePicker && (
                <View>
                  <DateTimePicker
                    mode={"date"}
                    is24Hour={true}
                    value={startDate}
                    onChange={this.changeStartDate}
                  />
                </View>
              )}
              <TouchableOpacity
                testID="openDatePicker2"
                onPress={this.openEndDatePicker}>
                <TextInput
                  style={styles.textInput}
                  placeholder="End Date"
                  editable={false}
                  value={shownEndDate}
                />
              </TouchableOpacity>
              {isOpenEndDatePicker && (
                <View>
                  <DateTimePicker
                    mode={"date"}
                    is24Hour={true}
                    value={endDate}
                    onChange={this.changeEndDate}
                  />
                </View>
              )}
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                testID="incomeLowVal"
                style={styles.textInput}
                placeholder="Income Low Value"
                value={incomeLowValue}
                keyboardType="numeric"
                onChangeText={(value) => {
                  this.changeIncomeLowValue(value);
                }}
              />
              <TextInput
                testID="incomeHighVal"
                style={styles.textInput}
                placeholder="Income High Value"
                value={incomeHighValue}
                keyboardType="numeric"
                onChangeText={(value) => {
                  this.changeIncomeHighValue(value);
                }}
              />
            </View>
            <View style={styles.filterFirstView}>
              <TextInput
                testID="ExpenseLowVal"
                style={styles.textInput}
                placeholder="Expense Low Value"
                value={expenseLowValue}
                keyboardType="numeric"
                onChangeText={(value) => {
                  this.changeExpenseLowValue(value);
                }}
              />
              <TextInput
                testID="expenseHighVal"
                style={styles.textInput}
                placeholder="Expense High Value"
                value={expenseHighValue}
                keyboardType="numeric"
                onChangeText={(value) => {
                  this.changeExpenseHighValue(value);
                }}
              />
            </View>
            <View style={styles.filterCoupleButtonView}>
              <TouchableOpacity
                testID="clear_filter"
                onPress={() => this.clearFilterData()}
                style={styles.filterModalButton}>
                <Text style={styles.whiteColor}>CLEAR</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="filter_button"
                onPress={() => this.filterNewData()}
                style={styles.filterModalButton}>
                <Text style={styles.whiteColor}>FILTER</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
        <Modal
          visible={chartModalState}
          presentationStyle={"fullScreen"}
          animationType={"slide"}>
          <ScrollView style={styles.fullFlex}>
            <Text style={styles.barText}>Income Bar</Text>
            <ScrollView horizontal>
              <View style={styles.barChartView}>
                <BarChart
                  data={this.state.incomeBarData}
                  width={650}
                  height={250}
                  yAxisLabel=""
                  yAxisSuffix=""
                  chartConfig={{
                    backgroundColor: "green",
                    backgroundGradientFrom: "white",
                    backgroundGradientTo: "white",
                    decimalPlaces: 0,
                    color: () => `green`,
                    labelColor: () => `black`,
                  }}
                />
              </View>
            </ScrollView>
            <Text style={styles.barText}>Expense Bar</Text>
            <ScrollView horizontal>
              <View style={styles.barChartView}>
                <BarChart
                  data={this.state.expenseBarData}
                  width={650}
                  height={250}
                  yAxisLabel=""
                  yAxisSuffix=""
                  chartConfig={{
                    backgroundColor: "red",
                    backgroundGradientFrom: "white",
                    backgroundGradientTo: "white",
                    decimalPlaces: 0,
                    color: () => `red`,
                    labelColor: () => `black`,
                  }}
                />
              </View>
            </ScrollView>
          </ScrollView>
          <TouchableOpacity
            testID="setChartModalView2"
            onPress={() => this.setChartModalView(false)}>
            <Text style={styles.closeTextStyle}>Close Modal</Text>
          </TouchableOpacity>
        </Modal>
      </>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  firstView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  selectedDivider: {
    backgroundColor: "green",
    width: "100%",
    height: 2,
    alignSelf: "center",
  },
  csvView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 24,
    width: "100%",
  },
  buttonBorderView: {
    borderWidth: 1,
    padding: 4,
    borderColor: "black",
    borderRadius: 4,
    backgroundColor: "white",
  },
  headerSelectedText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  headerUnselectedText: {
    fontWeight: "400",
    fontSize: 18,
  },
  horizontalDivider: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    marginBottom: 16,
    marginTop: 8,
  },
  filterModalButton: {
    backgroundColor: "#2356D0",
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  textInput: {
    height: 40,
    marginHorizontal: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 8,
  },
  filterCoupleButtonView: {
    position: "absolute",
    alignSelf: "center",
    bottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 24,
  },
  filterModalHeader: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  inputContainer: {
    padding: 32,
    paddingVertical: 16,
    marginVertical: 16,
  },
  barChartView: {
    marginLeft: 2,
    paddingHorizontal: 16,
  },

  closeTextStyle: {
    alignSelf: "flex-end",
    marginRight: 16,
    marginBottom: 16,
    fontWeight: "bold",
  },
  barText: {
    alignSelf: "center",
    marginVertical: 8,
    fontWeight: "bold",
  },
  fullFlex: {
    flex: 1,
  },
  isSelectedView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scrollViewPadding: {
    padding: 32,
  },
  selectedViewPress: {
    marginLeft: 10,
  },
  showingPadding: {
    marginHorizontal: 8,
  },
  boldFontWeight: {
    fontWeight: "bold",
  },
  filterTitleText: {
    flex: 1,
    paddingTop: 16,
  },
  filterFirstView: {
    paddingHorizontal: 32,
  },
  firstPageView: {
    flexDirection: "row",
  },
  headerText: {
    marginRight: 10,
  },
  whiteColor: {
    color: "white",
  },
});
// Customizable Area End
