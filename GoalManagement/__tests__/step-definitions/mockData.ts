import { Goal } from "../../src/types";

export const mockGoal: Goal = {
  id: 5,
  account_id: 80,
  name: "dream 11",
  description: "abc",
  target: "1",
  goal_start_date: new Date(),
  goal_end_date: new Date(),
  rewards: "no rewards",
  is_active: true,
  goal_status: "tracked",
  created_at: new Date(),
  created_by: "abc",
  updated_at: new Date(),
  updated_by: "abc",
};

export const mockDetailGoal: Goal = {
  id: 5,
  account_id: 80,
  name: "dream 11",
  description: "dfdszf",
  target: "1",
  goal_start_date: new Date("2023-02-17T00:00:00.000Z"),
  goal_end_date: new Date("2023-02-23T00:00:00.000Z"),
  rewards: "no rewards",
  is_active: true,
  goal_status: "tracked",
  created_at: new Date("2023-02-22T11:59:58.152Z"),
  created_by: "tejaswini@gmail.com",
  updated_at: new Date("2023-02-23T12:13:07.649Z"),
  updated_by: "tejaswini@gmail.com",
};

export const goalList: Goal[] = [
  {
    id: 5,
    account_id: 80,
    name: "dream 11",
    description: "dfdszf",
    target: "1",
    goal_start_date: new Date("2023-02-17T00:00:00.000Z"),
    goal_end_date: new Date("2023-02-23T00:00:00.000Z"),
    rewards: "no rewards",
    is_active: true,
    goal_status: "tracked",
    created_at: new Date("2023-02-22T11:59:58.152Z"),
    created_by: "tejaswini@gmail.com",
    updated_at: new Date("2023-02-23T12:13:07.649Z"),
    updated_by: "tejaswini@gmail.com",
  },
];
