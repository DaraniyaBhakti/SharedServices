import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";

// Merge Engine - import assets - Start
import { homeScreen, bgGradientRectangle } from "./assets";
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End

// Customizable Area End

import TimesheetManagementController, {
  Props,
  configJSON,
} from "./TimesheetManagementController";
import { COLORS } from "../../../framework/src/Globals";

export default class TimesheetManagement extends TimesheetManagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <View>
          <Image
            source={homeScreen}
            style={styles.imgHome}
            resizeMode="stretch"
          />
          <Text style={styles.textView}>{configJSON.labelSelectOption}</Text>
          <TouchableOpacity
            testID="openTimeSheet"
            style={styles.timeSheetTouchView}
            onPress={() => this.openTimeSheets()}>
            <ImageBackground
              source={bgGradientRectangle}
              imageStyle={styles.gradientImageStyle}
              style={styles.gradientImageBackground}>
              <Text style={styles.buttonText}>
                {configJSON.labeViewTimeSheets}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            testID="openViewTask"
            style={styles.viewTaskTouchView}
            onPress={() => this.openTasks()}>
            <ImageBackground
              source={bgGradientRectangle}
              imageStyle={styles.gradientImageStyle}
              style={styles.gradientImageBackground}>
              <Text style={styles.buttonText}>{configJSON.labelViewTasks}</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  imgHome: {
    width: "100%",
    height: "auto",
    minHeight: 422,
  },
  textView: {
    alignSelf: "center",
    marginTop: 30,
    fontSize: 21,
    fontWeight: "400",
    color: COLORS.black,
    opacity: 0.5,
  },
  timeSheetTouchView: {
    marginTop: 50,
  },
  viewTaskTouchView: {
    marginVertical: 15,
  },
  gradientImageBackground: {
    marginHorizontal: 28,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
  },
  gradientImageStyle: {
    borderRadius: 8,
    width: "100%",
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.white,
  },
});
// Customizable Area End
