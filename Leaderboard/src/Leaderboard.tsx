import * as React from "react";

// Customizable Area Start
import { FlatList, StyleSheet, Text, View } from "react-native";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End
// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
import dayjs from "dayjs";
import ImageComponent from "./components/ImageComponent/ImageComponent";
import LeaderboardController, { Props } from "./LeaderboardController";
import { Button } from "react-native-elements";
// Customizable Area End

export default class Leaderboard extends LeaderboardController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    const { leaderboard, isLoading, moreLoading, pageIndex, totalPage } =
      this.state;
    // Merge Engine - render - Start
    return (
      <View style={styles.container} testID={"container"}>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>LEADERBOARD</Text>
          </View>
          {!isLoading && leaderboard.length === 0 && (
            <View style={styles.emptyUserContainer}>
              <Text style={styles.emptyUserLabel}>The list is empty</Text>
            </View>
          )}
          <FlatList
            refreshing={isLoading}
            onRefresh={this.handleGetLeaderboard}
            testID={"flatListTest"}
            ListHeaderComponent={
              <>
                {leaderboard.length > 0 && (
                  <View style={styles.listHeaderContainer}>
                    <View style={styles.firstPlaceContainer}>
                      <View style={styles.firstPlaceProfileContainer}>
                        <ImageComponent
                          initialUri={leaderboard[0].profile_picture}
                          size={80}
                        />
                        <View style={styles.firstPlacePosition}>
                          <Text style={[styles.textBold, styles.textWhite]}>
                            1
                          </Text>
                        </View>
                      </View>
                      <View style={styles.firstPlaceInfo}>
                        <View>
                          <Text style={[styles.textBold]}>
                            {leaderboard[0].account_user_name ?? ""}
                          </Text>
                          <Text style={[styles.textBold]}>
                            Member since:{" "}
                            {dayjs(leaderboard[0].member_since).format(
                              "MM/DD/YYYY",
                            )}
                          </Text>
                        </View>

                        <View>
                          <Text style={[styles.textBold]}>
                            {leaderboard[0].total_point}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </>
            }
            data={leaderboard.slice(1, leaderboard.length)}
            renderItem={({ item, index }) => (
              <View style={styles.otherPlaceContainer}>
                <View>
                  <ImageComponent initialUri={item.profile_picture} size={50} />
                  <View style={styles.otherPlacePosition}>
                    <Text style={[styles.textWhite]}>{index + 2}</Text>
                  </View>
                </View>
                <View>
                  <Text>{item.account_user_name ?? ""}</Text>
                  <Text>
                    Member since:{" "}
                    {dayjs(item.member_since).format("MM/DD/YYYY")}
                  </Text>
                </View>
                <View>
                  <Text>{item.total_point}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.account_id.toString()}
            keyboardShouldPersistTaps={"always"}
            style={styles.flatList}
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              <>
                {pageIndex !== totalPage && (
                  <Button
                    onPress={this.handleLoadMore}
                    title={"Load more"}
                    loading={moreLoading}
                    style={styles.buttonLoadMore}
                  />
                )}
              </>
            }
          />
        </View>
      </View>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  flatList: {
    height: "100%",
  },
  listHeaderContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  firstPlaceContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    width: "100%",
    maxWidth: 280,
  },
  listPlaceContainer: {},
  firstPlaceProfile: {
    width: 80,
    height: 80,
    borderRadius: 80,
    borderWidth: 1,
  },
  firstPlacePosition: {
    position: "absolute",
    backgroundColor: "black",
    borderRadius: 50,
    width: 20,
    height: 20,
    bottom: -8,
    left: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  firstPlaceProfileContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  firstPlaceInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: 230,
    width: "100%",
  },
  leaderboardItem: {},
  otherPlaceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
  },
  otherPlaceProfile: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
  },
  otherPlacePosition: {
    position: "absolute",
    backgroundColor: "black",
    borderRadius: 50,
    width: 20,
    height: 20,
    bottom: -8,
    left: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainerStyle: {
    paddingBottom: "20%",
  },
  textBold: {
    fontWeight: "700",
  },
  textWhite: {
    color: "white",
  },
  emptyUserContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "50%",
  },
  emptyUserLabel: {
    fontSize: 18,
  },
  buttonLoadMore: {
    height: 100,
    marginTop: 16,
  },
  paginationStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
});
// Customizable Area End
