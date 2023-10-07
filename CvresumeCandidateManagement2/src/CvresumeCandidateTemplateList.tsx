// Customizable Area Start
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End
// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
import React from "react";
import { imgDOCType } from "./assets";
import CvresumeCandidateTemplateListController, {
  Props,
} from "./CvresumeCandidateTemplateListController";
import { TemplateDataTypes } from "./Types";
import { openUrl, width, height } from "./helpers";
// Customizable Area End

export default class CvresumeCandidateTemplateList extends CvresumeCandidateTemplateListController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    Dimensions.addEventListener("change", () => {
      MergeEngineUtilities.init(
        artBoardHeightOrg,
        artBoardWidthOrg,
        Dimensions.get("window").height,
        Dimensions.get("window").width,
      );

      this.forceUpdate();
    });
    // Customizable Area End
  }

  // Customizable Area Start

  _renderItem = ({
    item,
    index,
  }: {
    item: TemplateDataTypes;
    index: number;
  }) => (
    <View key={index} style={styles.card}>
      <View style={styles.iconView}>
        <TouchableOpacity
          testID="btn-to-open-link"
          style={styles.iconOpacity}
          onPress={() => openUrl(item.templateUrl)}>
          <FontAwesomeIcon name="cloud-download" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.ImageView}>
        <Image source={imgDOCType} style={styles.image} />
      </View>
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );
  _keyExtractor = ({ id }: { id: number }) => `${id}`;

  // Customizable Area End

  render() {
    // Customizable Area Start

    // Merge Engine - render - Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          testID="hide-keyboard"
          onPress={() => {
            this.hideKeyboard();
          }}>
          <SafeAreaView style={styles.resumeContainer}>
            <Text style={[styles.text, styles.heading]}>Template List</Text>
            <View style={styles.cardParent}>
              <FlatList
                testID="flat-list-template"
                contentContainerStyle={styles.cardParent}
                data={this.state.templateResumes}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
              />
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
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

    marginLeft: "auto",
    marginRight: "auto",
    width: width,
    height: height,
    backgroundColor: "#000",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },

  resumeContainer: {
    flex: 1,
    height: height,
    width: width,
  },
  text: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 8,
  },
  cardParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    flexWrap: "wrap",
    padding: 2,
    marginTop: 20,
  },
  card: {
    borderColor: "#fff",
    backgroundColor: "#fff",
    width: width / 2 - 10,
    marginBottom: 10,
    height: height * (1 / 4),
    borderStyle: "solid",
    borderWidth: 0.3,
    padding: 5,
    borderRadius: 5,
    shadowColor: "#fff",
    shadowOpacity: 0.4,
    shadowOffset: { height: 1, width: 1 },
  },
  image: {
    width: "100%",
    resizeMode: "cover",
    height: "100%",
    borderRadius: height * (1 / 20),
  },
  ImageView: {
    position: "relative",
    borderRadius: height * (1 / 20),
    width: height * (1 / 10),
    height: height * (1 / 10),
    marginLeft: "auto",
    marginRight: "auto",
    alignContent: "center",
    justifyContent: "center",
  },
  imageText: {
    position: "absolute",
    top: "40%",
    left: "30%",
    color: "#000000",
  },
  iconView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconOpacity: {
    marginLeft: 12,
    borderRadius: 20,
    width: 40,
    height: 40,
    backgroundColor: "#666666",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
// Customizable Area End
