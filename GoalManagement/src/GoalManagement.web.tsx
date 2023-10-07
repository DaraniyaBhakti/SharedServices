import React from "react";

import { Box, Typography } from "@material-ui/core";

// Customizable Area Start
import { createTheme, styled, ThemeProvider } from "@material-ui/core/styles";
import GoalManagementController, {
  Props,
} from "./GoalManagementController.web";
import {
  arrowFullRightIcon,
  background,
  createGoalIcon,
  retrieveGoalIcon,
} from "./assets";

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

const UpperBox = styled(Box)({
  height: "50%",
  display: "flex",
  flexDirection: "column",
});

const LowerBox = styled(Box)({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ButtonContainerBox = styled(Box)({
  width: "50%",
  display: "flex",
  flexDirection: "column",
});

const ButtonBox = styled(Box)({
  backgroundColor: "#ffffff",
  padding: 24,
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "24px 0",
});

const Title = styled(Typography)({
  fontSize: 60,
  fontWeight: "bold",
  margin: "0px 24px",
  color: "#ffffff",
});

const Background = styled(Box)({
  backgroundImage: "url(" + background + ")",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  flex: 1,
});

// Customizable Area End

export default class GoalManagement extends GoalManagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    const { isLoading } = this.state;

    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <Background sx={webStyle.mainWrapper}>
          <UpperBox>
            <Title>Hello,</Title>
            <Title>Welcome</Title>
          </UpperBox>
          <LowerBox>
            <>
              {isLoading ? (
                <Typography>Getting Token....</Typography>
              ) : (
                <ButtonContainerBox>
                  {[
                    {
                      title: "Create Goal",
                      onClick: this.handleGoToGoalCreateWeb,
                      icon: createGoalIcon,
                    },
                    {
                      title: "Retrieve Goal",
                      onClick: this.handleGoToGoalRetrieveWeb,
                      icon: retrieveGoalIcon,
                    },
                  ].map((item, index) => (
                    <ButtonBox
                      component={"button"}
                      key={index}
                      onClick={item.onClick}>
                      <img alt={item.title} src={item.icon} />
                      <Typography>{item.title}</Typography>
                      <img alt={item.title} src={arrowFullRightIcon} />
                    </ButtonBox>
                  ))}
                </ButtonContainerBox>
              )}
            </>
          </LowerBox>
        </Background>
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
    paddingBottom: "30px",
  },
};
// Customizable Area End
