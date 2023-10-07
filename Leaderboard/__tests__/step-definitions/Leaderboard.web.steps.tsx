import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import * as React from "react";
import Leaderboard from "../../src/Leaderboard.web";
import { LeaderboardItem } from "../../src/types";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { handleTestApiCall } from "../../../../framework/src/Helpers/handle-test-api";

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Leaderboard",
};

export const leaderboardWeb: LeaderboardItem[] = [
  {
    account_id: 1,
    total_point: 3420,
    is_active: true,
    created_by: "admin",
    updated_by: null,
    account_user_name: "siddharth gupta",
    member_since: new Date("11/08/2000"),
    profile_picture: "asd",
    position: 1,
  },
  {
    account_id: 2,
    total_point: 3420,
    is_active: true,
    created_by: "admin",
    updated_by: null,
    account_user_name: "siddharth gupta",
    member_since: new Date("09/26/2000"),
    profile_picture: "asd",
    position: 2,
  },
];

export const nullLeaderboardWeb: LeaderboardItem[] = [
  {
    account_id: 1,
    total_point: 1000,
    is_active: true,
    created_by: "admin",
    updated_by: null,
    account_user_name: null,
    member_since: new Date("09/26/2000"),
    profile_picture: "abc",
    position: 1,
  },
  {
    account_id: 2,
    total_point: 1100,
    is_active: true,
    created_by: "admin",
    updated_by: null,
    account_user_name: null,
    member_since: new Date("09/26/2000"),
    profile_picture: "abc",
    position: 2,
  },
];

const feature = loadFeature(
  "./__tests__/features/Leaderboard-scenario.web.feature",
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Leaderboard", ({ given, when, then }) => {
    let leaderboardWrapper: ShallowWrapper;
    let instance: Leaderboard;

    given("I am a User loading Leaderboard", () => {
      leaderboardWrapper = shallow(<Leaderboard {...screenProps} />);
    });

    when("I navigate to the Leaderboard", () => {
      instance = leaderboardWrapper.instance() as Leaderboard;

      instance.setState({
        pageIndexWeb: 1,
        totalPageWeb: 2,
      });

      instance.setState({
        leaderboardWeb: leaderboardWeb,
      });

      let webContainer = leaderboardWrapper.findWhere(
        (node) => node.prop("testID") === "container",
      );
      expect(webContainer).toBeTruthy();

      instance.setState({
        leaderboardWeb: nullLeaderboardWeb,
      });

      expect(webContainer).toBeTruthy();

      instance.handleLoginLeaderboardWeb();

      const loginAPI = new Message(getName(MessageEnum.RestAPIResponceMessage));

      instance.loginLeaderboardWebApi = loginAPI.messageId;

      handleTestApiCall(loginAPI, {});

      const testConvertDataWeb = instance.handleConvertDataWeb([
        {
          id: 1,
          type: "leaderboard",
          attributes: leaderboardWeb[0],
        },
        {
          id: 2,
          type: "leaderboard",
          attributes: leaderboardWeb[1],
        },
      ]);
      expect(testConvertDataWeb).toEqual([
        leaderboardWeb[0],
        leaderboardWeb[1],
      ]);

      instance.handleGetLeaderboardWeb();

      const getLeaderboardWebAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );

      instance.getLeaderboardWebApi = getLeaderboardWebAPI.messageId;

      handleTestApiCall(getLeaderboardWebAPI, {
        leader_boards: { data: [{}, {}] },
      });

      instance.handleGoToPage(undefined, 2);

      const getMoreLeaderboardWebAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );

      instance.getMoreLeaderboardWebApi = getMoreLeaderboardWebAPI.messageId;

      handleTestApiCall(getMoreLeaderboardWebAPI, {
        leader_boards: { data: [{}, {}] },
      });

      instance.handleUpdatePaginationWeb({
        pagination: {
          current_page: 1,
          next_page: 1,
          prev_page: 1,
          total_pages: 1,
          total_count: 1,
          current_count: 1,
          per_page: 1,
        },
      });
    });

    then("Leaderboard will load with out errors", () => {
      expect(leaderboardWrapper).toBeTruthy();
      let container = leaderboardWrapper.findWhere(
        (node) => node.prop("testID") === "container",
      );

      instance.setState({
        leaderboardWeb: nullLeaderboardWeb,
      });

      expect(container).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(leaderboardWrapper).toBeTruthy();
    });
  });
});
