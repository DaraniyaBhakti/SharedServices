import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from "react-native";

// Merge Engine - import assets - Start
import { imgDotsDark, imgChat, bgGradientRectangle } from "./assets";
// Merge Engine - import assets - End
// Customizable Area End

import TimeSheetTaskDetailsController, {
  Props,
  configJSON,
  MembersData,
  Members,
} from "./TimeSheetTaskDetailsController";
import { COLORS } from "../../../framework/src/Globals";

export default class TimeSheetTaskDetails extends TimeSheetTaskDetailsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderTaskList = ({ item, index }: { item: MembersData; index: number }) => {
    return (
      <TouchableOpacity
        testID="openTaskDetails"
        style={{
          ...styles.mainListItemView,
          ...(index !== 0 ? { marginTop: 20 } : {}),
        }}>
        <View style={styles.mainItemView}>
          <View style={styles.mainBorderView}>
            <Image
              source={item.img}
              style={styles.taskListImage}
              resizeMode="contain"
            />
          </View>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.listName}>
            {item.name}
          </Text>
          <TouchableOpacity style={styles.listChatTouchView}>
            <Image
              source={imgChat}
              style={styles.chatImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.listRole}>{item.role}</Text>
        <Text style={styles.listTotalAllocatedLabel}>
          {`${configJSON.labelTotalWorkedHours}`}
          <Text style={styles.listTotalAllocatedTime}>
            {`${item.workedHours}`}
          </Text>
        </Text>
        <Text style={styles.listTotalAllocatedLabel}>
          {`${configJSON.labelStartDate}`}
          <Text style={styles.listTotalAllocatedTime}>
            {`${item.startDate}`}
          </Text>
        </Text>
      </TouchableOpacity>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    let { taskDetail } = this.state;
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.container}>
        {/* <ScrollView keyboardShouldPersistTaps="always"> */}
        <View style={styles.mainView}>
          <View style={styles.taskView}>
            <Image
              source={taskDetail.img}
              style={styles.taskImage}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.taskName}>{taskDetail.taskName}</Text>
              <Text style={styles.allocatedText}>
                {`${configJSON.labelTotalAllocatedTime}${taskDetail.allocatedTime}`}
              </Text>
              <Text style={styles.allocatedText}>
                {`${configJSON.labelTotalConsumedTime}${taskDetail.consumedTime}`}
              </Text>
            </View>
          </View>
          <Text style={styles.descriptionText}>
            {configJSON.labelDescriptionDots}
            <Text style={styles.allocatedText}>{taskDetail.desc}</Text>
          </Text>
          <View style={styles.membersView}>
            <Text style={styles.allMembersText}>{configJSON.allMembers}</Text>
            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
                marginRight: 10,
              }}>
              <TouchableOpacity
                testID="openCreateLog"
                style={styles.viewTaskTouchView}
                onPress={() => this.openCreateLog(taskDetail.id)}>
                <ImageBackground
                  source={bgGradientRectangle}
                  imageStyle={styles.gradientImageStyle}
                  style={styles.gradientImageBackground}>
                  <Text style={styles.buttonText}>{configJSON.create}</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
            <Text
              style={
                styles.membersCountText
              }>{`(${taskDetail.members.length})`}</Text>
          </View>
          <View style={styles.membersMainView}>
            <ScrollView
              style={styles.memberImagesView}
              horizontal
              bounces={false}
              contentContainerStyle={{ alignItems: "center" }}>
              {taskDetail.members.map((element: Members, position: number) => {
                return (
                  <View
                    key={element.key}
                    style={
                      position === 0
                        ? styles.memberSelectedView
                        : styles.memberUnselectedView
                    }>
                    <Image
                      source={element.img}
                      style={
                        position === 0
                          ? styles.memberSelectedImage
                          : styles.memberUnselectedImage
                      }
                      resizeMode="contain"
                    />
                  </View>
                );
              })}
            </ScrollView>
            <TouchableOpacity style={styles.dotsTouchView}>
              <Image
                source={imgDotsDark}
                style={styles.dotsIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <FlatList
            testID="testTaskList"
            style={styles.list}
            data={taskDetail.membersData}
            keyExtractor={(item: MembersData) => item.key}
            renderItem={this.renderTaskList}
          />
        </View>
        {/* </ScrollView> */}
      </SafeAreaView>
    );
    // Merge Engine - render - End
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
  taskView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  taskImage: {
    height: 55,
    width: 55,
    borderRadius: 25,
    marginEnd: 10,
  },
  taskName: {
    fontSize: 19,
    color: COLORS.black,
  },
  allocatedText: {
    fontSize: 14,
    color: "#73767A",
    marginTop: 4,
  },
  descriptionText: {
    fontSize: 19,
    color: "#73767A",
    marginTop: 8,
  },
  membersView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  allMembersText: {
    color: "#3F526D",
    fontSize: 19,
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
  membersCountText: {
    color: "#3F526D",
    fontSize: 14,
    textAlignVertical: "bottom",
  },
  dotsTouchView: {
    position: "absolute",
    right: 0,
    top: 0,
    marginLeft: -6,
    height: 30,
    width: 30,
  },
  dotsIcon: {
    height: 24,
    width: 24,
    alignSelf: "flex-end",
  },
  membersMainView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 20,
  },
  memberImagesView: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    marginEnd: 35,
  },
  memberSelectedView: {
    height: 47,
    width: 47,
    borderRadius: 24,
    borderColor: "#927FFC",
    borderWidth: 2,
    overflow: "hidden",
    marginEnd: -6,
  },
  memberSelectedImage: {
    height: 42,
    width: 42,
    borderRadius: 21,
  },
  memberUnselectedView: {
    height: 38,
    width: 38,
    borderRadius: 19,
    borderColor: COLORS.white,
    borderWidth: 2,
    overflow: "hidden",
    marginEnd: -6,
  },
  memberUnselectedImage: {
    height: 34,
    width: 34,
    borderRadius: 17,
  },
  list: {
    flex: 1,
  },
  listMargin: {
    height: 20,
  },
  mainListItemView: {
    padding: 16,
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EBEBEB",
    backgroundColor: "#F9F8FD",
  },
  mainItemView: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
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
    alignSelf: "center",
    flex: 1,
    marginEnd: 40,
    marginStart: 16,
    fontSize: 19,
  },
  listRole: {
    color: "#826FFC",
    marginTop: 20,
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
});
// Customizable Area End
