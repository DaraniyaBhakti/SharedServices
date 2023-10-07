import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  textColor: {
    color: "black",
  },
  container: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  viewParent: {
    margin: 15,
    padding: 5,
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
    color: "black",
  },
  viewTopHeader: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  textTitle: {
    fontWeight: "500",
    fontSize: 20,
    color: "black",
  },
  viewPostItem: {
    borderBottomWidth: 1,
    // borderRadius: 5,
    borderBottomColor: "#d2d2d2",
    paddingBottom: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  viewFirstLetter: {
    marginRight: 10,
    width: 30,
    height: 30,
    backgroundColor: "#d2d2d2",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  textMentionsItem: {
    fontSize: 16,
    width: "90%",
    color: "#000000",
  },
  imagFilter: {
    height: 25,
    width: 25,
  },
  touchableFilter: {
    flexDirection: "row",
    alignContent: "center",
  },
  modalView: {
    margin: 20,
    marginVertical: 60,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  viewModalListItem: {
    width: "100%",
    margin: 5,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  checkbox: {
    alignSelf: "center",
    height: 20,
    width: 20,
  },
  textFilterModalItem: {
    fontSize: 15,
    fontWeight: "600",
  },
  emptyFlatList: {
    flex: 1,
    marginTop: 200,
    justifyContent: "center",
    alignSelf: "center",
  },
  textNoComment: {
    fontSize: 18,
    color: "#000",
    textAlignVertical: "center",
  },
});

export default Styles;
