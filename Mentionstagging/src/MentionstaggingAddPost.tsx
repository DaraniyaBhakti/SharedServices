import React, { FC } from "react";
// Customizable Area Start
import {
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import {
  MentionInput,
  MentionSuggestionsProps,
  Suggestion,
} from "react-native-controlled-mentions";
import Modal from "react-native-modal";
import CheckBox from "@react-native-community/checkbox";
import Styles from "./MentionstaggingAddPost.Styles";
import Loader from "../../../components/src/Loader";
// Merge Engine - import assets - Start
// Merge Engine - import assets - End
// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// Customizable Area End
import MentionstaggingAddPostController, {
  Props,
  configJSON,
} from "./MentionstaggingAddPostController";
import { UserListTaggedItem } from "./domain/mentions.dto";
export default class MentionstaggingAddPost extends MentionstaggingAddPostController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  renderSuggestions: (
    suggestions: Suggestion[],
  ) => FC<MentionSuggestionsProps> =
    (suggestions) =>
    ({ keyword, onSuggestionPress }) => {
      if (keyword == null) {
        return null;
      }
      if (keyword.length === 0) {
        return (
          <ScrollView
            style={Styles.scrollViewRenderSuggestions}
            nestedScrollEnabled={true}>
            {suggestions.map((user) => (
              <TouchableOpacity
                testID={`userNameSuggestions-${user.id}`}
                key={user.id}
                onPress={() => onSuggestionPress(user)}
                style={Styles.padding12}>
                <Text>{user.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        );
      } else {
        return null;
      }
    };

  userModalItemView = (item: { item: UserListTaggedItem; index: number }) => {
    return (
      <View style={Styles.viewModalListItem}>
        <Text testID={"modalListUserName"} style={Styles.textColor}>
          {item.item.name}
        </Text>
        <View style={Styles.checkboxContainer}>
          <CheckBox
            testID={`checkBoxUserTag-${item.index}`}
            value={item.item.isTagged}
            onValueChange={() => this.checkBoxOnPress(item)}
            style={Styles.checkbox}
          />
        </View>
      </View>
    );
  };

  // Customizable Area End

  render() {
    // Customizable Area Start
    let tempUserName = this.state.usersList.filter(
      (item: { id: string }) => item.id === this.state.accountId.toString(),
    )[0]?.name;
    // Merge Engine - render - Start
    return (
      <KeyboardAvoidingView style={Styles.container} behavior={"padding"}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <TouchableWithoutFeedback
            accessible={false}
            testID={"touchableWithoutFeedback"}
            onPress={() => {
              this.hideKeyboard();
            }}>
            <>
              <View style={Styles.viewTopHeader}>
                <View style={Styles.viewFirstLetter}>
                  <Text testID={"textFirstLetter"} style={Styles.textColor}>
                    {tempUserName?.charAt(0)}
                  </Text>
                </View>
                <Text testID={"textUserName"} style={Styles.textTitle}>
                  {tempUserName?.charAt(0) + tempUserName?.slice(1)}
                </Text>
              </View>
              <Text style={Styles.textHeading}>Title*</Text>
              <View style={Styles.viewUserTags}>
                <TextInput
                  testID={"textInputPostTitle"}
                  placeholder="Post Title"
                  value={this.state.postTitle}
                  onChangeText={(text) => this.setPostTitle(text)}
                  style={[Styles.marginLeft10, Styles.textColor]}
                />
              </View>
              <Text style={Styles.textHeading}>Description</Text>
              <View style={Styles.viewUserTags}>
                <TextInput
                  testID={"textInputDescription"}
                  placeholder="Description"
                  value={this.state.postDescription}
                  onChangeText={(text) => this.setDescription(text)}
                  style={[Styles.marginLeft10, Styles.textColor]}
                />
              </View>
              <Text style={Styles.textHeading}>Body*</Text>
              <MentionInput
                testID={"textInputPostText"}
                value={this.state.postText}
                onChange={(text) => this.setPostText(text)}
                containerStyle={Styles.textInputPostText}
                partTypes={[
                  {
                    trigger: "@",
                    renderSuggestions: this.renderSuggestions(
                      this.state.usersList,
                    ),
                    isBottomMentionSuggestionsRender: true,
                    isInsertSpaceAfterMention: true,
                    textStyle: { color: "#437FFE", fontWeight: "700" },
                  },
                  {
                    pattern:
                      /(https?:\/\/|www\.)[-\w@:%.+~#=]{1,256}\.(xn--)?[a-z0-9-]{2,20}\b([-\w@:%+[\],.~#?&/=]*[-\w@:%+\]~#?&/=])*/gi,
                    textStyle: { color: "blue" },
                  },
                ]}
                placeholder="What's on your mind?"
              />
              <Text style={Styles.textHeading}>Location*</Text>
              <View style={Styles.viewUserTags}>
                <TextInput
                  testID={"textInputLocation"}
                  placeholder="Location"
                  value={this.state.location}
                  onChangeText={(text) => this.setLocation(text)}
                  style={[Styles.marginLeft10, Styles.textColor]}
                />
              </View>
              <TouchableOpacity
                testID={"btnAddTag"}
                onPress={() => this.setUserModalVisibility(true)}
                style={Styles.touchableImageTag}>
                <View style={Styles.viewUserTags}>
                  <Text
                    testID={"textUserTagged"}
                    style={[Styles.width88Pr, Styles.textColor]}>
                    <Text style={Styles.textTaggedUser}>Tagged users :</Text>{" "}
                    {this.state.taggedUserListString}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={Styles.marginBottom30}>
                <Button
                  testID={"btnSavePost"}
                  title={
                    this.state.isEditablePost
                      ? configJSON.labelEditPost
                      : configJSON.labelSavePost
                  }
                  onPress={() => this.validatePostData()}
                />
              </View>
              {this.state.isEditablePost && (
                <View style={Styles.marginBottom30}>
                  <Button
                    testID={"btnDeletePost"}
                    title={configJSON.labelDeletePost}
                    onPress={async () => {
                      await this.deletePost();
                    }}
                  />
                </View>
              )}
              <Modal isVisible={this.state.loading}>
                <Loader loading={this.state.loading} />
              </Modal>
              <Modal
                testID={"modalUserList"}
                isVisible={this.state.isUserModalVisible}
                onBackdropPress={() => this.setUserModalVisibility(false)}>
                <View style={Styles.modalView}>
                  <Text testID={"labelTagPeople"} style={Styles.textTitle}>
                    {configJSON.labelTagPeople}
                  </Text>
                  <FlatList
                    testID={"listUserName"}
                    style={Styles.width100Pr}
                    data={this.state.usersList}
                    keyExtractor={(item) => item.id}
                    renderItem={this.userModalItemView}
                  />
                </View>
              </Modal>
            </>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}
// Customizable Area Start
// Customizable Area End
