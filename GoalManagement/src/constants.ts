import { GoalStatusNumber, GoalStatusObject } from "./types";

export const goalStatusList: string[] = ["tracked", "advanced", "delayed"];

export const goalStatusObject: GoalStatusObject = {
  tracked: {
    id: GoalStatusNumber.TRACKED,
    code: "tracked",
    name: "Tracked",
  },
  advanced: {
    id: GoalStatusNumber.ADVANCED,
    code: "advanced",
    name: "Advanced",
  },
  delayed: {
    id: GoalStatusNumber.DELAYED,
    code: "delayed",
    name: "Delayed",
  },
};
