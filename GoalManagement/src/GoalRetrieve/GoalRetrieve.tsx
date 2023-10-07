import * as React from "react";

// Customizable Area Start
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent";

import GoalRetrieveController, { Props } from "./GoalRetrieveController";
import { Calendar } from "react-native-calendars";
import GoalItemList from "../components/GoalItemList/GoalItemList";
import { dropdownIcon, searchIcon } from "../assets";
import { Button } from "react-native-elements";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

export default class GoalRetrieve extends GoalRetrieveController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    const {
      calendarVisible,
      filterVisible,
      filterSelectionVisible,
      isLoading,
      goalList,
      token,
      isFiltered,
      nameFilter,
      dateFilter,
      nameFilterLoading,
    } = this.state;
    // Merge Engine - render - Start
    return (
      <>
        <SafeAreaView style={styles.container} testID={"containerID"}>
          <HeaderComponent
            title={"Goal List"}
            onBackButton={this.handleGoBack}
          />
          <View style={styles.downContainer}>
            <View style={styles.searchContainer}>
              <View style={styles.search}>
                <View style={styles.searchMain}>
                  <Image source={searchIcon} style={styles.searchIcon} />
                  <TextInput
                    style={styles.searchTextInput}
                    placeholder={"Search"}
                    onChangeText={this.handleChangeText}
                    value={nameFilter}
                  />
                  {nameFilterLoading && (
                    <ActivityIndicator
                      style={styles.activityIndicator}
                      size={"small"}
                      color={"#826FFC"}
                    />
                  )}
                </View>
                <TouchableOpacity
                  onPress={this.handleToggleFilterVisible}
                  style={styles.sortContainer}>
                  <Text style={[styles.dropdownLabel, styles.purpleText]}>
                    {dateFilter ? `Goal Date: ${dateFilter}` : `Filter `}
                  </Text>
                  <Image source={dropdownIcon} style={styles.dropdownIcon} />
                </TouchableOpacity>
              </View>

              {filterVisible && (
                <View style={styles.filterContainer}>
                  {filterSelectionVisible && (
                    <View>
                      <TouchableOpacity
                        onPress={this.handleToggleCalendarVisible}
                        style={styles.filterItem}>
                        <Text style={[styles.purpleText]}>Goal Date</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {calendarVisible && (
                    <View>
                      <Calendar
                        theme={{
                          arrowColor: "#826FFC",
                          todayTextColor: "#826FFC",
                        }}
                        onDayPress={this.handleSelectDate}
                      />
                    </View>
                  )}
                </View>
              )}
            </View>

            {isFiltered && (
              <View style={styles.cancelFilterContainer}>
                <Button
                  title={"Cancel Filter"}
                  type={"outline"}
                  buttonStyle={styles.btnStyle}
                  titleStyle={styles.titleBtnStyle}
                  onPress={this.handleCancelFilter}
                />
              </View>
            )}

            <FlatList
              renderItem={({ item }) => (
                <GoalItemList
                  goal={item}
                  navigation={this.props.navigation}
                  token={token}
                  onDeleteGoal={this.handleDeleteGoal}
                />
              )}
              data={goalList}
              refreshing={isLoading}
              keyExtractor={(item) => item.id!.toString()}
              onRefresh={this.handleGetGoalList}
              style={styles.flatList}
              contentContainerStyle={styles.contentContainFlatList}
              showsVerticalScrollIndicator={false}
              testID={"flatListID"}
            />
          </View>
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
  },
  downContainer: {
    padding: 16,
  },
  searchContainer: {
    borderRadius: 30,
    backgroundColor: "white",
    marginBottom: 16,
  },
  search: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  searchMain: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchTextInput: {
    flex: 1,
    fontSize: 14,
  },
  searchIcon: {
    marginRight: 16,
  },
  dropdownIcon: {
    marginLeft: 4,
  },
  filterContainer: {
    backgroundColor: "white",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 16,
  },
  filterItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  purpleText: {
    color: "#826FFC",
  },
  dropdownLabel: {
    fontSize: 14,
  },
  flatList: {
    flex: 1,
  },
  contentContainFlatList: {
    paddingBottom: "20%",
  },
  titleBtnStyle: {
    color: "#826FFC",
    fontSize: 14,
  },
  btnStyle: {
    borderColor: "#826FFC",
    borderRadius: 10,
  },
  cancelFilterContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  activityIndicator: {
    marginHorizontal: 8,
  },
});
// Customizable Area End
