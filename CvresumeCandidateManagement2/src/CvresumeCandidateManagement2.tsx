// Customizable Area Start
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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
import React from "react";
import CvresumeCandidateManagement2Controller, {
  Props,
} from "./CvresumeCandidateManagement2Controller";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SummaryData } from "./Types";
import { imgProfile } from "./assets";
import SelectDropdown from "react-native-select-dropdown";
import Loader from "../../../components/src/Loader";
import Button from "./Button";
import { filterData, fontScale, height, openUrl, width } from "./helpers";
// Customizable Area End

export default class CvresumeCandidateManagement2 extends CvresumeCandidateManagement2Controller {
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

  _renderItems = ({ item, index }: { item: SummaryData; index: number }) => {
    return (
      <View style={[styles.flatListView]}>
        <View style={styles.viewExperience}>
          <Text style={[styles.mainText, styles.fs18, styles.textTitle]}>
            name:
          </Text>
          <Text style={[styles.fs18, styles.textNormal]}>
            {item?.attributes?.title}
          </Text>
        </View>
        <View style={styles.viewExperience}>
          <Text style={[styles.mainText, styles.fs15, styles.textTitle]}>
            summary :
          </Text>
          <Text style={[styles.fs15, styles.textNormal]}>
            {item?.attributes?.summary}
          </Text>
        </View>
        <View style={styles.viewExperience}>
          <Text style={[styles.mainText, styles.fs15, styles.textTitle]}>
            Publish type :
          </Text>
          <Text style={[styles.fs15, styles.textNormal]}>
            {JSON.stringify(item?.attributes?.allow_publish)}
          </Text>
        </View>
        <View style={styles.viewExperience}>
          <Button
            testID={`eye-btn-test-${index}`}
            icons="eye"
            onPress={() => openUrl(item?.attributes.resume)}
            backgroundColor={"#0000cc"}
            fontSize={20}
            width="25%"
          />
          <Button
            testID={`trash-btn-test-${index}`}
            icons="trash-can"
            fontSize={20}
            width="25%"
            onPress={() => this.deleteResumseById(item?.id)}
          />
          <Button
            testID={`edit-btn-test-${index}`}
            icons="pencil"
            backgroundColor={"#006600"}
            fontSize={20}
            width="25%"
            onPress={() => this.editById(item)}
          />
        </View>
      </View>
    );
  };

  modalToAddResume = () => {
    return (
      <Modal animationType="slide" visible={this.state.isAddResumeModalOpen}>
        <View style={{ height, width }}>
          <View style={styles.modalView}>
            <Text style={[styles.mainText, styles.newResumeText]}>
              Add New Resume
            </Text>
            <View style={styles.underline} />
          </View>
          <TextInput
            testID="inptu-title"
            placeholderTextColor="#fff"
            style={styles.textInputView}
            placeholder="Enter the title for this resume"
            value={this.state.title}
            onChangeText={(text) => this.handleChangeText(text, "title")}
          />
          <TouchableOpacity
            testID="inptu-file"
            style={styles.textInputView}
            activeOpacity={0.5}
            onPress={this.uploadResumeFile}>
            <Text style={styles.buttonTextStyle}>Select resume File</Text>
          </TouchableOpacity>
          <TextInput
            testID="inptu-summary-1"
            placeholderTextColor="#fff"
            style={styles.textInputView}
            placeholder="Enter your resume summary"
            value={this.state.summary}
            onChangeText={(text) => this.handleChangeText(text, "summary")}
          />

          <TouchableOpacity
            testID="chekc-box-btn"
            style={[styles.viewExperience, styles.allowPublishType]}
            onPress={this.toggleCheckbox}>
            {this.state.allow_publish ? (
              <MaterialCommunityIcons
                name="checkbox-marked-outline"
                size={30}
              />
            ) : (
              <MaterialCommunityIcons name="checkbox-blank-outline" size={30} />
            )}
            <Text style={[styles.mainText, styles.termsAndConditionStyles]}>
              do you want to show this resume to all?
            </Text>
          </TouchableOpacity>
          <View style={styles.viewExperience}>
            <Button
              testID="toggle-resume"
              buttonText="cancel"
              backgroundColor="#260041"
              onPress={this.toggleAddResumeModal}
            />
            <Button
              testID="btn-handle-resume"
              buttonText={this.state.resumeEditId ? "update" : "submit"}
              backgroundColor="#003300"
              onPress={() => this.handleSubmitResume()}
            />
          </View>
        </View>
      </Modal>
    );
  };

