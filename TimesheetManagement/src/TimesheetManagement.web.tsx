import React from "react";

import {
  Container,
  Box,
  Input,
  Button,
  InputLabel,
  Typography,
  InputAdornment,
  IconButton,
  // Customizable Area Start
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";

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

import TimesheetManagementController, {
  Props,
  configJSON,
} from "./TimesheetManagementController";

export default class TimesheetManagement extends TimesheetManagementController {
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
        <Container maxWidth={"sm"}>
          <Box sx={webStyle.mainWrapper}>
            <Typography variant="h6">{configJSON.labelTitleText}</Typography>
            <Typography variant="subtitle1" component="div">
              {configJSON.labelBodyText}
            </Typography>
            <Box sx={webStyle.inputStyle}>
              <InputLabel id="service-shop-name">
                This is the received value:{this.state.txtSavedValue}{" "}
              </InputLabel>
              <Input
                data-test-id={"txtInput"}
                type={this.state.enableField ? "password" : "text"}
                placeholder={configJSON.txtInputPlaceholder}
                fullWidth={true}
                disableUnderline={true}
                {...this.txtInputWebProps}
                {...this.txtInputProps}
                {...this.setEnableField}
                value={this.state.txtInputValue}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={this.setEnableField}
                      edge="end">
                      {this.state.enableField ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Box>
            <Box
              data-test-id="btnAddExample"
              {...this.btnExampleProps}
              component="button"
              sx={webStyle.buttonStyle}>
              <Button
                data-test-id="btnAdd"
                color={"primary"}
                {...this.btnShowHideProps}>
                {configJSON.btnExampleTitle}
              </Button>
            </Box>
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
    fontFamily: "Roboto-Medium",
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
};
// Customizable Area End
