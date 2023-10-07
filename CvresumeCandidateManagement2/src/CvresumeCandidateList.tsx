// Customizable Area Start
import {
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End
// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End

import * as React from "react";

import CvresumeCandidateListController, {
  Props,
} from "./CvresumeCandidateListController";
import { SummaryData } from "./Types";
import Button from "./Button";
import { fontScale, height, openUrl, width } from "./helpers";
// Customizable Area End

export default class CvresumeCandidateList extends CvresumeCandidateListController {
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
  modalToViewProfile = () => {
    const { profileData } = this.state;

    return (
      <Modal visible={this.state.isViewprofile} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalMainView}>
            <Text style={[styles.profileStyle, styles.fs15]}>
              Person Name :
            </Text>
            <Text style={[styles.textStyle, styles.fs18, styles.text22]}>
              {profileData?.name}
            </Text>
          </View>
          <View style={styles.modalMainView}>
            <Text style={[styles.profileStyle, styles.fs15]}>Age :</Text>
            <Text style={[styles.textStyle, styles.fs18, styles.text22]}>
              {profileData?.age}
            </Text>
          </View>
          <View style={styles.modalMainView}>
            <Text style={[styles.profileStyle, styles.fs15]}>
              Years of Experience :
            </Text>
            <Text style={[styles.textStyle, styles.fs18, styles.text22]}>
              {profileData?.years_of_experience}
            </Text>
          </View>
          <View style={styles.modalMainView}>
            <Text style={[styles.profileStyle, styles.fs15]}>
              experience summary :
            </Text>
            <Text style={[styles.textStyle, styles.fs18, styles.text22]}>
              {profileData?.experience_summary}
            </Text>
          </View>
          <View style={styles.modalMainView}>
            <Text style={[styles.profileStyle, styles.fs15]}>
              Education summary :
            </Text>
            <Text style={[styles.textStyle, styles.fs18, styles.text22]}>
              {profileData?.education_summary}
            </Text>
          </View>
          <View style={styles.modalMainView}>
            <Text style={[styles.profileStyle, styles.fs15]}>
              Education file :
            </Text>
            <Button
              testID={`eye-btn-1`}
              icons="eye"
              backgroundColor="gray"
              width={20}
              height={20}
              onPress={() =>
                profileData?.education_file &&
                openUrl(profileData?.education_file)
              }
            />
          </View>
          <View style={styles.modalMainView}>
            <Text style={[styles.profileStyle, styles.fs15]}>
              experience file :
            </Text>
            <Button
              testID={`eye-btn-2`}
              icons="eye"
              height={20}
              width={20}
              backgroundColor="gray"
              onPress={() =>
                profileData?.experience_file &&
                openUrl(profileData?.experience_file)
              }
            />
          </View>

          <View style={styles.modalMainView}>
            <Button
              testID="btn-go-back"
              buttonText="go back"
              fontSize={10}
              backgroundColor="gray"
              onPress={this.toggleProfile}
            />
          </View>
        </View>
      </Modal>
    );
  };

  _renderItems = ({ item }: { item: SummaryData; index: number }) => {
    return (
      <View style={[styles.flatListView]}>
        <View style={styles.viewStyle}>
          <Text style={[styles.textStyle, styles.fs18, styles.textTitle]}>
            name:
          </Text>

          <Text style={[styles.fs18, styles.textNormal]}>
            {item?.attributes?.title}
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={[styles.textStyle, styles.fs15, styles.textTitle]}>
            summary :
          </Text>
          <Text style={[styles.fs15, styles.textNormal]}>
            {item?.attributes?.summary}
          </Text>
        </View>

        <View style={styles.viewStyle}>
          <Button
            testID="eye-icon"
            icons="eye"
            onPress={async () => openUrl(item?.attributes?.resume)}
            backgroundColor={"#0000cc"}
            fontSize={20}
          />
          <Button
            testID="go-to-home"
            buttonText="view candidate profile"
            onPress={() => this.goToDashboard(item?.attributes?.created_by)}
            backgroundColor={"#0000cc"}
            fontSize={10}
          />
        </View>
      </View>
    );
  };

  // Customizable Area End

  render() {
    // Customizable Area Start

    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback
          testID="hide-keyboard"
          onPress={() => {
            this.hideKeyboard();
          }}>
          <ScrollView style={styles.resumeContainer}>
            <View style={styles.summery}>
              <Text style={[styles.fs18, styles.resume]}>Public resumes</Text>
              <View style={styles.underline} />
              <View>
                <FlatList
                  testID="flat-list-public-resume"
                  contentContainerStyle={styles.contentContainerStyles}
                  data={this.state.publicResumes}
                  renderItem={this._renderItems}
                  keyExtractor={(item) => `${item.id}`}
                />
              </View>
              {this.modalToViewProfile()}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
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
    marginLeft: "auto",
    marginRight: "auto",
    width: width,
    height: height,
    backgroundColor: "#000",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },

  resumeContainer: {
    flex: 1,
    height: height,
    width: width,
  },
  text: {
    color: "#fff",
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
    width: width / 2 - 10,
    marginBottom: 10,
    height: height * (1 / 5),
    borderStyle: "solid",
    borderWidth: 0.3,
    padding: 5,
    borderRadius: 5,
    shadowColor: "#fff",
    shadowOpacity: 0.4,
    shadowOffset: { height: 1, width: 1 },
  },
  image: {
    width: "80%",
    resizeMode: "contain",
    height: height * (1 / 12),
  },
  ImageView: {
    position: "relative",
    borderRadius: height * (1 / 20),
    width: "50%",
    height: height * (1 / 12),
    marginLeft: "auto",
    marginRight: "auto",
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
  summery: {
    marginTop: 20,
  },
  textStyle: {
    fontSize: fontScale + 27,
    textAlign: "center",
    color: "#fff",
    textTransform: "capitalize",
    fontWeight: "bold",
    flex: 1,
  },
  fs18: {
    fontSize: fontScale + 18,
    marginBottom: 14,
  },
  underline: {
    width: "20%",
    backgroundColor: "#fff",
    height: 2,
    marginLeft: "auto",
    marginRight: "auto",
  },
  contentContainerStyles: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30,
  },
  flatListView: {
    width: width / 1.1,
    minHeight: 250,
    borderWidth: 2,
    elevation: 10,
    shadowColor: "#fcf",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 30,
    borderColor: "#fff",
    padding: "2%",
    borderRadius: 10,
  },
  imageView: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
  },
  viewStyle: {
    flexDirection: "row",
    marginTop: 10,
    alignContent: "center",

    flexWrap: "wrap",
  },
  fs15: {
    fontSize: fontScale + 12,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",

    textTransform: "capitalize",
  },
  buttonView: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginVertical: 12,
    backgroundColor: "#5568FE",

    marginLeft: "auto",
    marginRight: "auto",
  },
  textTitle: { flex: 0, textAlign: "left", width: "30%" },
  textNormal: {
    flex: 1,
    textAlign: "left",
    color: "#fff",
    textTransform: "capitalize",
  },
  modalMainView: {
    flexDirection: "row",
    marginTop: 10,
    alignContent: "center",
    alignItems: "center",

    flexWrap: "wrap",
    padding: "2%",
  },
  modalContainer: {
    width: width,
    height: height,
    backgroundColor: "black",
    borderRadius: 20,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
  },
  modalView: { width: width - 15, height: 60, marginTop: 10 },
  profileStyle: {
    color: "#fff",
    textTransform: "capitalize",
    fontFamily: "Helvetica",
    fontSize: fontScale + 20,
    fontWeight: "bold",
  },
  text22: {
    flex: 1,
    textAlign: "left",
    marginLeft: 10,
  },
  resume: { color: "#fff", textAlign: "center" },
});
// Customizable Area End
