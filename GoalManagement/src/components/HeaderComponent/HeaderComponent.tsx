import * as React from "react";
import { PropsWithChildren, ReactElement } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { imgArrowLeft } from "../../assets";

export function HeaderComponent(
  props: PropsWithChildren<HeaderComponentProps>,
): ReactElement {
  const { title, onBackButton } = props;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerItemContainer}>
        <TouchableOpacity onPress={onBackButton}>
          <Image source={imgArrowLeft} />
        </TouchableOpacity>
      </View>

      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      <View style={styles.headerItemContainer} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "5%",
    paddingHorizontal: 8,
  },
  headerTitleContainer: {
    width: "60%",
  },
  headerItemContainer: {
    width: "20%",
  },
  headerTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    color: "#826FFC",
  },
});

export interface HeaderComponentProps {
  //
  title: string;

  onBackButton: () => void;
}

HeaderComponent.defaultProps = {
  //
};

export default HeaderComponent;
