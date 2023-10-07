import * as React from "react";
import { PropsWithChildren, ReactElement } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import { Fab } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
export function AddButton(
  props: PropsWithChildren<AddButtonProps>,
): ReactElement {
  const { onClick } = props;

  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Fab
      aria-label={"Add"}
      className={classes.addButton}
      color={"inherit"}
      onClick={onClick}>
      <ArrowBackIcon color={"primary"} />
    </Fab>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      position: "absolute",
      top: theme.spacing(5),
      left: theme.spacing(2),
      backgroundColor: "#6200ee",
    },
  }),
);

export interface AddButtonProps {
  onClick: () => void;
}

AddButton.defaultProps = {
  //
};

export default AddButton;
