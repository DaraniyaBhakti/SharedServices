import * as React from "react";
import { PropsWithChildren, ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { Button } from "react-native-elements";
import { useConfirmModal } from "./ConfirmModalController";

export function ConfirmModal(
  props: PropsWithChildren<ConfirmModalProps>,
): ReactElement {
  const { isVisible, onToggleModal, titleModal, onConfirm, testID } = props;

  const [handleConfirm] = useConfirmModal({ onConfirm, onToggleModal });

  return (
    <Modal
      testID={testID}
      isVisible={isVisible}
      onBackdropPress={onToggleModal}
      style={styles.modal}>
      <View style={styles.modalContainer}>
        <View>
          <Text style={[styles.purpleText]}>{titleModal}</Text>
        </View>

        <View style={styles.bottomButtonContainer}>
          <Button
            onPress={onToggleModal}
            title={"Cancel"}
            buttonStyle={styles.btnCancelStyle}
            titleStyle={styles.titleCancelStyle}
            loadingProps={{ color: "#826FFC" }}
            type={"outline"}
          />
          <Button
            testID={"buttonConfirmID"}
            onPress={handleConfirm}
            title={"Confirm"}
            buttonStyle={styles.btnConfirmStyle}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  btnConfirmStyle: {
    backgroundColor: "#826FFC",
  },
  titleCancelStyle: {
    color: "#826FFC",
  },
  btnCancelStyle: {
    borderColor: "#826FFC",
  },
  bottomButtonContainer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
  purpleText: {
    color: "#826FFC",
  },
});

export interface ConfirmModalProps {
  isVisible: boolean;
  onToggleModal: () => void;
  titleModal: string;
  onConfirm: () => void;
  testID?: string;
}

ConfirmModal.defaultProps = {};

export default ConfirmModal;
