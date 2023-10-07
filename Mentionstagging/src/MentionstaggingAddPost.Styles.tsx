import { StyleSheet } from "react-native";
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  viewTopHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  textTitle: {
    fontWeight: "500",
    fontSize: 16,
    marginVertical: 20,
    color: "black",
  },
  textInputPostText: {
    minHeight: 200,
    padding: 20,
    paddingTop: 20,
    paddingBottom: 20,
    marginVertical: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    color: "black",
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
  touchableImageTag: {
    marginRight: 10,
  },
  imageTag: {
    height: 30,
    width: 30,
  },
  viewUserTags: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 7,
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
  width100Pr: {
    width: "100%",
  },
  viewModalListItem: {
    margin: 5,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  width88Pr: {
    width: "88%",
  },
  scrollViewRenderSuggestions: {
    height: 100,
    width: "80%",
    shadowColor: "#000",
    backgroundColor: "#e2e2e2",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#d2d2d2",
  },
  padding12: {
    padding: 12,
  },
  marginLeft10: {
    marginLeft: 10,
  },
  textColor: {
    color: "black",
  },
  textHeading: {
    fontWeight: "400",
    fontSize: 14,
    color: "#000000",
  },
  textTaggedUser: {
    fontWeight: "500",
    fontSize: 15,
  },
  marginBottom30: {
    marginBottom: 30,
  },
});
export default Styles;
