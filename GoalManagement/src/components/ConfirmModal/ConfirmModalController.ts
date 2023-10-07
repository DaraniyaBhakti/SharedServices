import * as React from "react";

type ConfirmModalControllerInput = {
  onToggleModal: () => void;
  onConfirm: () => void;
};

type ConfirmModalControllerOutput = [() => void];
export function useConfirmModal(
  input: ConfirmModalControllerInput,
): ConfirmModalControllerOutput {
  const { onConfirm, onToggleModal } = input;

  const handleConfirm = React.useCallback(() => {
    onConfirm();
    onToggleModal();
  }, [onConfirm, onToggleModal]);

  return [handleConfirm];
}
