import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";

import { imgSearch, imgDots, imgMsg, imgPause } from "./assets";
// Customizable Area End

import TimeSheetWorkerLogsController, {
  Props,
  configJSON,
  LogList,
} from "./TimeSheetWorkerLogsController";
import { COLORS } from "../../../framework/src/Globals";

export default class TimeSheetWorkerLogs extends TimeSheetWorkerLogsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderLogList = ({ item }: { item: LogList }) => {
    return (
      <TouchableOpacity
        testID="openTaskDetails"
        style={styles.logListItemTouchView}>
        <View style={styles.logListItemView}>
          <Text style={styles.activityDateText}>
            {`${configJSON.labelActivityDate}`}
            <Text
              style={
                styles.listTotalAllocatedTime
              }>{`${item.attributes.email}`}</Text>
          </Text>
          <TouchableOpacity style={styles.taskDotsTouchView}>
            <Image
              source={imgDots}
              style={styles.dotsImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.listTotalAllocatedLabel}>
          {`${configJSON.labelActivityName}`}
          <Text
            style={
              styles.listTotalAllocatedLabel
            }>{`${item.attributes.first_name}`}</Text>
        </Text>
        <Text style={styles.listTotalAllocatedLabel}>
          {`${configJSON.labelTotalHours}`}
          <Text style={styles.listTotalAllocatedLabel}>
            {this.getSplitHoursAndMinutes(item.attributes.total_logged_hours)}
          </Text>
        </Text>
      </TouchableOpacity>
    );
  };
  searchView() {
    return (
      <View style={styles.searchView}>
        <Image
          source={imgSearch}
          style={styles.searchIcon}
          resizeMode="contain"
        />
        <TextInput
          testID="txtSearchInput"
          style={styles.searchInput}
          placeholder={configJSON.search}
          {...this.txtSearchInputChange}
          numberOfLines={1}
          value={this.state.txtSearchInputValue}
        />
      </View>
    );
  }
  workerDetailView() {
    let { workerData } = this.state;
    return (
      <TouchableOpacity
        testID="openTaskDetails"
        style={styles.mainListItemTouchView}>
        <View style={styles.mainListItemView}>
          <View style={styles.mainItemView}>
            <View style={styles.mainBorderView}>
              <Image
                source={workerData.img}
                style={styles.taskListImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.workerDetailNameView}>
              <View style={styles.workerName}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.listName}>
                  {workerData.name}
                </Text>
                <TouchableOpacity style={styles.workerDotsTouchView}>
                  <Image
                    source={imgDots}
                    style={styles.dotsImage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.listRole}>{workerData.role}</Text>
            </View>
          </View>
          <Text style={styles.listTotalAllocatedLabel}>
            {`${configJSON.labelTotalWorkedHoursToday}`}
            <Text style={styles.listTotalAllocatedLabel}>
              {`${workerData.workedHours}`}
            </Text>
          </Text>
          <Text style={styles.listTotalAllocatedLabel}>
            {`${configJSON.labelTotalHours}`}
            <Text style={styles.listTotalAllocatedLabel}>
              {`${workerData.totalHours}`}
            </Text>
          </Text>
          <View style={styles.bottomButtonsView}>
            <TouchableOpacity>
              <Image
                source={imgMsg}
                style={styles.imgMsg}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={imgPause}
                style={styles.imgPause}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainView}>
          {this.searchView()}
          <Text style={styles.logCountText}>{"Showing: All activities"}</Text>
          {this.workerDetailView()}
          <FlatList
            testID="testTaskList"
            bounces={false}
            style={styles.list}
            data={this.state.logList}
            keyExtractor={(item: LogList) => item.id}
            renderItem={this.renderLogList}
          />
        </View>
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.white,
  },
  mainView: {
    margin: 16,
    flex: 1,
  },
  searchView: {
    width: "100%",
    height: 36,
    flexDirection: "row",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#979797",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  searchIcon: {
    height: 14,
    width: 14,
  },
  searchInput: {
    flex: 1,
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.black,
    marginStart: 16,
    height: 36,
  },
  userImageBorderView: {
    borderRadius: 10,
    height: 20,
    width: 20,
    borderWidth: 2,
    borderColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  userImage: {
    height: 18,
    width: 18,
    borderRadius: 10,
  },
  list: {
    flex: 1,
  },
  logListItemTouchView: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EBEBEB",
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    marginBottom: 16,
    backgroundColor: COLORS.white,
  },
  logCountText: {
    fontSize: 17,
    color: "#3F526D",
    marginVertical: 16,
  },
  mainItemView: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 8,
  },
  mainBorderView: {
    borderRadius: 25,
    height: 50,
    width: 50,
    borderWidth: 2,
    borderColor: "#927FFC",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  taskListImage: {
    height: 44,
    width: 44,
    borderRadius: 22,
  },
  taskListName: {
    fontSize: 19,
    color: COLORS.black,
    marginTop: 16,
  },
  listAllocatedText: {
    fontSize: 19,
    color: "#73767A",
    marginTop: 4,
  },
  listChatTouchView: {
    position: "absolute",
    right: 0,
    height: 25,
    width: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  chatImage: {
    height: 25,
    width: 25,
  },
  listName: {
    color: "#3F526D",
    fontSize: 19,
  },
  listRole: {
    color: "#826FFC",
    marginTop: 4,
    fontSize: 15,
  },
  listTotalAllocatedLabel: {
    fontSize: 15,
    color: "#3F526D",
    marginTop: 8,
  },
  listTotalAllocatedTime: {
    fontSize: 15,
    color: "#9AA3B2",
  },
  taskDotsTouchView: {
    height: 24,
    width: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  dotsImage: {
    height: 14,
    width: 14,
  },
  mainListItemTouchView: {
    marginBottom: 16,
    shadowColor: "#979797",
    shadowOpacity: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  mainListItemView: {
    overflow: "hidden",
    backgroundColor: COLORS.white,
    elevation: 10,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EBEBEB",
  },
  logListItemView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    alignItems: "center",
  },
  activityDateText: {
    fontSize: 15,
    color: "#3F526D",
  },
  workerDetailNameView: {
    marginStart: 16,
    justifyContent: "center",
    flex: 1,
  },
  workerName: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  workerDotsTouchView: {
    height: 24,
    width: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomButtonsView: {
    position: "absolute",
    bottom: 16,
    right: 16,
    flexDirection: "row",
  },
  imgMsg: {
    height: 24,
    width: 24,
  },
  imgPause: {
    height: 24,
    width: 24,
    marginStart: 16,
  },
});
// Customizable Area End
