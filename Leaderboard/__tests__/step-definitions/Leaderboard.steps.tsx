import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import * as React from "react";
import Leaderboard from "../../src/Leaderboard";
import ImageComponent from "../../src/components/ImageComponent/ImageComponent";
import { LeaderboardItem } from "../../src/types";
import { handleTestApiCall } from "../../../../framework/src/Helpers/handle-test-api";

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Leaderboard",
};

const feature = loadFeature(
  "./__tests__/features/Leaderboard-scenario.feature",
);

export const leaderboard: LeaderboardItem[] = [
  {
    account_id: 1,
    total_point: 3420,
    is_active: true,
    created_by: "admin",
    updated_by: null,
    account_user_name: "siddharth gupta",
    member_since: new Date("11/08/2000"),
    profile_picture: "asd",
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
  },
];

export const nullLeaderboard: LeaderboardItem[] = [
  {
    account_id: 1,
    total_point: 1000,
    is_active: true,
    created_by: "admin",
    updated_by: null,
    account_user_name: null,
    member_since: new Date("09/26/2000"),
    profile_picture: "abc",
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
  },
];

defineFeature(feature, (featureTest) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  featureTest("User navigates to Leaderboard", ({ given, when, then }) => {
    let leaderboardShallowWrapper: ShallowWrapper;
    let instance: Leaderboard;

    given("I am a User loading Leaderboard", () => {
      leaderboardShallowWrapper = shallow(<Leaderboard {...screenProps} />);
    });

    when("I navigate to the Leaderboard", () => {
      instance = leaderboardShallowWrapper.instance() as Leaderboard;
      instance.setState({
        pageIndex: 1,
        totalPage: 2,
      });
      instance.setState({ needRetakeToken: false });
      instance.handleComponentDidMount();
      instance.setState({ needRetakeToken: true });
      instance.handleComponentDidMount();

      instance.setState({
        leaderboard: leaderboard,
      });

      let container = leaderboardShallowWrapper.findWhere(
        (node) => node.prop("testID") === "container",
      );
      expect(container).toBeTruthy();

      instance.setState({
        leaderboard: nullLeaderboard,
      });

      expect(container).toBeTruthy();

      instance.handleLoginUser();

      const loginAPI = new Message(getName(MessageEnum.RestAPIResponceMessage));

      instance.loginApiCallId = loginAPI.messageId;

      handleTestApiCall(loginAPI, {});

      const test = instance.handleConvertData([
        {
          id: 1,
          type: "leaderboard",
          attributes: leaderboard[0],
        },
        {
          id: 2,
          type: "leaderboard",
          attributes: leaderboard[1],
        },
      ]);
      expect(test).toEqual([leaderboard[0], leaderboard[1]]);

      instance.handleGetLeaderboard();

      const getEmployeeListAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );

      instance.getLeaderboardDataApi = getEmployeeListAPI.messageId;

      handleTestApiCall(getEmployeeListAPI, {
        leader_boards: { data: [{}, {}] },
      });

      instance.handleLoadMore();

      const getMoreLeaderboardAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );

      instance.getMoreLeaderboardDataApi = getMoreLeaderboardAPI.messageId;

      handleTestApiCall(getMoreLeaderboardAPI, {
        leader_boards: { data: [{}, {}] },
      });

      instance.handleUpdatePagination({
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
      const imageComponentWrapper: ShallowWrapper = shallow(
        <ImageComponent initialUri={"abc"} size={50} />,
      );

      expect(imageComponentWrapper).toBeTruthy();

      expect(leaderboardShallowWrapper).toBeTruthy();
    });

    then("I can enter text with out errors", () => {
      const key = leaderboardShallowWrapper
        .findWhere((node) => node.prop("testID") === "flatListTest")
        .props()
        .keyExtractor({ account_id: 3 });

      expect(key).toEqual("3");

      let flatList = leaderboardShallowWrapper
        .findWhere((node) => node.prop("testID") === "flatListTest")
        .renderProp("renderItem")({ item: leaderboard[0] });

      expect(flatList).toBeTruthy();

      flatList = leaderboardShallowWrapper
        .findWhere((node) => node.prop("testID") === "flatListTest")
        .renderProp("renderItem")({ item: nullLeaderboard[0] });

      expect(flatList).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(leaderboardShallowWrapper).toBeTruthy();
    });
  });
});