  modalToViewProfile = () => {
    const { profileData } = this.state;

    return (
      <Modal
        visible={this.state.isProfileShown}
        onDismiss={this.toggleProfile}
        onRequestClose={this.toggleProfile}
        animationType="slide">
        <View style={styles.viewStyles}>
          <View style={styles.viewExperience}>
            <Text style={[styles.viewprofile, styles.fs15]}>Person Name :</Text>
            <Text style={[styles.mainText, styles.fs18, styles.textPro]}>
              {profileData?.name}
            </Text>
          </View>
          <View style={styles.viewExperience}>
            <Text style={[styles.viewprofile, styles.fs15]}>Age :</Text>
            <Text style={[styles.mainText, styles.fs18, styles.textPro]}>
              {profileData?.age}
            </Text>
          </View>
          <View style={styles.viewExperience}>
            <Text style={[styles.viewprofile, styles.fs15]}>
              Years of Experience :
            </Text>
            <Text style={[styles.mainText, styles.fs18, styles.textPro]}>
              {profileData?.years_of_experience}
            </Text>
          </View>
          <View style={styles.viewExperience}>
            <Text style={[styles.viewprofile, styles.fs15]}>
              experience summary :
            </Text>
            <Text style={[styles.mainText, styles.fs18, styles.textPro]}>
              {profileData?.experience_summary}
            </Text>
          </View>
          <View style={styles.viewExperience}>
            <Text style={[styles.viewprofile, styles.fs15]}>
              Education summary :
            </Text>
            <Text style={[styles.mainText, styles.fs18, styles.textPro]}>
              {profileData?.education_summary}
            </Text>
          </View>
          <View style={styles.viewExperience}>
            <Text style={[styles.viewprofile, styles.fs15]}>
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
          <View style={styles.viewExperience}>
            <Text style={[styles.viewprofile, styles.fs15]}>
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

          <View style={styles.viewExperience}>
            <Button
              testID="btn-go-back"
              buttonText="go back"
              fontSize={10}
              backgroundColor="gray"
              onPress={this.toggleProfile}
            />
            <Button
              testID="btn-edit-profile"
              buttonText="edit profile"
              fontSize={10}
              backgroundColor="gray"
              onPress={() => this.editProfileByUserId(profileData)}
            />
          </View>
        </View>
      </Modal>
    );
  };

