import React, { PropsWithChildren, ReactElement } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export function AlertDialogWeb(
  props: PropsWithChildren<AlertDialogProps>,
): ReactElement {
  const { isVisible, onClose, title, content } = props;

  return (
    <div>
      <Dialog
        open={isVisible}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export interface AlertDialogProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

AlertDialogWeb.defaultProps = {};

export default AlertDialogWeb;
