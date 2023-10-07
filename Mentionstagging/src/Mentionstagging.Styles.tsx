import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  viewContainer: {
    margin: 15,
    marginBottom: 20,
    padding: 5,
    paddingVertical: 15,
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  viewTopHeader: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    margin: 10,
  },
  textTitle: {
    fontWeight: "500",
    fontSize: 20,
    color: "black",
  },
  viewPostItem: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imagAddPost: {
    height: 25,
    width: 25,
  },
  touchableAddPost: {
    flexDirection: "row",
    alignContent: "center",
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 10,
    bottom: 30,
    borderRadius: 25,
    backgroundColor: "#437FFE",
    marginBottom: 20,
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 20,
    height: 20,
  },
  textUserNameList: {
    fontWeight: "700",
    fontSize: 16,
    color: "#000000",
  },
  textPostDataList: {
    color: "#000000",
  },
  flatList: {
    minHeight: "90%",
    marginBottom: 10,
  },
  listEmptyFlatList: {
    flex: 1,
    marginTop: 100,
    justifyContent: "center",
    alignSelf: "center",
  },
  textNoPost: {
    fontSize: 18,
    color: "#000",
    textAlignVertical: "center",
  },
  textMention: {
    color: "black",
    fontWeight: "400",
  },
  textMentionBold: {
    color: "#437FFE",
    fontWeight: "700",
  },
});

export default Styles;
