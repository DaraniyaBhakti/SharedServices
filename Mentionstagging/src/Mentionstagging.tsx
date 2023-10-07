import React from "react";
// Customizable Area Start
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { imgAddPost, imgMentions } from "./assets";
import Styles from "./Mentionstagging.Styles";
import Modal from "react-native-modal";
// Merge Engine - import assets - Start
// Merge Engine - import assets - End
// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
import MentionstaggingController, {
  Props,
  configJSON,
} from "./MentionstaggingController";
import Loader from "../../../components/src/Loader";
import { replaceMentionValues } from "react-native-controlled-mentions";
import { PostListItem } from "./domain/mentions.dto";
// Customizable Area End

export default class Mentionstagging extends MentionstaggingController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  postItemView = (data: { item: PostListItem; index: number }) => {
    const { item } = data;
    let userName = this.state.userList.filter(
      (element: { id: string }) => element.id === item.accountId.toString(),
    )[0]?.name;
    let postText = replaceMentionValues(item.body, ({ name }) => `@${name}`);
    return (
      <>
        {userName !== undefined && (
          <TouchableOpacity
            testID={`touchableListPostItem-${item.id}`}
            onPress={() => {
              this.navigateToPostDetail(item.id);
            }}>
            <View style={Styles.viewPostItem}>
              <Text style={Styles.textUserNameList} testID={"textItemUserName"}>
                {userName.charAt(0).toUpperCase() + userName.slice(1)}
              </Text>
              <Text testID={"textItemPostText"}>
                {postText.split(" ").map((word: string, postIndex: number) => (
                  <Text
                    key={word + postIndex.toString()}
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
          </TouchableOpacity>
        )}
      </>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    // return unsubscribe;
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={Styles.container}>
        <TouchableWithoutFeedback
          testID={"touchableWithoutFeedback"}
          onPress={() => {
            this.hideKeyboard();
          }}>
          <View style={Styles.viewContainer}>
            <View style={Styles.viewTopHeader}>
              <Text testID={"labelPost"} style={Styles.textTitle}>
                {configJSON.labelPost}
              </Text>
              <TouchableOpacity
                testID={"btnAddPost"}
                style={Styles.touchableAddPost}
                onPress={() => this.navigateToAddPost()}>
                <Image
                  testID={"btnAdPostImage"}
                  style={Styles.imagAddPost}
                  source={imgAddPost}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              testID={"listPostItem"}
              data={this.state.postDataList}
              renderItem={this.postItemView}
              keyExtractor={(item: { id: string }) => item.id}
              showsVerticalScrollIndicator={false}
              style={Styles.flatList}
              ListEmptyComponent={() => {
                return (
                  <View style={Styles.listEmptyFlatList}>
                    <Text style={Styles.textNoPost}>No Post Available</Text>
                  </View>
                );
              }}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.navigateToMentionsTaggingList()}
              style={Styles.touchableOpacityStyle}
              testID={"btnMentionsTagging"}>
              <Image
                source={imgMentions}
                testID={"imgMentionsTagging"}
                style={Styles.floatingButtonStyle}
              />
            </TouchableOpacity>
            <Modal isVisible={this.state.loading}>
              <Loader loading={this.state.loading} />
            </Modal>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}
// Customizable Area Start
// Customizable Area End
