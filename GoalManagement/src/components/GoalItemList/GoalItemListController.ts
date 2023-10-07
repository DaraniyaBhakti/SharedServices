import { Goal } from "../../types";
import * as React from "react";
import Props from "../../GoalRetrieve/GoalRetrieveController";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";

type GoalItemListControllerInput = {
  goal: Goal;
  navigation: StackNavigationProp<Props>;
  token: string;
  onDeleteGoal: (item: Goal) => void;
};
type GoalItemListControllerOutput = [
  () => void,
  () => void,
  boolean,
  () => void,
  () => void,
];
export function useGoalItemList(
  input: GoalItemListControllerInput,
): GoalItemListControllerOutput {
  const { goal, navigation, token, onDeleteGoal } = input;

  const handleGoToGoalDetail = React.useCallback(() => {
    navigation.replace("GoalDetail", {
      goal: goal,
      token: token,
    });
  }, [goal, token, navigation]);

  const handleGoToGoalUpdate = React.useCallback(() => {
    navigation.replace("GoalCreate", {
      goal: goal,
      token: token,
    });
  }, [goal, token, navigation]);

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
