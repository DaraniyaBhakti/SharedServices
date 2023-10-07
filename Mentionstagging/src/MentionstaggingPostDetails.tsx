import React, { FC } from "react";

// Customizable Area Start
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

// Merge Engine - import assets - Start
import {
  imgComment,
  imgEdit,
  imgDeleteComment,
  imgEditComment,
} from "./assets";
import Styles from "./MentionstaggingPostDetails.Styles";
import {
  MentionInput,
  MentionSuggestionsProps,
  replaceMentionValues,
  Suggestion,
} from "react-native-controlled-mentions";
// Merge Engine - import assets - End
// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
import Modal from "react-native-modal/dist/modal";
import Loader from "../../../components/src/Loader";
// Customizable Area End

import MentionstaggingPostDetailsController, {
  Props,
  configJSON,
} from "./MentionstaggingPostDetailsController";
import { CommentListItem } from "./domain/mentions.dto";

export default class MentionstaggingPostDetails extends MentionstaggingPostDetailsController {
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
            style={Styles.scrollViewRenderSuggestion}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="always">
            {suggestions
              .filter((user) =>
                user.name
                  .toLocaleLowerCase()
                  .includes(keyword.toLocaleLowerCase()),
              )
              .map((user) => (
                <TouchableOpacity
                  testID={`itemUserSuggestion-${user.id}`}
                  key={user.id}
                  onPress={() => onSuggestionPress(user)}
                  style={Styles.padding12}>
                  <Text style={Styles.textColor}>{user.name}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        );
      } else {
        return null;
      }
    };

