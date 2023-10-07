import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  SafeAreaView,
} from "react-native";

import {
  bgGradientRectangle,
  imgSearch,
  imgInfo,
  imgCal,
  imgListBg,
  imgDefault,
} from "./assets";
import Modal from "react-native-modal";
import { Calendar } from "react-native-calendars";
// Customizable Area End

import TimeSheetTimeManagementListController, {
  Props,
  configJSON,
  TimeList,
  DatesOfMonth,
  MonthsNameList,
  PageItem,
} from "./TimeSheetTimeManagementListController";
import { COLORS } from "../../../framework/src/Globals";

export default class TimeSheetTimeManagementList extends TimeSheetTimeManagementListController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderAllDates = ({ item }: { item: DatesOfMonth; index: number }) => {
    return (
      <TouchableOpacity
        testID="testSetDailySelectedDate"
        style={styles.dateAndNameTouchView}
        onPress={() => {
          this.setDailySelectedDate(item.date);
        }}>
        {this.state.selectedDate === item.date ? (
          <ImageBackground
            source={bgGradientRectangle}
            imageStyle={styles.gradientDateStyle}
            style={styles.gradientDateBackground}>
            <View style={styles.dateAndNameView}>
              <Text style={styles.selectedDate}>{item.date}</Text>
              <Text style={styles.selectedDateName}>{item.dayName}</Text>
            </View>
          </ImageBackground>
        ) : (
          <View style={styles.dateAndNameView}>
            <Text style={styles.unselectedDate}>{item.date}</Text>
            <Text style={styles.unselectedDateName}>{item.dayName}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  renderAllMonths = ({ item }: { item: MonthsNameList; index: number }) => {
    return (
      <TouchableOpacity
        testID="testSetMonthlySelectedNameNumber"
        style={styles.dateAndNameTouchView}
        onPress={() => {
          this.setMonthlySelectedNameNumber(item);
        }}>
        {this.state.selectedMonth === item.monthNumber ? (
          <ImageBackground
            source={bgGradientRectangle}
            imageStyle={styles.gradientDateStyle}
            style={styles.gradientDateBackground}>
            <View style={styles.dateAndNameView}>
              <Text style={styles.selectedDate}>{item.monthNumber}</Text>
              <Text style={styles.selectedDateName}>
                {item.monthName.substring(0, 3)}
              </Text>
            </View>
          </ImageBackground>
        ) : (
          <View style={styles.dateAndNameView}>
            <Text style={styles.unselectedDate}>{item.monthNumber}</Text>
            <Text style={styles.unselectedDateName}>
              {item.monthName.substring(0, 3)}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  renderTimeList = ({ item }: { item: TimeList; index: number }) => {
    return (
      <TouchableOpacity
        testID="openWorkerDetails"
        style={styles.logListItemView}
        onPress={() => {
          this.openWorkerDetails(item);
        }}>
        <ImageBackground source={imgListBg} style={styles.mainListBackground}>
          <View style={styles.listItemMainView}>
            <View style={styles.leftSectionView} />
            <View style={styles.rightSectionView}>
              <View style={styles.rightSectionTopView}>
                <View style={styles.userImageBorderView}>
                  <Image
                    source={imgDefault}
                    style={styles.userImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.empName}>
                  {item.attributes.first_name + " " + item.attributes.last_name}
                </Text>
                <TouchableOpacity style={styles.infoView}>
                  <Image
                    source={imgInfo}
                    style={styles.infoImage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.timeLogView}>
                <Text style={styles.timeLogText}>
                  {this.getSplitHoursAndMinutes(
                    item.attributes.total_logged_hours,
                  )}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  renderModal() {
    const { selectedYear, selectedMonth, selectedDate } = this.state;
    let month =
      parseInt(selectedMonth, 10) < 10 ? "0" + selectedMonth : selectedMonth;
    let targetedDay =
      parseInt(selectedDate, 10) < 10 ? "0" + selectedDate : selectedDate;
    let selectedFullDate = `${selectedYear}-${month}-${targetedDay}`;

    return (
      <View style={styles.calendarModalView}>
        <Calendar
          ref={this.calendarRef}
          onDayPress={this.setCalendarSelectionData}
          monthFormat={"MMM yyyy"}
          current={selectedFullDate}
          hideExtraDays={true}
          disableMonthChange={false}
          firstDay={1}
          hideDayNames={false}
          showWeekNumbers={false}
          enableSwipeMonths={true}
        />
      </View>
    );
  }

  searchView() {
    return (
      <View style={styles.searchView}>
        <Image
          source={imgSearch}
          style={styles.searchIcon}
          resizeMode="contain"
        />
        <TextInput
          testID="txtSearchInput"
          style={styles.searchInput}
          placeholder={configJSON.search}
          {...this.txtSearchInputChange}
          numberOfLines={1}
          value={this.state.txtSearchInputValue}
        />
      </View>
    );
  }

  selectedDateAndCalView() {
    return (
      <View style={styles.selectedDateView}>
        <Text style={styles.selectedDateText}>
          {this.state.selectedMonthName + ", " + this.state.selectedYear}
        </Text>
        <TouchableOpacity
          testID="testSelectedDateAndCal"
          onPress={() => {
            this.setModalOpenClose(true);
          }}>
          <Image
            source={imgCal}
            style={styles.calendarImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  }

  dateTimeSelectionView() {
    return (
      <View style={styles.dateTimeSelectionView}>
        <TouchableOpacity
          testID="testDateTimeSelectionDaily"
          onPress={() => this.setSelectionTime(configJSON.labelDaily)}
          style={styles.viewTaskTouchView}>
          {this.state.selectedTime === configJSON.labelDaily ? (
            <ImageBackground
              source={bgGradientRectangle}
              imageStyle={styles.gradientImageStyle}
              style={styles.gradientImageBackground}>
              <Text style={styles.buttonText}>{configJSON.labelDaily}</Text>
            </ImageBackground>
          ) : (
            <View style={styles.unselectedImageBackground}>
              <Text style={styles.unselectedButtonText}>
                {configJSON.labelDaily}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          testID="testDateTimeSelectionMonthly"
          onPress={() => this.setSelectionTime(configJSON.labelMonthly)}
          style={styles.viewTaskTouchView}>
          {this.state.selectedTime === configJSON.labelMonthly ? (
            <ImageBackground
              source={bgGradientRectangle}
              imageStyle={styles.gradientImageStyle}
              style={styles.gradientImageBackground}>
              <Text style={styles.buttonText}>{configJSON.labelMonthly}</Text>
            </ImageBackground>
          ) : (
            <View style={styles.unselectedImageBackground}>
              <Text style={styles.unselectedButtonText}>
                {configJSON.labelMonthly}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  dayWeekMonthList() {
    switch (this.state.selectedTime) {
      case configJSON.labelDaily:
        return (
          <View>
            <FlatList
              testID="testAllDateList"
              ref={this.dailyFlatListRef}
              horizontal
              bounces={false}
              style={styles.dateAndNameList}
              data={this.state.selectedMonthDate}
              keyExtractor={(item: DatesOfMonth) => item.date}
              renderItem={this.renderAllDates}
              onScrollToIndexFailed={(error) => {
                this.dailyFlatListRef.current?.scrollToOffset({
                  offset: error.averageItemLength * error.index,
                  animated: true,
                });
                setTimeout(() => {
                  if (
                    this.state.selectedMonthDate.length !== 0 &&
                    this.dailyFlatListRef !== null
                  ) {
                    this.dailyFlatListRef.current?.scrollToIndex({
                      index: error.index,
                      animated: true,
                    });
                  }
                }, 50);
              }}
            />
          </View>
        );
      case configJSON.labelMonthly:
        return (
          <View>
            <FlatList
              testID="testAllMonthsList"
              ref={this.monthlyFlatListRef}
              horizontal
              bounces={false}
              style={styles.dateAndNameList}
              data={this.state.monthNames}
              keyExtractor={(item: MonthsNameList) => item.monthNumber}
              renderItem={this.renderAllMonths}
              onScrollToIndexFailed={(error) => {
                this.monthlyFlatListRef.current?.scrollToOffset({
                  offset: error.averageItemLength * error.index,
                  animated: true,
                });
                setTimeout(() => {
                  if (
                    this.state.monthNames.length !== 0 &&
                    this.monthlyFlatListRef !== null
                  ) {
                    this.monthlyFlatListRef.current?.scrollToIndex({
                      index: error.index,
                      animated: true,
                    });
                  }
                }, 50);
              }}
            />
          </View>
        );
    }
  }
  listingAndPageView() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.currentPage === 0 && this.state.timeList.length === 0 ? (
          <Text style={styles.noMessageText}>{this.state.responseMessage}</Text>
        ) : (
          <FlatList
            testID="testTaskList"
            bounces={false}
            style={styles.list}
            data={this.state.timeList}
            keyExtractor={(item: TimeList) => item.id}
            renderItem={this.renderTimeList}
          />
        )}
      </View>
    );
  }
  renderPageList = ({ item, index }: { item: PageItem; index: number }) => {
    return (
      <TouchableOpacity
        testID="testSetCurrentPage"
        onPress={() => {
          this.setCurrentPage(item, index);
        }}
        style={styles.pageTouchView}>
        {item.isSelected ? (
          <ImageBackground
            source={bgGradientRectangle}
            imageStyle={styles.gradientImageStyle}
            style={styles.pageSelectedImageBackground}>
            <Text style={styles.buttonText}>{index + 1}</Text>
          </ImageBackground>
        ) : (
          <View style={styles.pageUnselectedView}>
            <Text style={styles.unselectedButtonText}>{index + 1}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };
  renderPages() {
    return (
      <View style={styles.pagesMainView}>
        <FlatList
          testID="testRenderPageList"
          bounces={false}
          horizontal
          style={styles.list}
          data={this.state.displayPages}
          keyExtractor={(item: PageItem) => item.label.toString()}
          renderItem={this.renderPageList}
        />
      </View>
    );
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainView}>
          {this.searchView()}
          {this.selectedDateAndCalView()}
          <Text style={styles.logCountText}>{"10 Logs today"}</Text>
          {this.dateTimeSelectionView()}
          {this.dayWeekMonthList()}
          {this.listingAndPageView()}
          {this.renderPages()}
          <Modal
            testID="_modal"
            isVisible={this.state.isModalShow}
            onSwipeCancel={() => {
              this.setModalOpenClose(false);
            }}
            onSwipeComplete={() => {
              this.setModalOpenClose(false);
            }}
            backdropColor={COLORS.black}
            onBackButtonPress={() => {
              this.setModalOpenClose(false);
            }}
            onTouchCancel={() => {
              this.setModalOpenClose(false);
            }}
            onBackdropPress={() => {
              this.setModalOpenClose(false);
            }}>
            {this.renderModal()}
          </Modal>
        </View>
      </SafeAreaView>
    );
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
  mainView: {
    margin: 16,
    flex: 1,
  },
  searchView: {
    width: "100%",
    height: 36,
    flexDirection: "row",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#979797",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  searchIcon: {
    height: 14,
    width: 14,
  },
  searchInput: {
    flex: 1,
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.black,
    marginStart: 16,
    height: 36,
  },
  viewTaskTouchView: {
    justifyContent: "center",
    height: 42,
  },
  gradientImageBackground: {
    justifyContent: "center",
    alignItems: "center",
    height: 42,
    width: 85,
  },
  unselectedImageBackground: {
    justifyContent: "center",
    alignItems: "center",
    height: 42,
    width: 85,
    borderWidth: 0.5,
    borderColor: "#979797",
    borderRadius: 4,
  },
  gradientImageStyle: {
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.white,
    alignSelf: "center",
  },
  unselectedButtonText: {
    fontSize: 16,
    color: "#979797",
    alignSelf: "center",
  },
  userImageBorderView: {
    borderRadius: 10,
    height: 20,
    width: 20,
    borderWidth: 2,
    borderColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  userImage: {
    height: 18,
    width: 18,
    borderRadius: 10,
  },
  list: {
    flex: 1,
  },
  logListItemView: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EBEBEB",
    marginBottom: 10,
    backgroundColor: COLORS.white,
  },
  mainListBackground: {
    justifyContent: "center",
    width: "100%",
    height: 82,
    borderRadius: 8,
    overflow: "hidden",
  },
  listItemMainView: {
    flexDirection: "row",
    flex: 1,
  },
  leftSectionView: {
    width: 8,
    backgroundColor: "#8572FD",
  },
  rightSectionView: {
    marginStart: 16,
    marginEnd: 16,
    flex: 1,
  },
  rightSectionTopView: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  empName: {
    marginStart: 4,
    color: COLORS.white,
    fontSize: 15,
  },
  infoView: {
    position: "absolute",
    right: 0,
  },
  infoImage: {
    height: 13,
    width: 13,
  },
  timeLogView: {
    backgroundColor: COLORS.white,
    borderColor: "#8572FD",
    borderWidth: 1,
    borderRadius: 4,
    height: 28,
    marginTop: 10,
    marginBottom: 10,
    overflow: "hidden",
    alignSelf: "flex-start",
    justifyContent: "center",
  },
  timeLogText: {
    paddingHorizontal: 4,
    fontSize: 13,
  },
  selectedDateView: {
    width: "100%",
    flexDirection: "row",
    marginTop: 24,
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectedDateText: {
    fontSize: 26,
    color: COLORS.black,
  },
  calendarImage: {
    height: 26,
    width: 26,
  },
  logCountText: {
    fontSize: 17,
    color: "#73767A",
    marginTop: 6,
  },
  dateTimeSelectionView: {
    flexDirection: "row",
    marginTop: 24,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "space-between",
  },
  gradientDateStyle: {
    borderRadius: 15,
  },
  gradientDateBackground: {
    justifyContent: "center",
    alignItems: "center",
    // height: 50,
    minWidth: 34,
    // margin: 8,
  },
  dateAndNameView: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 34,
  },
  dateAndNameList: {
    marginVertical: 16,
  },
  dateAndNameTouchView: {
    margin: 8,
  },
  selectedDate: {
    fontSize: 13,
    color: COLORS.white,
  },
  selectedDateName: {
    fontSize: 13,
    color: COLORS.white,
  },
  unselectedDate: {
    fontSize: 13,
    color: "#979797",
  },
  unselectedDateName: {
    fontSize: 13,
    color: "#979797",
  },
  calendarModalView: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: 20,
    shadowColor: "#979797",
    shadowOpacity: 5,
    elevation: 5,
  },
  pageTouchView: {
    justifyContent: "center",
    height: 42,
    width: 42,
    marginHorizontal: 10,
  },
  pageSelectedImageBackground: {
    justifyContent: "center",
    alignItems: "center",
    height: 42,
    width: 42,
  },
  pageUnselectedView: {
    justifyContent: "center",
    alignItems: "center",
    height: 42,
    width: 42,
    borderWidth: 0.5,
    borderColor: "#979797",
    borderRadius: 4,
  },
  pagesMainView: {
    height: 42,
    alignItems: "center",
    marginTop: 10,
  },
  pagesSubView: {
    flexDirection: "row",
    alignContent: "center",
    flex: 1,
  },
  noMessageText: {
    fontSize: 20,
    color: COLORS.black,
    textAlign: "center",
    marginVertical: 20,
  },
});
// Customizable Area End
