import * as React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
} from "react-native";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent";

import { Props } from "../GoalManagementController";
import GoalDetailController from "./GoalDetailController";
import { Button } from "react-native-elements";
import {
  calendarIcon,
  classIcon,
  clockIcon,
  goalIcon,
  presentationIcon,
  userIcon,
} from "../assets";
import ConfirmModal from "../components/ConfirmModal/ConfirmModal";
import { configJSON } from "../GoalManagementController.web";
import dayjs from "dayjs";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
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
    // Customizable Area Start
    const { goal } = this.state;
    // Merge Engine - render - Start
    return (
      <>
        <SafeAreaView style={styles.container} testID={"containerID"}>
          <HeaderComponent
            title={"Goal Details"}
            onBackButton={this.handleGoBack}
          />
          <ScrollView contentContainerStyle={styles.downContainer}>
            <View style={styles.goalNameContainer}>
              <View style={styles.goalIconContainer}>
                <Image source={goalIcon} />
              </View>

              <Text style={styles.title}>{goal.name}</Text>
            </View>
            {[
              {
                icon: clockIcon,
                label: "Goal Created At:",
                value: dayjs(goal.created_at).format(configJSON.dateTimeFormat),
              },
              {
                icon: userIcon,
                label: "Goal Created By:",
                value: goal.created_by,
              },
              {
                icon: presentationIcon,
                label: "Target:",
                value: goal.target,
              },
              {
                icon: classIcon,
                label: "Rewards:",
                value: goal.rewards,
              },
              {
                icon: calendarIcon,
                label: "Goal Start & End Date:",
                value: `${dayjs(goal.goal_start_date).format(
                  configJSON.dateFormat,
                )} - ${dayjs(goal.goal_end_date).format(
                  configJSON.dateFormat,
                )}`,
              },
              {
                icon: clockIcon,
                label: "Goal Updated At:",
                value: dayjs(goal.updated_at).format(configJSON.dateTimeFormat),
              },
              {
                icon: userIcon,
                label: "Goal Updated By:",
                value: goal.updated_by,
              },
              {
                iconWeb: presentationIcon,
                label: "Goal Status:",
                value: goal.goal_status,
              },
            ].map((item, index) => (
              <View style={styles.itemInfoContainer} key={index}>
                <View style={styles.itemInfoLeft}>
                  <View style={styles.itemIconContainer}>
                    <Image source={item.icon} style={styles.itemIcon} />
                  </View>
                  <Text>{item.label}</Text>
                </View>

                <Text>{item.value}</Text>
              </View>
            ))}

            <View style={styles.separate} />
            <View style={styles.descriptionContainer}>
              <Text style={styles.title}>Description</Text>

              <Text style={styles.description}>{goal.description}</Text>
            </View>
          </ScrollView>

          <View style={styles.btnContainer}>
            <Button
              title={"Update"}
              onPress={this.handleGoToUpdateScreen}
              type={"outline"}
              buttonStyle={styles.btnStyle}
              titleStyle={styles.titleBtnStyle}
              loadingProps={{ color: "#826FFC" }}
            />

            <Button
              title={"Delete"}
              onPress={this.handleToggleDeleteModal}
              type={"outline"}
              buttonStyle={styles.btnStyle}
              titleStyle={styles.titleBtnStyle}
              loadingProps={{ color: "#826FFC" }}
            />
          </View>
        </SafeAreaView>

        <ConfirmModal
          titleModal={"Do you really want to delete the record?"}
          onConfirm={this.handleDeleteGoal}
          onToggleModal={this.handleToggleDeleteModal}
          isVisible={this.state.deleteModal}
        />
      </>
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
  goalNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  goalIconContainer: {
    paddingHorizontal: 16,
  },
  itemIcon: {
    padding: 10,
  },
  itemIconContainer: {
    paddingHorizontal: 8,
  },
  itemInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  itemInfoLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  separate: {
    borderTopWidth: 1,
  },
  descriptionContainer: {
    marginTop: 16,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  description: {
    marginTop: 16,
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
});
// Customizable Area End
