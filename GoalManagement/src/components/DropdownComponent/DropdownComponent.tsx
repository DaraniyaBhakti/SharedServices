import * as React from "react";
import { PropsWithChildren, ReactElement } from "react";
import { StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Scale from "../../../../../components/src/Scale";
import { goalStatusList } from "../../constants";

export function DropdownComponent(
  props: PropsWithChildren<DropdownComponentProps>,
): ReactElement {
  const { onSelect, defaultButtonText } = props;

  return (
    <>
      <SelectDropdown
        data={goalStatusList}
        onSelect={onSelect}
        defaultButtonText={defaultButtonText}
        buttonStyle={styles.dropdownButtonStyle}
        buttonTextStyle={styles.dropdownButtonTxtStyle}
        dropdownIconPosition={"right"}
        dropdownStyle={styles.dropdownStyle}
        onChangeSearchInputText={() => {}}
      />
    </>
  );
}

const styles = StyleSheet.create({
  dropdownStyle: {
    backgroundColor: "white",
    alignSelf: "flex-start",
    borderRadius: 10,
  },
  dropdownButtonStyle: {
    borderColor: "#999999",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 8,
    width: "100%",
  },
  dropdownButtonTxtStyle: {
    textAlign: "left",
    fontSize: Scale(14),
    lineHeight: Scale(24),
  },
});

export interface DropdownComponentProps {
  onSelect: (selectedItem: string, index: number) => void;
  defaultButtonText: string | undefined;
}

DropdownComponent.defaultProps = {};

export default DropdownComponent;