  modalToAddProfile = () => {
    return (
      <Modal animationType="slide" visible={!this.state.isProfileCreated}>
        <View>
          <Text style={styles.MainText}>
            {this.state.isEditProfile ? "update profile" : "Create a Profile"}
          </Text>
          <TextInput
            testID="input-name"
            placeholderTextColor="#fff"
            style={styles.textInputView}
            placeholder="Enter your profile name"
            value={this.state.name}
            onChangeText={(text: string) => this.handleChangeText(text, "name")}
          />
          <TextInput
            testID="input-age"
            placeholderTextColor="#fff"
            style={styles.textInputView}
            placeholder="Enter your age"
            keyboardType="numeric"
            value={
              this.state.personAge ? String(this.state.personAge) : undefined
            }
            maxLength={3}
            onChangeText={(text: string) =>
              this.handleChangeText(text, "personAge")
            }
          />
          <TextInput
            testID="input-experience"
            placeholderTextColor="#fff"
            style={styles.textInputView}
            placeholder="Enter your years of experience"
            keyboardType="numeric"
            value={
              this.state.years_of_experience
                ? String(this.state.years_of_experience)
                : undefined
            }
            maxLength={3}
            onChangeText={(text: string) =>
              this.handleChangeText(text, "years_of_experience")
            }
          />
          <TextInput
            testID="input-experience_summary"
            placeholderTextColor="#fff"
            style={styles.textInputView}
            placeholder="Enter your profile experience summary"
            value={this.state.experience_summary}
            onChangeText={this.onChangeTextExperience}
          />
          <TextInput
            testID="input-education_summary"
            placeholderTextColor="#fff"
            style={styles.textInputView}
            placeholder="Enter your profile education summary"
            value={this.state.education_summary}
            onChangeText={this.onChangeEducationSummary}
          />
          <TouchableOpacity
            testID="btn-upload-file-2"
            style={styles.textInputView}
            activeOpacity={0.5}
            onPress={this.uploadEducationFile}>
            <Text style={styles.buttonTextStyle}>Select education File</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="btn-upload-file-1"
            style={styles.textInputView}
            activeOpacity={0.5}
            onPress={this.uploadExperienceFile}>
            <Text style={styles.buttonTextStyle}>select experience File</Text>
          </TouchableOpacity>

          <Button
            testID="btn-handle-add-resume"
            buttonText={this.state.isEditProfile ? "update" : "submit"}
            onPress={this.handleSubmit}
          />
        </View>
      </Modal>
    );
  };

  _renderCustomDropdown = (item: string) => {
    return (
      <View style={styles.customDropDownStyles}>
        <Text style={styles.textDrop}>{item}</Text>
      </View>
    );
  };

  _renderCustomButton = () => (
    <MaterialCommunityIcons name="tune-vertical" size={30} color={"#b3b3b3"} />
  );

  // Customizable Area End

