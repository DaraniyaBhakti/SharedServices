import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffff",
  },
  viewContainer: {
    backgroundColor: "#ffffff",
    marginBottom: "12%",
  },
  viewTopHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  textTitle: {
    fontWeight: "500",
    fontSize: 16,
    marginVertical: 20,
  },
  textInputPostText: {
    borderWidth: 1,
    borderColor: "#d2d2d2",
    height: 150,
    padding: 10,
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
    height: 20,
    width: 20,
  },
  modalView: {
    margin: 20,
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
  postText: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  viewFirstLetter: {
    marginVertical: 20,
    marginRight: 10,
    width: 30,
    height: 30,
    backgroundColor: "#d2d2d2",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  imgEditPost: {
    height: 30,
    width: 30,
    marginRight: 5,
  },
  flexDirRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewUserTag: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  imgUserTag: {
    height: 20,
    width: 20,
    marginRight: 5,
  },
  viewCommentInput: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 5,
    borderTopColor: "#d2d2d2",
    backgroundColor: "#ffffff",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  width80Pr: {
    width: "80%",
  },
  width85Pr: {
    width: "85%",
  },
  width88Pr: {
    width: "88%",
  },
  width100Pr: {
    width: "100%",
  },
  textPost: {
    color: "#4781FC",
    fontSize: 15,
  },
  viewCommentListItem: {
    borderBottomColor: "#d2d2d2",
    borderBottomWidth: 1,
    marginHorizontal: 18,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textUserName: {
    fontWeight: "500",
    fontSize: 13,
  },
  textComment: {
    textAlign: "left",
    marginBottom: 10,
    fontSize: 15,
  },
  imgEditDelete: {
    height: 15,
    width: 15,
    marginRight: 5,
  },
  scrollViewRenderSuggestion: {
    position: "relative",
    maxHeight: 150,
    width: "100%",
    zIndex: 999999,
    backgroundColor: "#e2e2e2",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#d2d2d2",
  },
  padding12: {
    padding: 12,
  },
  textColor: {
    color: "black",
  },
  textHeading: {
    fontWeight: "500",
    fontSize: 14,
    color: "#000000",
    marginHorizontal: 10,
    marginTop: 5,
  },
  emptyFlatList: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  textNoComment: {
    fontSize: 18,
    color: "#000",
    textAlignVertical: "center",
  },
  imgComment: {
    alignSelf: "flex-end",
    marginBottom: 12,
  },
  zIndex: {
    zIndex: -999999,
  },
  flexGrow: {
    flexGrow: 1,
  },
  flex1: {
    flex: 1,
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
