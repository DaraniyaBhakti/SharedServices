import * as React from "react";
import { PropsWithChildren, ReactElement } from "react";
import { Input, Typography, InputProps } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

export function InputComponent(
  props: PropsWithChildren<InputComponentProps>,
): ReactElement {
  const { errorTitle, ...restProps } = props;

  return (
    <>
      <TextInput
        fullWidth={true}
        required={true}
        error={!!errorTitle}
        {...restProps}
      />
      {errorTitle && <ErrorTypo>{errorTitle}</ErrorTypo>}
    </>
  );
}

const TextInput = styled(Input)({
  marginTop: 24,
});

const ErrorTypo = styled(Typography)({
  color: "red",
  marginTop: 8,
});

export interface InputComponentProps extends InputProps {
  errorTitle?: string | false;
}

InputComponent.defaultProps = {};

export default InputComponent;
