export interface Goal {
  id?: number;
  account_id?: number;
  name?: string;
  description?: string;
  target?: string;
  goal_start_date?: Date;
  goal_end_date?: Date;
  rewards?: string;
  is_active?: boolean;
  goal_status?: GoalStatusKey;
  created_at?: Date;
  created_by?: string;
  updated_at?: Date;
  updated_by?: string;
}

export interface GoalResponseData {
  id: number;
  type: "goal_management";
  attributes: Goal;
}

export type GoalStatusKey = "tracked" | "advanced" | "delayed";

export type GoalStatusName = "Tracked" | "Advanced" | "Delayed";

export enum GoalStatusNumber {
  TRACKED,
  ADVANCED,
  DELAYED,
}

export type GoalStatusObject = {
  [key in GoalStatusKey]: {
    id: GoalStatusNumber;
    code: GoalStatusKey;
    name: GoalStatusName;
  };
};