  commentListItemView = (data: { item: CommentListItem; index: number }) => {
    const { item } = data;
    return (
      <TouchableOpacity style={Styles.viewCommentListItem}>
        <View style={Styles.width85Pr}>
          <Text
            testID={"textCommentUserName"}
            style={[Styles.textUserName, Styles.textColor]}>
            {item.name}
          </Text>
          <Text testID={"textComment"} style={Styles.textComment}>
            {replaceMentionValues(item.commentText, ({ name }) => `@${name}`)
              .split(" ")
              .map((word: string, index: number) => (
                <Text
                  key={word + index.toString()}
                  style={
                    word.charAt(0) === "@"
                      ? Styles.textMentionBold
                      : Styles.textMention
                  }>
                  {word + " "}
                </Text>
              ))}
          </Text>
        </View>
        {item.accountID === this.state.userAccountId ? (
          <View style={Styles.flexDirRow}>
            <TouchableOpacity
              testID={`btnEditComment-${item.id}`}
              onPress={() =>
                this.setEditComment(
                  true,
                  parseInt(item.id, 10),
                  item.commentText,
                )
              }>
              <Image
                testID={"imgEditComment"}
                style={Styles.imgEditDelete}
                source={imgEditComment}
              />
            </TouchableOpacity>
            <TouchableOpacity
              testID={`btnDeleteComment-${item.id}`}
              onPress={() => this.deleteComment(item.id)}>
              <Image
                testID={"imgDeleteComment"}
                style={Styles.imgEditDelete}
                source={imgDeleteComment}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  renderHeader = () => {
    let userName = this.state.usersList.filter(
      (element) => element.id === this.state.accountId.toString(),
    )[0]?.name;
    return (
      <View style={Styles.zIndex}>
        <View style={Styles.viewTopHeader}>
          <View style={Styles.flexDirRow}>
            <View style={Styles.viewFirstLetter}>
              <Text testID={"textUserFirstAlphabet"} style={Styles.textColor}>
                {userName?.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text
              testID={"textUserName"}
              style={[Styles.textTitle, Styles.textColor]}>
              {userName?.charAt(0).toUpperCase() + userName?.slice(1)}
            </Text>
          </View>
          {this.state.accountId === this.state.userAccountId && (
            <TouchableOpacity
              testID={"btnPostEdit"}
              onPress={() => this.navigateToAddPostScreen()}>
              <Image
                testID={"imgPostEdit"}
                style={Styles.imgEditPost}
                source={imgEdit}
              />
            </TouchableOpacity>
          )}
        </View>

        <Text style={Styles.textHeading}>Title</Text>
        <View style={[Styles.postText, Styles.viewUserTag]}>
          <Text testID={"textPostTitle"} style={Styles.textColor}>
            {this.state.postTitle}
          </Text>
        </View>

        {this.state.postDescription !== "" && (
          <>
            <Text style={Styles.textHeading}>Description</Text>
            <View style={[Styles.postText, Styles.viewUserTag]}>
              <Text testID={"textPostDescription"} style={Styles.textColor}>
                {this.state.postDescription}
              </Text>
            </View>
          </>
        )}
        <Text style={Styles.textHeading}>Body</Text>
        <Text style={[Styles.postText, Styles.textColor, Styles.viewUserTag]}>
          {this.state.postText.split(" ").map((word: string, index: number) => (
            <Text
              key={word + index.toString()}
              style={
                word.charAt(0) === "@"
                  ? Styles.textMentionBold
                  : Styles.textMention
              }>
              {word + " "}
            </Text>
          ))}
        </Text>

        {this.state.location !== "" && (
          <>
            <Text style={Styles.textHeading}>Location</Text>
            <View style={[Styles.postText, Styles.viewUserTag]}>
              <Text testID={"textLocation"} style={Styles.textColor}>
                {this.state.location}
              </Text>
            </View>
          </>
        )}

        {this.state.taggedUserListString !== "" && (
          <>
            <Text style={Styles.textHeading}>Tagged Users</Text>
            <View style={[Styles.postText, Styles.viewUserTag]}>
              <Text
                testID={"textSelectedUserTag"}
                style={[Styles.textColor, Styles.width88Pr]}>
                {this.state.taggedUserListString
                  .split(" ")
                  .map((word: string, index: number) => (
                    <Text
                      key={word + index.toString()}
                      style={
                        word.charAt(0) === "@"
                          ? Styles.textMentionBold
                          : Styles.textMention
                      }>
                      {" "}
                      {word + " "}
                    </Text>
                  ))}
              </Text>
            </View>
          </>
        )}
      </View>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={Styles.container}>
          <ScrollView
            style={Styles.viewContainer}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps={true}>
            <TouchableWithoutFeedback
              accessible={true}
              testID={"touchableWithoutFeedback"}
              onPress={() => {
                this.hideKeyboard();
              }}>
              <View>
                {this.renderHeader()}
                <FlatList
                  testID={"listCommentList"}
                  nestedScrollEnabled={true}
                  data={this.state.commentsData}
                  renderItem={this.commentListItemView}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={Styles.flexGrow}
                  keyboardShouldPersistTaps="always"
                  ListEmptyComponent={() => {
                    return (
                      <View style={Styles.emptyFlatList}>
                        <Text style={Styles.textNoComment}>No Comments</Text>
                      </View>
                    );
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
          <View style={Styles.flex1}>
            <View style={Styles.viewCommentInput}>
              <View style={Styles.flexDirRow}>
                <Image
                  testID={"imageComment"}
                  style={[Styles.imgUserTag, Styles.imgComment]}
                  source={imgComment}
                />

                <MentionInput
                  testID={"textInputComment"}
                  value={this.state.commentText}
                  onChange={(text: string) => this.setCommentText(text)}
                  containerStyle={[Styles.width80Pr]}
                  partTypes={[
                    {
                      trigger: "@",
                      renderSuggestions: this.renderSuggestions(
                        this.state.usersList,
                      ),
                      isInsertSpaceAfterMention: true,
                      textStyle: { color: "#437FFE", fontWeight: "700" },
                    },
                    {
                      pattern:
                        /(https?:\/\/|www\.)[-\w@:%.+~#=]{1,256}\.(xn--)?[a-z0-9-]{2,20}\b([-\w@:%+[\],.~#?&/=]*[-\w@:%+\]~#?&/=])*/gi,
                      textStyle: { color: "blue" },
                    },
                  ]}
                  placeholder="Comment...."
                  style={Styles.padding12}
                />
              </View>
              <TouchableOpacity
                onPress={async () => {
                  await this.addComment();
                  this.hideKeyboard();
                }}
                style={Styles.imgComment}
                testID={"btnAddComment"}>
                <Text testID={"textPost"} style={Styles.textPost}>
                  {this.state.isEditComment ? "Update" : configJSON.labelSave}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Modal isVisible={this.state.loading}>
            <Loader loading={this.state.loading} />
          </Modal>
        </KeyboardAvoidingView>
      </>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}
// Customizable Area Start
// Customizable Area End
