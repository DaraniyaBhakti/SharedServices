import * as React from "react";
import { PropsWithChildren, ReactElement } from "react";
import { StyleSheet, Text, TextInput, TextInputProps } from "react-native";

export function InputComponent(
  props: PropsWithChildren<InputComponentProps>,
): ReactElement {
  const { errorTitle, ...restProps } = props;

  return (
    <>
      <TextInput style={styles.textContainer} {...restProps} />
      {errorTitle && <Text style={styles.errorLabel}>{errorTitle}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  errorLabel: {
    color: "red",
  },
  textContainer: {
    borderWidth: 1,
    borderColor: "#999999",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 16,
    fontSize: 14,
    color: "black",
    backgroundColor: "white",
    marginTop: 16,
    marginBottom: 8,
  },
});

export interface InputComponentProps extends TextInputProps {
  errorTitle?: string | false | undefined;
}

InputComponent.defaultProps = {};

export default InputComponent;
