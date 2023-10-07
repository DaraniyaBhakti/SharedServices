import * as React from "react";
import { PropsWithChildren, ReactElement } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { deleteIcon, editIcon } from "../../assets";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { Goal } from "../../types";
import dayjs from "dayjs";
import { useGoalItemList } from "./GoalItemListController";
import Props from "../../GoalRetrieve/GoalRetrieveController";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";

export function GoalItemList(
  props: PropsWithChildren<GoalItemListProps>,
): ReactElement {
  const { goal, navigation, token, onDeleteGoal } = props;

  const [
    handleGoToGoalDetail,
    handleGoToGoalUpdate,
    deleteModal,
    handleToggleModal,
    handleDeleteGoal,
  ] = useGoalItemList({ goal, navigation, token, onDeleteGoal });

  return (
    <>
      <TouchableOpacity
        testID={"goalItemID"}
        onPress={handleGoToGoalDetail}
        style={styles.goalItem}>
        <View style={styles.headerGoalItem}>
          <Text style={[styles.purpleText]}>{goal.name}</Text>

          <View style={styles.headerLeftGoalItem}>
            <TouchableOpacity
              testID={"goalItemToggleModalID"}
              style={styles.iconPlaceholder}
              onPress={handleToggleModal}>
              <Image source={deleteIcon} />
            </TouchableOpacity>

            <TouchableOpacity
              testID={"goalItemUpdateID"}
              style={styles.iconPlaceholder}
              onPress={handleGoToGoalUpdate}>
              <Image source={editIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text>Target: {goal.target}</Text>
          <Text>
            Start & End Date: {dayjs(goal.goal_start_date).format("MM/DD/YYYY")}{" "}
            - {dayjs(goal.goal_end_date).format("MM/DD/YYYY")}
          </Text>
        </View>
      </TouchableOpacity>

      <ConfirmModal
        testID={"goalModalID"}
        onConfirm={handleDeleteGoal}
        onToggleModal={handleToggleModal}
        isVisible={deleteModal}
        titleModal={`Do you want to delete this goal - ${goal.name} ?`}
      />
    </>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  headerGoalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerLeftGoalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "20%",
  },
  iconPlaceholder: {
    padding: 8,
  },
  purpleText: {
    color: "#826FFC",
  },
});

export interface GoalItemListProps {
  goal: Goal;
  navigation: StackNavigationProp<Props>;
  onDeleteGoal: (item: Goal) => void;
  token: string;
}

GoalItemList.defaultProps = {};

export default GoalItemList;
