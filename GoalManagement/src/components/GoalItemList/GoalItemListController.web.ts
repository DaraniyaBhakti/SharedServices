import { Goal } from "../../types";
import * as React from "react";
import Props from "../../GoalRetrieve/GoalRetrieveController";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";

type ControllerInputWeb = {
  goal: Goal;
  navigation: StackNavigationProp<Props>;
  onDeleteGoal: (item: Goal) => void;
};
type ControllerWebOutput = [
  () => void,
  () => void,
  boolean,
  () => void,
  () => void,
];
export function useGoalItemList(
  input: ControllerInputWeb,
): ControllerWebOutput {
  const { goal, navigation, onDeleteGoal } = input;

  const handleGoToGoalDetail = React.useCallback(() => {
    navigation.navigate("GoalDetail", {
      goalId: goal.id,
    });
  }, [goal.id, navigation]);

  const handleGoToGoalUpdate = React.useCallback(() => {
    navigation.navigate("GoalCreate", {
      goalId: goal.id,
    });
  }, [goal.id, navigation]);

  const [deleteModal, setDeleteModal] = React.useState<boolean>(false);

  const handleToggleModal = React.useCallback(() => {
    setDeleteModal((prevState) => !prevState);
  }, []);

  const handleDeleteGoal = React.useCallback(() => {
    onDeleteGoal(goal);
  }, [goal, onDeleteGoal]);

  return [
    handleGoToGoalDetail,
    handleGoToGoalUpdate,
    deleteModal,
    handleToggleModal,
    handleDeleteGoal,
  ];
}
