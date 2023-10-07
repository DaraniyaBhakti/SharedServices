import * as React from "react";
import { PropsWithChildren, ReactElement } from "react";
import { useConfirmModal } from "./ConfirmModalController";
import { Box, Button, Modal, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

export function ConfirmModal(
  props: PropsWithChildren<ConfirmModalWebProps>,
): ReactElement {
  const { isVisible, onToggleModal, titleModal, onConfirm, testID } = props;

  const [handleConfirm] = useConfirmModal({ onConfirm, onToggleModal });

  return (
    <Modal
      id={testID}
      open={isVisible}
      onClose={onToggleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <ModalContainer>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Confirm
        </Typography>
        <Title id="modal-modal-description">{titleModal}</Title>

        <ModalButtonContainer>
          <ModalButtonDelete onClick={handleConfirm} size={"medium"}>
            Delete
          </ModalButtonDelete>
          <Button onClick={onToggleModal} size={"medium"}>
            Cancel
          </Button>
        </ModalButtonContainer>
      </ModalContainer>
    </Modal>
  );
}

const ModalContainer = styled(Box)({
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  border: "0.5px solid #000",
  boxShadow: "24",
  borderRadius: 10,
  padding: 16,
});

const ModalButtonContainer = styled(Box)({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  marginTop: 16,
});

const ModalButtonDelete = styled(Button)({
  marginRight: 16,
});

const Title = styled(Typography)({
  marginTop: 2,
});

export interface ConfirmModalWebProps {
  isVisible: boolean;
  onToggleModal: () => void;
  titleModal: string;
  onConfirm: () => void;
  testID?: string;
}

ConfirmModal.defaultProps = {};

export default ConfirmModal;
