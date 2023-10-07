import React from "react";

import {
  Container,
  Box,
  // Customizable Area Start
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import "../assets/css/BudgetingForecasting.css";

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
    const { data } = this.state;

    const revenuePrice = data?.revenues;
    const expensesPrice = data?.expenses;

    const rowRevenueNumb =
      (revenuePrice?.length && Math.ceil(revenuePrice.length / 3)) || 0;
    const rowExpenseNumb =
      (expensesPrice?.length && Math.ceil(expensesPrice.length / 3)) || 0;

    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <Container maxWidth={"sm"}>
          <Box sx={webStyle.mainWrapper}>
            <div id="container">
              <div className="totalView firstView">
                <div className="totalViewItem">
                  <label className="headerText grayText">Total Revenue</label>
                  <label className="valueText redText">
                    ${data?.total_revenues_amount}
                  </label>
                </div>
                <div className="totalViewItem">
                  <label className="headerText grayText">Total Expence</label>
                  <label className="valueText greenText">
                    ${data?.total_expenses_amount}
                  </label>
                </div>
                <div className="totalViewItem">
                  <label className="headerText grayText">Total Budget</label>
                  <label className="valueText blueText">
                    ${data?.total_budget_amount}
                  </label>
                </div>
              </div>
              <div className="revenueViewHeader">
                <label className="headerText">Revenue</label>
              </div>
              {revenuePrice &&
                Array.from(Array(rowRevenueNumb)).map((_, index) => (
                  <div key={revenuePrice[3 * index]?.attributes?.name}>
                    <div className="totalView">
                      <div className="totalViewItem">
                        <label className="itemHeaderText">
                          {revenuePrice[3 * index]?.attributes?.name}
                        </label>
                        <label className="valueText greenText">
                          {this.currencyType(
                            revenuePrice[3 * index]?.attributes.currency,
                          )}
                          {revenuePrice[3 * index]?.attributes?.amount}
                        </label>
                      </div>
                      <div className="totalViewItem">
                        <label className="itemHeaderText">
                          {revenuePrice[3 * index + 1]?.attributes?.name}
                        </label>
                        {revenuePrice[3 * index + 1] && (
                          <label className="valueText greenText">
                            {this.currencyType(
                              revenuePrice[3 * index + 1]?.attributes.currency,
                            )}
                            {revenuePrice[3 * index + 1]?.attributes?.amount}
                          </label>
                        )}
                      </div>
                      <div className="totalViewItem">
                        <label className="itemHeaderText">
                          {revenuePrice[3 * index + 2]?.attributes?.name}
                        </label>
                        {revenuePrice[3 * index + 2] && (
                          <label className="valueText greenText">
                            {this.currencyType(
                              revenuePrice[3 * index + 2]?.attributes.currency,
                            )}
                            {revenuePrice[3 * index + 2]?.attributes?.amount}
                          </label>
                        )}
                      </div>
                    </div>
                    {index + 1 !== rowRevenueNumb && (
                      <div style={webStyle.divider} />
                    )}
                  </div>
                ))}
              <div className="revenueViewHeader">
                <label className="headerText">Expences</label>
              </div>
              {expensesPrice &&
                Array.from(Array(rowExpenseNumb)).map((item, index) => (
                  <div key={expensesPrice[3 * index]?.attributes?.name}>
                    <div className="totalView">
                      <div className="totalViewItem">
                        <label className="itemHeaderText">
                          {expensesPrice[3 * index]?.attributes?.name}
                        </label>
                        <label className="valueText redText">
                          {this.currencyType(
                            expensesPrice[3 * index]?.attributes.currency,
                          )}
                          {expensesPrice[3 * index]?.attributes?.amount}
                        </label>
                      </div>
                      <div className="totalViewItem">
                        <label className="itemHeaderText">
                          {expensesPrice[3 * index + 1]?.attributes?.name}
                        </label>
                        {expensesPrice[3 * index + 1] && (
                          <label className="valueText redText">
                            {this.currencyType(
                              expensesPrice[3 * index + 1]?.attributes.currency,
                            )}
                            {expensesPrice[3 * index + 1]?.attributes?.amount}
                          </label>
                        )}
                      </div>
                      <div className="totalViewItem">
                        <label className="itemHeaderText">
                          {expensesPrice[3 * index + 2]?.attributes?.name}
                        </label>
                        {expensesPrice[3 * index + 2] && (
                          <label className="valueText redText">
                            {this.currencyType(
                              expensesPrice[3 * index + 2]?.attributes.currency,
                            )}
                            {expensesPrice[3 * index + 2]?.attributes?.amount}
                          </label>
                        )}
                      </div>
                    </div>
                    {index + 1 !== rowExpenseNumb && (
                      <div style={webStyle.divider} />
                    )}
                  </div>
                ))}
            </div>
          </Box>
        </Container>
      </ThemeProvider>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const webStyle = {
  mainWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    background: "#fff",
  },
  inputStyle: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.6)",
    width: "100%",
    height: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttonStyle: {
    width: "100%",
    height: "45px",
    marginTop: "40px",
    border: "none",
    backgroundColor: "rgb(98, 0, 238)",
  },
  totalView: {
    display: "flex",
    flexDirection: "row",
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "#eeeeee",
    marginTop: 20,
    marginBottom: 20,
  },
};
// Customizable Area End
