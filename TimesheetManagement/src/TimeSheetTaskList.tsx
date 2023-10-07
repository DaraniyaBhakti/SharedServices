import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  SafeAreaView,
} from "react-native";
import { bgGradientRectangle, imgSearch, imgDots, imgDefault } from "./assets";
// Customizable Area End

import TimeSheetTaskListController, {
  Props,
  configJSON,
  TaskList,
} from "./TimeSheetTaskListController";
import { COLORS } from "../../../framework/src/Globals";
import moment from "moment";

export default class TimeSheetTaskList extends TimeSheetTaskListController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderTaskList = ({ item, index }: { item: TaskList; index: number }) => {
    return (
      <TouchableOpacity
        testID="openTaskDetails"
        style={
          index === 0
            ? styles.mainListItemView
            : { ...styles.mainListItemView, marginTop: 20 }
        }
        onPress={() => {
          this.openTaskDetails(item);
        }}>
        <View style={styles.mainBorderView}>
          <Image
            source={imgDefault}
            style={styles.taskImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.taskName}>{item.title}</Text>
        <Text style={styles.allocatedText}>
          {`${configJSON.labelTotalAllocatedTime}${item.planned_hours}Hrs`}
        </Text>
        {item.members && item.members.length > 0 ? (
          <View>
            <View style={styles.dividerLine} />
            <View style={styles.memberImagesView}>
              {item.members.slice(0, 4).map((element) => {
                return (
                  <Image
                    key={element.key}
                    source={element.img}
                    style={styles.memberImage}
                    resizeMode="contain"
                  />
                );
              })}
              <Text style={styles.workingMemberText}>{`+ ${
                item.members.length - 4
              }${configJSON.labelMembersWorking}`}</Text>
            </View>
          </View>
        ) : (
          <View />
        )}
        <TouchableOpacity style={styles.taskDotsTouchView}>
          <Image
            source={imgDots}
            style={styles.dotsImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainView}>
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
          <View style={styles.createTaskMainView}>
            <View>
              <Text style={styles.createTaskText}>
                {configJSON.createNewTask}
              </Text>
              <Text style={styles.addDateText}>
                {moment().format("YYYY-MM-DD")}
              </Text>
            </View>
            <TouchableOpacity
              testID="openCreateTask"
              style={styles.viewTaskTouchView}
              onPress={() => this.openCreateTask()}>
              <ImageBackground
                source={bgGradientRectangle}
                imageStyle={styles.gradientImageStyle}
                style={styles.gradientImageBackground}>
                <Text style={styles.buttonText}>{configJSON.create}</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <Text style={styles.allTaskText}>{configJSON.allTask}</Text>
          <FlatList
            testID="testTaskList"
            style={styles.list}
            data={this.state.taskList}
            keyExtractor={(item: TaskList) => item.id.toString()}
            renderItem={this.renderTaskList}
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
  createTaskMainView: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EBEBEB",
    justifyContent: "space-between",
    padding: 16,
    marginTop: 24,
    shadowColor: "#19000000",
  },
  createTaskText: {
    fontSize: 19,
    color: COLORS.black,
  },
  addDateText: {
    fontSize: 17,
    color: "#73767A",
    marginTop: 8,
  },
  timeSheetTouchView: {
    marginTop: 50,
  },
  viewTaskTouchView: {
    justifyContent: "center",
    width: 117,
  },
  gradientImageBackground: {
    justifyContent: "center",
    alignItems: "center",
    height: 38,
  },
  gradientImageStyle: {
    borderRadius: 8,
    width: 117,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.white,
  },
  allTaskText: {
    color: "#3F526D",
    fontSize: 19,
    marginVertical: 20,
  },
  mainListItemView: {
    padding: 16,
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EBEBEB",
  },
  mainBorderView: {
    borderRadius: 25,
    height: 50,
    width: 50,
    borderWidth: 2,
    borderColor: "#73767A",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  taskImage: {
    height: 44,
    width: 44,
    borderRadius: 22,
  },
  taskName: {
    fontSize: 19,
    color: COLORS.black,
    marginTop: 16,
  },
  allocatedText: {
    fontSize: 19,
    color: "#73767A",
    marginTop: 4,
  },
  dividerLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#EBEBEB",
    marginVertical: 15,
  },
  memberImagesView: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    marginStart: 6,
  },
  memberImage: {
    height: 24,
    width: 24,
    borderRadius: 12,
    marginStart: -6,
  },
  workingMemberText: {
    color: "#826FFC",
    alignSelf: "center",
    textAlign: "right",
    flex: 1,
    marginEnd: 6,
  },
  taskDotsTouchView: {
    position: "absolute",
    right: 12,
    top: 12,
    height: 24,
    width: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  dotsImage: {
    height: 14,
    width: 14,
  },
  list: {
    flex: 1,
  },
  listMargin: {
    height: 20,
  },
});
// Customizable Area End
