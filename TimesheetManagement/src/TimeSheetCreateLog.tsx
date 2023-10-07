import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { bgGradientRectangle } from "./assets";
// Customizable Area End

import TimeSheetCreateLogController, {
  Props,
  configJSON,
} from "./TimeSheetCreateLogController";
import { COLORS } from "../../../framework/src/Globals";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default class TimeSheetCreateLog extends TimeSheetCreateLogController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderModal() {
    return (
      <DateTimePickerModal
        isVisible={this.state.isDateTimeModalShow}
        mode="datetime"
        onConfirm={this.handleConfirm}
        onCancel={this.handleCancel}
      />
    );
  }
  titleView() {
    return (
      <View>
        <Text style={styles.titleText}>{configJSON.labelTitle}</Text>
        <TextInput
          testID="txtTitleInput"
          style={styles.txtInput}
          {...this.txtTitleInputChange}
          numberOfLines={1}
          value={this.state.title}
        />
      </View>
    );
  }
  descriptionView() {
    return (
      <View>
        <Text style={styles.titleText}>{configJSON.labelDescription}</Text>
        <TextInput
          testID="txtDescriptionInput"
          style={[styles.txtInput, styles.descriptionText]}
          {...this.txtDescriptionInputChange}
          numberOfLines={8}
          multiline={true}
          underlineColorAndroid="transparent"
          value={this.state.description}
        />
      </View>
    );
  }

  startTimeView() {
    return (
      <View testID="txtStartTimeView">
        <Text style={styles.titleText}>{configJSON.labelStartTime}</Text>
        <TouchableOpacity
          testID="txtStartTimeTouch"
          activeOpacity={1}
          onPress={() => this.pressStartDate()}>
          <TextInput
            style={styles.txtInput}
            numberOfLines={1}
            value={this.state.startDate}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </View>
    );
  }
  endTimeView() {
    return (
      <View testID="txtEndTimeView">
        <Text style={styles.titleText}>{configJSON.labelEndTime}</Text>
        <TouchableOpacity
          testID="txtEndTimeTouch"
          activeOpacity={1}
          onPress={() => this.pressEndDate()}>
          <TextInput
            style={styles.txtInput}
            numberOfLines={1}
            value={this.state.endDate}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </View>
    );
  }
  buttonView() {
    return (
      <View style={styles.cancelView}>
        <TouchableOpacity
          testID="txtCancelTask"
          style={styles.viewTaskTouchView}
          onPress={() => this.cancelTasks()}>
          <ImageBackground
            source={bgGradientRectangle}
            imageStyle={styles.gradientImageStyle}
            style={styles.gradientImageBackground}>
            <Text style={styles.buttonText}>{configJSON.cancel}</Text>
          </ImageBackground>
        </TouchableOpacity>
        <View style={styles.buttonSpace} />
        <TouchableOpacity
          testID="txtCreateTask"
          style={styles.viewTaskTouchView}
          onPress={() => this.checkValidation()}>
          <ImageBackground
            source={bgGradientRectangle}
            imageStyle={styles.gradientImageStyle}
            style={styles.gradientImageBackground}>
            <Text style={styles.buttonText}>{configJSON.create}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="always">
          <TouchableWithoutFeedback
            testID="hideKeyboard"
            style={styles.container}
            onPress={() => {
              this.hideKeyboard();
            }}>
            <View style={styles.mainView}>
              {this.titleView()}
              {this.descriptionView()}
              {this.startTimeView()}
              {this.endTimeView()}
              {this.buttonView()}
              {this.renderModal()}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
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
  txtInput: {
    width: "100%",
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.black,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderColor: "#EBEBEB",
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
    flex: 1,
  },
  gradientImageBackground: {
    justifyContent: "center",
    alignItems: "center",
    height: 45,
  },
  gradientImageStyle: {
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.white,
  },
  titleText: {
    color: "#3F526D",
    fontSize: 19,
    marginTop: 20,
    marginBottom: 16,
  },
  descriptionText: {
    height: 200,
    paddingTop: 16,
    paddingBottom: 16,
  },
  cancelView: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 32,
  },
  buttonSpace: {
    width: 30,
  },
});
// Customizable Area End
