import * as React from "react";
import { PropsWithChildren, ReactElement } from "react";
import { Goal } from "../../types";
import { useGoalItemList } from "./GoalItemListController.web";
import Props from "../../GoalRetrieve/GoalRetrieveController";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { Box, Button, Grid } from "@material-ui/core";
import { deleteIcon, editIcon, goalIcon } from "../../assets";
import dayjs from "dayjs";
import { styled } from "@material-ui/core/styles";
import ConfirmModalWeb from "../ConfirmModal/ConfirmModal.web";

export function GoalItemList(
  props: PropsWithChildren<GoalItemListWebProps>,
): ReactElement {
  const { goal, navigation, onDeleteGoal, totalGoal, indexGoal } = props;

  const [
    handleGoToGoalDetail,
    handleGoToGoalUpdate,
    deleteModal,
    handleToggleModal,
    handleDeleteGoal,
  ] = useGoalItemList({ goal, navigation, onDeleteGoal });

  return (
    <>
      <Box id={"goalItemID"}>
        <GridContainer container spacing={2}>
          <Grid item xs={3}>
            <Item>{goal.name}</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>{goal.target}</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>{goal.goal_status}</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              {dayjs(goal.goal_start_date).format("MM/DD/YYYY")} -{" "}
              {dayjs(goal.goal_end_date).format("MM/DD/YYYY")}
            </Item>
          </Grid>
          <ActionGrid item xs={3}>
            <ActionItem>
              <Button onClick={handleToggleModal} id={"deleteButtonId"}>
                <img alt={"Delete"} src={deleteIcon} />
              </Button>
              <Button onClick={handleGoToGoalUpdate} id={"updateButtonId"}>
                <img alt={"Edit"} src={editIcon} />
              </Button>
              <Button onClick={handleGoToGoalDetail} id={"detailButtonId"}>
                <img alt={"Goal"} src={goalIcon} />
              </Button>
            </ActionItem>
          </ActionGrid>
        </GridContainer>
        {indexGoal !== totalGoal - 1 && <Separator />}
      </Box>

      <ConfirmModalWeb
        testID={"confirmModalId"}
        onToggleModal={handleToggleModal}
        isVisible={deleteModal}
        onConfirm={handleDeleteGoal}
        titleModal={`Do you want to remove this goal - ${goal.name}`}
      />
    </>
  );
}

const Item = styled(Box)({
  padding: 1,
  textAlign: "center",
  color: "black",
});

const GridContainer = styled(Grid)({
  padding: 16,
});

const ActionGrid = styled(Grid)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ActionItem = styled(Item)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "50%",
});

const Separator = styled(Box)({
  borderBottom: "1px solid black",
  opacity: 0.5,
});

export interface GoalItemListWebProps {
  goal: Goal;
  navigation: StackNavigationProp<Props>;
  onDeleteGoal: (item: Goal) => void;
  totalGoal: number;
  indexGoal: number;
}

GoalItemList.defaultProps = {};

export default GoalItemListWebProps;
