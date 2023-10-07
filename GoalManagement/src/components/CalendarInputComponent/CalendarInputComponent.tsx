import * as React from "react";
import { PropsWithChildren, ReactElement } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import Modal from "react-native-modal";
import { calendarColorIcon, imgArrowLeft } from "../../assets";
import dayjs from "dayjs";
import { configJSON } from "../../GoalManagementController.web";
import {
  defaultDate,
  useCalendarInputComponent,
} from "./CalendarInputComponentController";
import CalendarObject from "./CalendarObject";

export function CalendarInputComponent(
  props: PropsWithChildren<CalendarComponentProps>,
): ReactElement {
  const { initialDate, errorTitle, onChangeDate, ...restProps } = props;

  const [modalVisible, handleToggleModal, date, handleSelectDate] =
    useCalendarInputComponent({ initialDate, onChangeDate });

  return (
    <>
      <View style={styles.textContainer} {...restProps}>
        <Text style={styles.label}>
          {date === defaultDate ? (
            <Text style={styles.placeholderText}>Please choose</Text>
          ) : (
            dayjs(date).format(configJSON.dateFormat)
          )}
        </Text>
        <TouchableOpacity onPress={handleToggleModal}>
          <Image source={calendarColorIcon} />
        </TouchableOpacity>
      </View>
      {errorTitle && <Text style={styles.errorLabel}>{errorTitle}</Text>}

      <Modal
        isVisible={modalVisible}
        onBackdropPress={handleToggleModal}
        style={styles.modal}>
        <View style={styles.modalContainer}>
          <View>
            <TouchableOpacity
              testID={"toggleModalID"}
              onPress={handleToggleModal}>
              <Image source={imgArrowLeft} />
            </TouchableOpacity>
            <CalendarObject
              testID={"calendarObjectID"}
              onChangeDate={handleSelectDate}
            />
          </View>
        </View>
      </Modal>
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
    paddingVertical: 12,
    marginTop: 16,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  label: {
    fontSize: 14,
    color: "black",
  },
  modal: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    borderRadius: 10,
    backgroundColor: "white",
    width: "100%",
    padding: 16,
  },
  placeholderText: {
    color: "#999999",
  },
});

export interface CalendarComponentProps extends ViewProps {
  //
  errorTitle?: string;
  initialDate?: Date;
  onChangeDate: (date: Date) => void;
}

CalendarInputComponent.defaultProps = {
  //
};

export default CalendarInputComponent;
