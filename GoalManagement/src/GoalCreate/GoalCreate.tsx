import * as React from "react";

// Customizable Area Start
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent";

import { Props } from "../GoalManagementController";
import GoalCreateController from "./GoalCreateController";
import { Formik } from "formik";
import { Button } from "react-native-elements";
import InputComponent from "../components/InputComponent/InputComponent";
import CalendarInputComponent from "../components/CalendarInputComponent/CalendarInputComponent";
import DropdownComponent from "../components/DropdownComponent/DropdownComponent";
import { GoalStatusKey } from "../types";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
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
    const { goal, createLoading, updateLoading, deleteLoading } = this.state;

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
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.container} testID={"containerID"}>
        <HeaderComponent
          title={id ? "Goal Update" : "Goal Create"}
          onBackButton={this.handleGoBack}
        />
        <ScrollView
          contentContainerStyle={styles.downContainer}
          showsVerticalScrollIndicator={false}>
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
            onSubmit={this.handleSubmitMobile}
            validationSchema={
              id ? this.goalUpdateSchema : this.goalCreateSchema
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
                <View style={styles.formItem}>
                  <Text style={styles.textBlack}>Name*</Text>
                  <InputComponent
                    placeholder={"Name"}
                    testID={"nameInputID"}
                    value={values.name}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    errorTitle={touched.name && errors.name}
                  />
                </View>

                <View style={styles.formItem}>
                  <Text style={styles.textBlack}>Description*</Text>
                  <InputComponent
                    placeholder={"Description"}
                    testID={"descriptionInputID"}
                    value={values.description}
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    errorTitle={touched.description && errors.description}
                  />
                </View>

                <View style={styles.formItem}>
                  <Text style={styles.textBlack}>Target*</Text>
                  <InputComponent
                    placeholder={"Target"}
                    value={values.target}
                    testID={"targetInputID"}
                    onChangeText={handleChange("target")}
                    onBlur={handleBlur("target")}
                    errorTitle={touched.target && errors.target}
                  />
                </View>

                <View style={styles.formItem}>
                  <Text style={styles.textBlack}>Goal Start Date*</Text>
                  <CalendarInputComponent
                    testID={"startDateID"}
                    initialDate={values.goalStartDate}
                    onChangeDate={(date: Date) =>
                      setFieldValue("goalStartDate", date)
                    }
                    errorTitle={
                      touched.goalStartDate && (errors.goalStartDate as string)
                    }
                  />
                </View>

                <View style={styles.formItem}>
                  <Text style={styles.textBlack}>Goal End Date*</Text>
                  <CalendarInputComponent
                    testID={"endDateID"}
                    initialDate={values.goalEndDate}
                    onChangeDate={(date: Date) =>
                      setFieldValue("goalEndDate", date)
                    }
                    errorTitle={
                      touched.goalEndDate && (errors.goalEndDate as string)
                    }
                  />
                </View>

                <View style={styles.formItem}>
                  <Text style={styles.textBlack}>Reward*</Text>
                  <InputComponent
                    placeholder={"Reward"}
                    testID={"rewardInputID"}
                    value={values.rewards}
                    onChangeText={handleChange("rewards")}
                    onBlur={handleBlur("rewards")}
                    errorTitle={touched.rewards && errors.rewards}
                  />
                </View>

                {id && (
                  <View style={styles.formItem}>
                    <Text style={styles.textBlack}>Goal Status*</Text>
                    <DropdownComponent
                      onSelect={(selectedItem) =>
                        setFieldValue("goalStatus", selectedItem)
                      }
                      defaultButtonText={goal_status}
                    />
                  </View>
                )}

                <View style={styles.btnContainer}>
                  <Button
                    title={id ? "Update" : "Create"}
                    onPress={submitForm}
                    testID={"submitID"}
                    type={"outline"}
                    loading={createLoading || updateLoading}
                    buttonStyle={styles.btnStyle}
                    titleStyle={styles.titleBtnStyle}
                    containerStyle={styles.btnContainer}
                    loadingStyle={styles.loadingStyle}
                    loadingProps={{ color: "#826FFC" }}
                  />

                  {id && (
                    <Button
                      title={"Delete"}
                      loading={deleteLoading}
                      onPress={this.handleDeleteGoal}
                      type={"outline"}
                      buttonStyle={styles.btnStyle}
                      titleStyle={styles.titleBtnStyle}
                      containerStyle={styles.btnContainer}
                      loadingStyle={styles.loadingStyle}
                      loadingProps={{ color: "#826FFC" }}
                    />
                  )}
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
  },
  downContainer: {
    padding: 16,
  },
  formItem: {
    marginBottom: 16,
  },
  titleBtnStyle: {
    color: "#826FFC",
    textAlign: "center",
    width: "80%",
  },
  btnStyle: {
    borderColor: "#826FFC",
    borderRadius: 10,
    marginVertical: 8,
  },
  btnContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  loadingStyle: {
    width: "80%",
  },
  textBlack: {
    color: "black",
  },
});
// Customizable Area End
