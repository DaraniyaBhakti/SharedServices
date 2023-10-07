import * as React from "react";
import { DateObject } from "react-native-calendars";

type CalendarInputComponentControllerInput = {
  initialDate?: Date;
  onChangeDate: (date: Date) => void;
};

export const defaultDate = new Date("1/1/1");

type CalendarInputComponentControllerOutput = [
  boolean,
  () => void,
  Date,
  (date: DateObject) => void,
];
export function useCalendarInputComponent(
  input: CalendarInputComponentControllerInput,
): CalendarInputComponentControllerOutput {
  const { initialDate, onChangeDate } = input;

  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  const [date, setDate] = React.useState<Date>(initialDate ?? defaultDate);

  const handleToggleModal = React.useCallback(() => {
    setModalVisible((prevState) => !prevState);
  }, []);

  const handleSelectDate = React.useCallback(
    (selectedDate: DateObject) => {
      const newDate = new Date(selectedDate.timestamp);
      setDate(newDate);
      onChangeDate(newDate);
      handleToggleModal();
    },
    [onChangeDate, handleToggleModal],
  );

  return [modalVisible, handleToggleModal, date, handleSelectDate];
}
