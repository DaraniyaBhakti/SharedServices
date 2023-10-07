import React from "react";

import { Box, Button, CircularProgress, Typography } from "@material-ui/core";

// Customizable Area Start
import { createTheme, ThemeProvider, styled } from "@material-ui/core/styles";
import GoalDetailController, { Props } from "./GoalDetailController.web";
import {
  calendarIcon,
  classIcon,
  clockIcon,
  goalIcon,
  presentationIcon,
  userIcon,
} from "../assets";
import { configJSON } from "../GoalManagementController.web";
import dayjs from "dayjs";
import ConfirmModalWeb from "../components/ConfirmModal/ConfirmModal.web";
import AlertDialogWeb from "../components/AlertDialog/AlertDialog.web";
import BackIconWeb from "../components/BackIcon/BackIcon.web";

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

const Header = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 24,
});

const HeaderTitle = styled(Typography)({
  color: "#826FFC",
  fontSize: 24,
  fontWeight: "bold",
});

const ItemLabel = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 16,
});

const ItemLabelLeft = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "50%",
});

const Label = styled(Typography)({
  marginLeft: 16,
  color: "#826FFC",
});

const Value = styled(Typography)({
  fontWeight: "bold",
});

const DescriptionBox = styled(Box)({
  marginTop: 16,
});

const DescriptionTitle = styled(Typography)({
  fontWeight: "bold",
});

const Description = styled(Typography)({
  marginTop: 16,
});

const Separator = styled(Box)({
  borderBottom: "1px solid black",
  opacity: 0.5,
  margin: "24px 24px",
});

const ButtonContainer = styled(Box)({
  margin: "24px",
});

const ButtonSection = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

// Customizable Area End

export default class GoalDetail extends GoalDetailController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    const {
      goal,
      isLoading,
      deleteModal,
      titleModal,
      contentModal,
      alertModal,
    } = this.state;
    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <BackIconWeb onClick={this.handleGoBack} />
        <Box sx={webStyle.mainWrapper}>
          {isLoading ? (
            <>
              <CircularProgress size={40} color={"inherit"} />
            </>
          ) : (
            <>
              <Header>
                <img alt={"Detail"} src={goalIcon} />
                <HeaderTitle>Goal Detail: {goal.name}</HeaderTitle>
              </Header>

              <Box>
                {[
                  {
                    iconWeb: clockIcon,
                    label: "Goal Created At:",
                    value: dayjs(goal.created_at).format(
                      configJSON.dateTimeFormat,
                    ),
                  },
                  {
                    iconWeb: userIcon,
                    label: "Goal Created By:",
                    value: goal.created_by,
                  },
                  {
                    iconWeb: presentationIcon,
                    label: "Target:",
                    value: goal.target,
                  },
                  {
                    iconWeb: classIcon,
                    label: "Rewards:",
                    value: goal.rewards,
                  },
                  {
                    iconWeb: calendarIcon,
                    label: "Goal Start & End Date:",
                    value: `${dayjs(goal.goal_start_date).format(
                      configJSON.dateFormat,
                    )} - ${dayjs(goal.goal_end_date).format(
                      configJSON.dateFormat,
                    )}`,
                  },
                  {
                    iconWeb: clockIcon,
                    label: "Goal Updated At:",
                    value: dayjs(goal.updated_at).format(
                      configJSON.dateTimeFormat,
                    ),
                  },
                  {
                    iconWeb: userIcon,
                    label: "Goal Updated By:",
                    value: goal.updated_by,
                  },
                  {
                    iconWeb: presentationIcon,
                    label: "Goal Status:",
                    value: goal.goal_status,
                  },
                ].map((item, index) => (
                  <ItemLabel key={index}>
                    <ItemLabelLeft>
                      <img alt={`icon-${index}`} src={item.iconWeb} />
                      <Label>{item.label}</Label>
                    </ItemLabelLeft>
                    <Value>{item.value}</Value>
                  </ItemLabel>
                ))}
              </Box>

              <Separator />

              <DescriptionBox>
                <DescriptionTitle>Description</DescriptionTitle>
                <Description>{goal.description}</Description>
              </DescriptionBox>

              <ButtonSection>
                <ButtonContainer>
                  <Button onClick={this.handleGoToUpdateScreen}>Update</Button>
                  <Button onClick={this.handleToggleDeleteModal}>Delete</Button>
                </ButtonContainer>
              </ButtonSection>

              <ConfirmModalWeb
                onToggleModal={this.handleToggleDeleteModal}
                isVisible={deleteModal}
                onConfirm={this.handleDeleteGoal}
                titleModal={`Do you want to remove this goal - ${goal.name}`}
              />

              <AlertDialogWeb
                title={titleModal}
                onClose={this.handleCloseAlert}
                isVisible={alertModal}
                content={contentModal}
              />
            </>
          )}
        </Box>
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
    padding: "30px",
    marginTop: 50,
  },
};
// Customizable Area End
