import { Alert, Dimensions, Linking } from "react-native";

export const openUrl = async (urlToOpen: string | null) => {
  try {
    if (urlToOpen) {
      const response = await Linking.canOpenURL(urlToOpen);
      if (response) {
        await Linking.openURL(urlToOpen);
      }
    } else {
      throw new Error("null is not supported");
    }
  } catch (error) {
    Alert.alert("Link is not supported");
  }
};

export const height = Dimensions.get("window").height;

export const width = Dimensions.get("window").width;

export const fontScale = Dimensions.get("window").fontScale;

export const filterData = ["All", "public", "private"];
