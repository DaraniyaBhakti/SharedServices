import * as React from "react";

// Customizable Area Start
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";

import GoalManagementController, { Props } from "./GoalManagementController";
import {
  arrowFullRightIcon,
  background,
  createGoalIcon,
  retrieveGoalIcon,
} from "./assets";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

export default class GoalManagement extends GoalManagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    const { token } = this.state;
    // Merge Engine - render - Start
    return (
      <>
        <ImageBackground
          testID={"containerID"}
          style={styles.container}
          source={background}
          resizeMode={"cover"}>
          <SafeAreaView>
            <HeaderComponent
              title={""}
              onBackButton={this.handleNavigateHomeMobile}
            />
            <View style={styles.upperContainer}>
              <Text style={styles.upperTitle}>Hello, {"\n"}Welcome</Text>
            </View>
            <View style={styles.downContainer}>
              {token.length > 0 ? (
                <>
                  {[
                    {
                      title: "Create Goal",
                      onPress: this.handleNavigateGoalCreateMobile,
                      icon: createGoalIcon,
                    },
                    {
                      title: "Retrieve Goal",
                      onPress: this.handleGoToGoalRetrieve,
                      icon: retrieveGoalIcon,
                    },
                  ].map((item, index) => (
                    <TouchableOpacity
                      onPress={item.onPress}
                      key={index}
                      style={styles.itemChoice}>
                      <View style={styles.itemLeftContainer}>
                        <Image source={item.icon} />
                        <Text style={styles.itemLabel}>{item.title}</Text>
                      </View>
                      <Image source={arrowFullRightIcon} />
                    </TouchableOpacity>
                  ))}
                </>
              ) : (
                <View style={styles.tokenContainer}>
                  <Text style={styles.tokenLabel}>Getting Token</Text>
                  <ActivityIndicator size={"small"} color={"white"} />
                </View>
              )}
            </View>
          </SafeAreaView>
        </ImageBackground>
      </>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperContainer: {
    height: "40%",
    justifyContent: "center",
    padding: "10%",
  },
  downContainer: {
    height: "60%",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  itemChoice: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    height: 100,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  itemLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemLabel: {
    textTransform: "uppercase",
    marginLeft: 16,
  },
  upperTitle: {
    fontSize: 40,
    color: "white",
    lineHeight: 80,
  },
  tokenContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tokenLabel: {
    color: "white",
    fontSize: 18,
    marginRight: 16,
  },
});
// Customizable Area End