  render() {
    // Customizable Area Start
    if (this.state.isLoading) {
      return <Loader loading />;
    }
    // Merge Engine - render - Start
    return (
      <>
        <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback
            data-testID="hide-keyboard"
            onPress={() => {
              this.hideKeyboard();
            }}>
            <ScrollView>
              <View style={styles.header}>
                <TouchableOpacity
                  data-testID="toggle-profile"
                  onPress={this.toggleProfile}
                  style={styles.circleImg}>
                  <Image source={imgProfile} style={styles.img} />
                </TouchableOpacity>
                <Text style={styles.mainText}>Dashboard</Text>
              </View>

              <View style={styles.textInputView}>
                <Octicons name="search" size={30} color={"#b3b3b3"} />
                <TextInput
                  data-testID="search-id"
                  style={styles.textInputStyle}
                  onChangeText={(text: string) => this.searchByText(text)}
                  placeholder={"search"}
                  placeholderTextColor={"#b3b3b3"}
                  value={this.state.searchText}
                />
                <SelectDropdown
                  data-testID="bntFilter-resume"
                  buttonStyle={styles.icon}
                  renderCustomizedButtonChild={this._renderCustomButton}
                  dropdownStyle={styles.dropDownStyles}
                  renderCustomizedRowChild={(item: string) =>
                    this._renderCustomDropdown(item)
                  }
                  onChangeSearchInputText={() => {}}
                  data={filterData}
                  onSelect={(selectedItem) => {
                    this.filteredByType(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item) => {
                    return item;
                  }}
                />
              </View>
              <View style={styles.viewExperience}>
                <Button
                  testID="add-new-resume-button"
                  buttonText="Add New Resume"
                  backgroundColor="#003300"
                  onPress={this.toggleAddResumeModal}
                />
                <Button
                  testID="go-to-template-button"
                  buttonText="Go to  Template"
                  backgroundColor="#003300"
                  onPress={this.handleGetAllTemplates}
                />
                <Button
                  testID="public-resume-button"
                  buttonText="Publically available resumes"
                  backgroundColor="#003300"
                  onPress={this.handlePublicallyAvailable}
                  width="90%"
                />
              </View>
              <View style={styles.summery}>
                <Text style={[styles.mainText, styles.fs18]}>My resumes</Text>
                <View style={styles.underline} />

                <FlatList
                  testID="render-all-resume"
                  contentContainerStyle={styles.contentContainerStyles}
                  data={this.state.summaryDetails}
                  renderItem={this._renderItems}
                  keyExtractor={(item) => `${item.id}`}
                />
              </View>

              {this.modalToAddResume()}
              {this.modalToAddProfile()}
              {this.modalToViewProfile()}
            </ScrollView>
          </TouchableWithoutFeedback>
        </SafeAreaView>
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
    marginLeft: "auto",
    marginRight: "auto",
    width: width,
    height: height,
    backgroundColor: "#000",
  },
  icon: { width: 50, height: 60, backgroundColor: "transparent" },
  header: {
    flexDirection: "row",
    width: width / 1.1,
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  MainText: {
    fontSize: fontScale + 20,
    textAlign: "center",
    marginTop: 3,
    marginBottom: 3,
  },
  resumeContainer: {
    flex: 1,
    height: height,
    width: width,
    alignItems: "center",
    justifyContent: "center",
  },
  uri: {
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  newResumeText: { color: "#000", marginBottom: 0 },
  dropDownStyles: { width: 60, borderRadius: 4 },
  mainText: {
    fontSize: fontScale + 27,
    textAlign: "center",
    color: "#fff",
    textTransform: "capitalize",
    fontWeight: "bold",
    flex: 1,
  },
  textInputView: {
    backgroundColor: "#606060",
    width: width - 15,
    height: 60,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 12,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 10,
    marginTop: 10,
    elevation: 30,
    shadowColor: "#fff",
    color: "#fff",
  },
  textInputStyle: {
    flex: 1,
    marginLeft: 5,
    fontSize: fontScale + 16,
    height: 60,
    color: "#fff",
    textAlign: "center",
    borderBottomColor: "#fff",
    borderBottomWidth: 2,
  },
  fs18: {
    fontSize: fontScale + 18,
    marginBottom: 14,
  },
  fs15: {
    fontSize: fontScale + 12,
    marginBottom: 10,
  },
  summery: {
    marginTop: 20,
  },
  underline: {
    width: "20%",
    backgroundColor: "#fff",
    height: 2,
    marginLeft: "auto",
    marginRight: "auto",
  },
  flatListView: {
    width: width / 1.05,
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
  contentContainerStyles: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30,
  },
  imageView: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 75,
  },
  viewExperience: {
    flexDirection: "row",
    marginTop: 10,
    alignContent: "center",
    alignItems: "center",

    flexWrap: "wrap",
    padding: "2%",
  },
  circleImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 25,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  viewStyles: {
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
  textTitle: { flex: 0, textAlign: "left", width: "30%" },
  textNormal: {
    flex: 1,
    textAlign: "left",
    color: "#fff",
    textTransform: "capitalize",
  },
  viewprofile: {
    color: "#fff",
    textTransform: "capitalize",
    fontFamily: "Helvetica",
    fontSize: fontScale + 20,
    fontWeight: "bold",
  },
  textPro: {
    flex: 1,
    textAlign: "left",
    marginLeft: 10,
  },
  allowPublishType: {
    marginLeft: "auto",
    marginRight: "auto",
    width: width / 1.1,
  },
  customDropDownStyles: {
    flexDirection: "row",
    alignItems: "center",
    width: 100,
    padding: "3%",
  },
  textDrop: { fontSize: 15, textTransform: "capitalize" },
  termsAndConditionStyles: { color: "#000", fontSize: fontScale + 14 },
});
// Customizable Area End
