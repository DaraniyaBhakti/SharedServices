import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ButtonProps } from "./Types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Button = (props: ButtonProps) => {
  const fontScale = Dimensions.get("window").fontScale;
  const inlineStyle = {
    backgroundColor: props.backgroundColor ? props.backgroundColor : "#800000",
    width: props.width ? props.width : "40%",
    height: props.height ? props.height : 50,
  };
  return (
    <TouchableOpacity
      testID={props.testID}
      style={[styles.buttonView, inlineStyle]}
      onPress={props.onPress}>
      {props.buttonText && (
        <Text
          style={[
            styles.buttonText,
            { fontSize: fontScale + (props.fontSize ? props.fontSize : 16) },
          ]}>
          {[props.buttonText]}
        </Text>
      )}
      {props.icons && (
        <MaterialCommunityIcons
          style={[
            styles.buttonText,
            { fontSize: fontScale + (props.fontSize ? props.fontSize : 16) },
          ]}
          name={props.icons}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginVertical: 12,
    backgroundColor: "#5568FE",
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonText: {
    color: "#fff",
    textTransform: "capitalize",
  },
});

export default Button;
