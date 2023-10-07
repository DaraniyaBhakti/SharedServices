import React from "react";

import {
  Container,
  Dialog,
  Typography,
  Box,
  // Customizable Area Start
  // Customizable Area End
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { createTheme, styled, ThemeProvider } from "@material-ui/core/styles";

import MomentUtils from "@date-io/moment";
import { Chart } from "react-google-charts";

import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";

// Customizable Area Start

// Customizable Area End

import PayrollIntegration2Controller, {
  Props,
} from "./PayrollIntegration2Controller.web";
import moment from "moment";

export default class PayrollIntegration2 extends PayrollIntegration2Controller {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth={"sm"}>
          <FirstView>
            <Button
              testID="setChartWebModalView1"
              title="Show Chart"
              onPress={() => this.setWebChartModalView(true)}
            />
            <View style={styles.flexRow}>
              <TouchableOpacity
                testID="select_which"
                style={styles.right10}
                onPress={() => {
                  this.setSelectedWebView(false);
                }}>
                {!this.state.selectExpenseWeb ? (
                  <HeaderSelectedText>Income</HeaderSelectedText>
                ) : (
                  <HeaderUnselectedText>Income</HeaderUnselectedText>
                )}
                {!this.state.selectExpenseWeb && <SelectedDivider />}
              </TouchableOpacity>
              <TouchableOpacity
                testID="select_which2"
                style={styles.left10}
                onPress={() => {
                  this.setSelectedWebView(true);
                }}>
                {this.state.selectExpenseWeb ? (
                  <HeaderSelectedText>Expense</HeaderSelectedText>
                ) : (
                  <HeaderUnselectedText>Expense</HeaderUnselectedText>
                )}
                {this.state.selectExpenseWeb && (
                  <View style={styles.selectedDivider} />
                )}
              </TouchableOpacity>
            </View>
            <Button
              testID="filter_modal_web"
              title="Filter"
              onPress={() => {
                this.setFilterWebModalView(true);
              }}
            />
          </FirstView>
          <View style={styles.padding32}>
            {this.state.filteredDataWeb.map((item, index) => (
              <View key={item.id}>
                <View style={styles.filteredDataView}>
                  <View style={styles.flexRow}>
                    <Typography>
                      {!this.state.selectExpenseWeb
                        ? `Income ${index + 1}`
                        : `Expense ${index + 1}`}
                    </Typography>
                    <Typography>-</Typography>
                    <Typography>{item.category}</Typography>
                  </View>
                  <Typography>
                    {!this.state.selectExpenseWeb ? item.income : item.expense}$
                  </Typography>
                </View>
                <View style={styles.horizontalDivider} />
              </View>
            ))}
          </View>
          <View style={styles.csvView}>
            <Button
              testID="Export_Csv_Web"
              title="Export CSV"
              onPress={() => this.getExportPayrollCsvData()}
            />
            <ImportCsvView>
              <Typography>Import Csv</Typography>
              <input
                type={"file"}
                id="csvFileInput"
                accept={".csv"}
                onChange={(event) =>
                  this.handleFileUpload((event.target.files as FileList)[0])
                }
              />
            </ImportCsvView>
          </View>
          <Dialog open={this.state.chartModalStateWeb}>
            <DialogView>
              <Chart
                chartType="BarChart"
                width="100%"
                height="400px"
                data={this.state.chartArrayWeb}
              />
              <Button
                testID="setChartWebModalView2"
                title="Close Modal"
                onPress={() => this.setWebChartModalView(false)}
              />
            </DialogView>
          </Dialog>
          <Dialog open={this.state.filterDataModalStateWeb}>
            <View style={styles.filterContainer}>
              <FilterModalTitle>FILTER PAYROLL</FilterModalTitle>
              <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                <SelectDateTitle>Select Start Date</SelectDateTitle>
                <KeyboardDatePicker
                  variant="inline"
                  format="dd/mm/yyyy"
                  margin="normal"
                  animateYearScrolling
                  inputVariant="outlined"
                  id="date-picker-inline"
                  value={this.state.startDateWeb}
                  onChange={(value) => this.webChangeStartDate(value)}
                  labelFunc={(string: string) => {
                    return moment(string).format("LL");
                  }}
                />
                <SelectDateTitle>Select End Date</SelectDateTitle>
                <KeyboardDatePicker
                  variant="inline"
                  format="dd/mm/yyyy"
                  margin="normal"
                  animateYearScrolling
                  inputVariant="outlined"
                  id="date-picker-inline1"
                  value={this.state.endDateWeb}
                  onChange={(value) => this.webChangeEndDate(value)}
                  labelFunc={(string: string) => {
                    return moment(string).format("LL");
                  }}
                />
              </MuiPickersUtilsProvider>
              <BetweenInput>
                <TextInput
                  testID="incomeLowValWeb"
                  style={styles.webTextInput}
                  placeholder="Income Low Value"
                  value={this.state.incomeLowValueWeb}
                  keyboardType="numeric"
                  onChangeText={(value) => {
                    this.webChangeIncomeLowValue(value);
                  }}
                />
                <TextInput
                  testID="incomeHighValWeb"
                  style={styles.webTextInput}
                  placeholder="Income High Value"
                  value={this.state.incomeHighValueWeb}
                  keyboardType="numeric"
                  onChangeText={(value) => {
                    this.webChangeIncomeHighValue(value);
                  }}
                />
              </BetweenInput>
              <Box sx={webStyle.textInputWrapper}>
                <TextInput
                  testID="ExpenseLowValWeb"
                  style={styles.webTextInput}
                  placeholder="Expense Low Value"
                  value={this.state.expenseLowValueWeb}
                  keyboardType="numeric"
                  onChangeText={(value) => {
                    this.webChangeExpenseLowValue(value);
                  }}
                />
                <TextInput
                  testID="expenseHighValWeb"
                  style={styles.webTextInput}
                  placeholder="Expense High Value"
                  value={this.state.expenseHighValueWeb}
                  keyboardType="numeric"
                  onChangeText={(value) => {
                    this.webChangeExpenseHighValue(value);
                  }}
                />
              </Box>
              <View style={styles.filterCoupleButtonView}>
                <Button
                  testID="clear_filter_web"
                  title="CLEAR"
                  onPress={() => this.webClearFilterData()}
                />
                <Button
                  testID="filter_button_web"
                  title="FILTER"
                  onPress={() => this.webFilterNewData()}
                />
              </View>
            </View>
          </Dialog>
        </Container>
      </ThemeProvider>
    );
  }
}

