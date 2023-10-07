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
import CheckBox from "@react-native-community/checkbox";
import { imgFilter } from "./assets";
import Modal from "react-native-modal";
import Styles from "./MentionstaggingList.Styles";
import Loader from "../../../components/src/Loader";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import MentionstaggingListController, {
  Props,
  configJSON,
} from "./MentionstaggingListController";
import { MentionedList } from "./domain/mentions.dto";

export default class MentionstaggingList extends MentionstaggingListController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  mentionedItemView = (data: { item: MentionedList; index: number }) => {
    const { item } = data;
    let userName = this.state.usersList.filter(
      (element: { id: string }) =>
        element.id === item.creatorAccountId.toString(),
    )[0]?.name;
    return (
      <TouchableOpacity
        testID={`touchableListMentionsTaggingItem-${item.id}`}
        onPress={() => {
          this.navigateToPostDetail(item.postId);
        }}>
        <View style={Styles.viewPostItem}>
          <View style={Styles.viewFirstLetter}>
            <Text testID={"textUserFirstAlphabet"} style={Styles.textColor}>
              {userName?.charAt(0).toUpperCase()}
            </Text>
          </View>

          <Text
            testID={"textItemMentionsTagging"}
            style={Styles.textMentionsItem}>
            {userName}
            <Text>{item.isMentioned ? " mentioned " : " tagged "}</Text>
            you in the
            <Text>{item.isPost ? " post" : " comment"}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={Styles.container}>
        <TouchableWithoutFeedback
          testID={"touchableWithoutFeedback"}
          onPress={() => {
            this.hideKeyboard();
          }}>
          <View style={Styles.viewParent}>
            <View style={Styles.viewTopHeader}>
              <Text testID={"labelMentionsTagging"} style={Styles.textTitle}>
                {configJSON.labelMentionsTagging}
              </Text>
              <TouchableOpacity
                testID={"btnFilter"}
                style={Styles.touchableFilter}
                onPress={() => this.setFilterModalVisibility(true)}>
                <Image
                  testID={"btnFilterImage"}
                  style={Styles.imagFilter}
                  source={imgFilter}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              testID={"listMentionsTaggingItem"}
              data={this.filterList()}
              renderItem={this.mentionedItemView}
              ListEmptyComponent={() => {
                return (
                  <View style={Styles.emptyFlatList}>
                    <Text style={Styles.textNoComment}>No Activity</Text>
                  </View>
                );
              }}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />

            <Modal
              testID={"modalFilter"}
              isVisible={this.state.isFilterModalVisible}
              onBackdropPress={() => this.setFilterModalVisibility(false)}>
              <View style={Styles.modalView}>
                <Text testID={"labelTagPeople"} style={Styles.textTitle}>
                  {configJSON.labelTagPeople}
                </Text>
                <View style={Styles.viewModalListItem}>
                  <Text
                    testID={"modalListUserName"}
                    style={[Styles.textColor, Styles.textFilterModalItem]}>
                    Tagged
                  </Text>
                  <View style={Styles.checkboxContainer}>
                    <CheckBox
                      testID={"checkboxTagged"}
                      value={this.state.filterIsTagged}
                      onValueChange={() => {
                        this.setFilterIsTagged();
                      }}
                      style={Styles.checkbox}
                    />
                  </View>
                </View>
                <View style={Styles.viewModalListItem}>
                  <Text
                    testID={"modalListUserName"}
                    style={[Styles.textColor, Styles.textFilterModalItem]}>
                    Mentioned
                  </Text>
                  <View style={Styles.checkboxContainer}>
                    <CheckBox
                      testID={"checkBoxMentioned"}
                      value={this.state.filterIsMentioned}
                      onValueChange={() => {
                        this.setFilterIsMentioned();
                      }}
                      style={Styles.checkbox}
                    />
                  </View>
                </View>
              </View>
            </Modal>
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
