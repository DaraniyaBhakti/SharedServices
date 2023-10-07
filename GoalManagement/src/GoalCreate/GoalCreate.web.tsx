import React from "react";

import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

// Customizable Area Start
import { createTheme, styled, ThemeProvider } from "@material-ui/core/styles";
import GoalCreateController, { Props } from "./GoalCreateController.web";
import { Formik } from "formik";
import InputComponent from "../components/InputComponent/InputComponent.web";
import { goalStatusList, goalStatusObject } from "../constants";
import { GoalStatusKey, GoalStatusName } from "../types";
import ConfirmModalWeb from "../components/ConfirmModal/ConfirmModal.web";
import dayjs from "dayjs";
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

const ErrorTypo = styled(Typography)({
  color: "red",
  marginTop: 8,
});

// Customizable Area End

export default class GoalCreate extends GoalCreateController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    const {
      goal,
      fetching,
      deleteModal,
      titleModal,
      contentModal,
      alertModal,
    } = this.state;

    const {
      name,
      description,
      target,
      goal_start_date,
      goal_end_date,
      rewards,
      goal_status,
      id,
    } = goal;

    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <BackIconWeb onClick={this.handleGoBack} />
        <Container sx={webStyle.mainWrapper} data-test-id={"containerId"}>
          {!fetching && (
            <>
              <Box>
                <Title>
                  {this.initialGoalId ? "Update Goal" : "Create Goal"}
                </Title>
              </Box>
              <Formik
                initialValues={{
                  name: name as string,
                  description: description as string,
                  target: target as string,
                  goalStartDate: goal_start_date as Date,
                  goalEndDate: goal_end_date as Date,
                  rewards: rewards as string,
                  goalStatus: goal_status as GoalStatusKey,
                }}
                data-test-id={"formikTest"}
                onSubmit={this.handleSubmitWeb}
                validationSchema={
                  this.initialGoalId
                    ? this.goalUpdateSchema
                    : this.goalCreateSchema
                }>
                {({
                  handleChange,
                  handleBlur,
                  submitForm,
                  errors,
                  values,
                  touched,
                  setFieldValue,
                }) => (
                  <>
                    <FormItem>
                      <FormItemTypo>Name*</FormItemTypo>
                      <InputComponent
                        placeholder={"Name"}
                        value={values.name}
                        data-test-id={"nameTest"}
                        onChange={handleChange("name")}
                        onBlur={handleBlur("name")}
                        errorTitle={touched.name && errors.name}
                      />
                    </FormItem>

                    <FormItem>
                      <FormItemTypo>Description*</FormItemTypo>
                      <InputComponent
                        placeholder={"Description"}
                        data-test-id={"descriptionTest"}
                        value={values.description}
                        onChange={handleChange("description")}
                        onBlur={handleBlur("description")}
                        errorTitle={touched.description && errors.description}
                      />
                    </FormItem>

                    <FormItem>
                      <FormItemTypo>Target*</FormItemTypo>
                      <InputComponent
                        placeholder={"Target"}
                        value={values.target}
                        data-test-id={"targetTest"}
                        onChange={handleChange("target")}
                        onBlur={handleBlur("target")}
                        errorTitle={touched.target && errors.target}
                      />
                    </FormItem>

                    <FormItem>
                      <FormItemTypo>Goal Start Date*</FormItemTypo>
                      <TextField
                        id="date"
                        type="date"
                        name={"goalStartDate"}
                        data-test-id={"goalStartDateTest"}
                        placeholder={"Please choose"}
                        value={
                          values.goalStartDate &&
                          dayjs(values.goalStartDate).format("YYYY-MM-DD")
                        }
                        onChange={(event) =>
                          setFieldValue(
                            "goalStartDate",
                            new Date(event.target.value),
                          )
                        }
                      />
                      {errors.goalStartDate && (
                        <ErrorTypo>{errors.goalStartDate}</ErrorTypo>
                      )}
                    </FormItem>

                    <FormItem>
                      <FormItemTypo>Goal End Date*</FormItemTypo>
                      <TextField
                        id="date"
                        type="date"
                        name={"goalEndDate"}
                        data-test-id={"goalEndDateTest"}
                        placeholder={"Please choose"}
                        value={
                          values.goalEndDate &&
                          dayjs(values.goalEndDate).format("YYYY-MM-DD")
                        }
                        onChange={(event) =>
                          setFieldValue(
                            "goalEndDate",
                            new Date(event.target.value),
                          )
                        }
                      />
                      {errors.goalEndDate && (
                        <ErrorTypo>{errors.goalEndDate}</ErrorTypo>
                      )}
                    </FormItem>

                    <FormItem>
                      <FormItemTypo>Reward*</FormItemTypo>
                      <InputComponent
                        placeholder={"Reward"}
                        value={values.rewards}
                        data-test-id={"rewardTest"}
                        onChange={handleChange("rewards")}
                        onBlur={handleBlur("rewards")}
                        errorTitle={touched.rewards && errors.rewards}
                      />
                    </FormItem>

                    {id && (
                      <FormItem>
                        <FormItemTypo>Goal Status*</FormItemTypo>
                        <Select
                          value={values.goalStatus}
                          data-test-id={"selectStatusTest"}
                          label={
                            goalStatusObject[values.goalStatus]
                              .name as GoalStatusName
                          }
                          onChange={(selectedItem) => {
                            setFieldValue(
                              "goalStatus",
                              selectedItem.target.value,
                            );
                          }}>
                          {goalStatusList.map((item: string, index: number) => (
                            <MenuItem key={index} value={item}>
                              {goalStatusObject[item as GoalStatusKey].name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormItem>
                    )}

                    <ButtonContainer>
                      <Box>
                        {this.initialGoalId ? (
                          <>
                            <Button onClick={submitForm}>Update</Button>
                            <Button onClick={this.handleToggleDeleteModal}>
                              Delete
                            </Button>
                          </>
                        ) : (
                          <Button onClick={submitForm}>Create</Button>
                        )}
                      </Box>
                    </ButtonContainer>
                  </>
                )}
              </Formik>

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
        </Container>
      </ThemeProvider>
      // Customizable Area End
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const webStyle = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    padding: "30px 0",
  },
};
const Container = styled(Box)({
  width: "90%",
  marginLeft: "auto",
  marginRight: "auto",
});

const FormItem = styled(Box)({
  padding: 24,
  width: "100%",
});

const FormItemTypo = styled(Typography)({
  fontWeight: "bold",
  fontSize: 16,
  color: "black",
});

const ButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Title = styled(Typography)({
  fontSize: 40,
  textAlign: "center",
  fontWeight: "bold",
});
// Customizable Area End
