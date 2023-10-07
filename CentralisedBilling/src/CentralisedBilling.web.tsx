import React from "react";

import {
  Container,
  Box,
  Button,
  Typography,
  // Customizable Area Start
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { createTheme, ThemeProvider, styled } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import { OrderItems, Product } from "./types";
// Customizable Area End

import CentralisedBillingController, {
  Props,
} from "./CentralisedBillingController";

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

export default class CentralisedBilling extends CentralisedBillingController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <Box sx={webStyle.mainWrapper}>
            {this.state.ordersData.map((item: OrderItems) => {
              return (
                <div
                  data-test-id="container"
                  style={webStyle.cardContainer}
                  key={item.id}>
                  <div style={webStyle.orderContainer}>
                    <div style={webStyle.orderHeader}>
                      <Typography style={webStyle.txtTitle}>
                        OrderNo: #{item?.attributes?.order_number}
                      </Typography>
                      <Typography style={webStyle.txtTitle}>
                        Order Date :
                        {item?.attributes?.order_date?.substring(0, 10)}
                      </Typography>
                    </div>
                    {item?.attributes?.order_items.map(
                      (itemProduct: Product) => {
                        return (
                          <div
                            key={itemProduct?.product_details?.data.attributes.serial_number.toString()}
                            style={webStyle.productCon}>
                            <div style={webStyle.row}>
                              <div>
                                <img
                                  src={
                                    itemProduct?.product_details?.data
                                      .attributes.image
                                  }
                                  style={webStyle.img}
                                />
                              </div>
                              <div style={webStyle.M20}>
                                <div style={webStyle.row}>
                                  <Typography style={webStyle.txtTitle}>
                                    Product Name:{" "}
                                  </Typography>
                                  <Typography style={webStyle.txt}>
                                    {
                                      itemProduct?.product_details?.data
                                        .attributes.product_name
                                    }
                                  </Typography>
                                </div>
                                <div style={webStyle.row}>
                                  <Typography style={webStyle.txtTitle}>
                                    Serial Number:{" "}
                                  </Typography>
                                  <Typography style={webStyle.txt}>
                                    {
                                      itemProduct?.product_details?.data
                                        .attributes.serial_number
                                    }
                                  </Typography>
                                </div>

                                <div style={webStyle.row}>
                                  <Typography style={webStyle.txtTitle}>
                                    Price:{" "}
                                  </Typography>
                                  <Typography style={webStyle.txt}>
                                    $
                                    {
                                      itemProduct?.product_details?.data
                                        .attributes.price
                                    }
                                  </Typography>
                                </div>
                                <div style={webStyle.row}>
                                  <Typography style={webStyle.txtTitle}>
                                    Quantity:{" "}
                                  </Typography>
                                  <Typography style={webStyle.txt}>
                                    {
                                      itemProduct?.product_details?.data
                                        .attributes.available_quantity
                                    }
                                  </Typography>
                                </div>
                                <div style={webStyle.row}>
                                  <Typography style={webStyle.txtTitle}>
                                    Description:{" "}
                                  </Typography>
                                  <Typography style={webStyle.txt}>
                                    {
                                      itemProduct?.product_details?.data
                                        .attributes.product_description
                                    }
                                  </Typography>
                                </div>
                              </div>
                            </div>
                            <Typography
                              style={{
                                ...webStyle.txtTitle,
                                ...webStyle.colorTitle,
                              }}>
                              Seller Details
                            </Typography>

                            <div style={webStyle.row}>
                              <Typography style={webStyle.txtTitle}>
                                Name:{" "}
                              </Typography>
                              <Typography style={webStyle.txt}>
                                {
                                  itemProduct?.product_details?.data.attributes
                                    ?.seller_details.data?.attributes.first_name
                                }
                              </Typography>
                            </div>

                            <div style={webStyle.row}>
                              <Typography style={webStyle.txtTitle}>
                                Email:{" "}
                              </Typography>
                              <Typography style={webStyle.txt}>
                                {
                                  itemProduct?.product_details?.data.attributes
                                    ?.seller_details.data?.attributes.email
                                }
                              </Typography>
                            </div>

                            <div style={webStyle.row}>
                              <Typography style={webStyle.txtTitle}>
                                Number:{" "}
                              </Typography>
                              <Typography style={webStyle.txt}>
                                +
                                {
                                  itemProduct?.product_details?.data.attributes
                                    ?.seller_details.data?.attributes
                                    .full_phone_number
                                }
                              </Typography>
                            </div>
                            <div style={webStyle.line} />
                          </div>
                        );
                      },
                    )}
                    <Button
                      data-test-id="invoiceLink"
                      onClick={() => this.handleInvoiceClick(item)}
                      style={webStyle.invoiceCon}>
                      Download Invoice
                    </Button>
                  </div>
                </div>
              );
            })}
          </Box>
          <BottomPagination
            count={this.state.totalPageWeb}
            page={this.state.pageIndexWeb}
            onChange={this.handleGoToPage}
            shape="round"
          />
        </Container>
      </ThemeProvider>

      // Customizable Area End
    );
  }
}

// Customizable Area Start
const BottomPagination = styled(Pagination)({
  marginTop: 16,
  display: "flex",
  justifyContent: "center",
});

const webStyle = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    background: "#fff",
    width: "100%",
    height: "calc(100vh - 140px)",
    overflow: "auto",
  },
  cardContainer: {
    width: "100%",
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
  invoiceCon: {
    width: "100%",
    backgroundColor: "#2096F3",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    color: "white",
  },
  orderHeader: {
    display: "flex",
    flexDirection: "row" as const,
    justifyContent: "space-between",
    marginBottom: 5,
  },
  orderContainer: {
    width: "90%",
    minHeight: 100,
    backgroundColor: "#eee",
    margin: 10,
    padding: 10,
    paddingRight: 15,
    alignSelf: "center",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
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
  img: { width: 100, height: 100, borderRadius: "4px" },
  row: { display: "flex", flexDirection: "row" as const, alignItems: "center" },
  txt: { fontSize: 14 as number, textTransform: "capitalize" as "capitalize" },
  txtTitle: {
    fontSize: 14 as number,
    textTransform: "capitalize" as "capitalize",
    fontWeight: 600,
    marginRight: "10px",
  },
  colorTitle: {
    color: "#d75454",
    fontSize: "16px",
  },
};
// Customizable Area End