// Customizable Area Start
const webStyle = {
  textInputWrapper: {
    display: "flex",
    flexDirection: "row",
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#fff",
    },
  },
  typography: {
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      margin: "20px 0px",
    },
  },
});

const FilterModalTitle = styled(Typography)({
  alignSelf: "center",
  fontWeight: "bold",
  fontSize: 16,
});

const SelectDateTitle = styled(Typography)({
  fontWeight: "normal",
  marginLeft: 8,
  fontSize: 14,
  color: "gray",
});
const HeaderSelectedText = styled(Typography)({
  fontWeight: "bold",
  fontSize: 18,
});
const HeaderUnselectedText = styled(Typography)({
  fontWeight: "normal",
  fontSize: 18,
});

const DialogView = styled(Box)({
  width: 800,
  height: 800,
  padding: 64,
  alignItems: "center",
  justifyContent: "center",
});

const SelectedDivider = styled(Box)({
  backgroundColor: "green",
  width: "100%",
  height: 2,
  alignSelf: "center",
});

const FirstView = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: " 8px 20px",
});

const ImportCsvView = styled(Box)({
  alignItems: "center",
});

// paddingVertical: 16,
// marginVertical: 16,

const BetweenInput = styled(Box)({
  marginTop: 16,
  marginBottom: 16,
  paddingBottom: 16,
  paddingTop: 16,
});
const styles = StyleSheet.create({
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
    bottom: 24,
    width: "100%",
  },
  horizontalDivider: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    marginBottom: 16,
    marginTop: 8,
  },

  webTextInput: {
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
  filterDateTitle: {
    fontSize: 14,
    color: "gray",
    marginTop: 16,
  },
  filterContainer: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 64,
    paddingHorizontal: 64,
  },
  left10: {
    marginLeft: 10,
    backgroundColor: "white",
  },
  right10: {
    marginRight: 10,
  },
  flexRow: {
    flexDirection: "row",
  },
  padding32: {
    padding: 32,
  },
  filteredDataView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
// Customizable Area End
