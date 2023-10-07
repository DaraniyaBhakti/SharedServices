import * as React from "react";
import { PropsWithChildren, ReactElement } from "react";
import { View, ViewProps } from "react-native";
import { Calendar, DateObject } from "react-native-calendars";

export function CalendarObject(
  props: PropsWithChildren<CalendarObjectProps>,
): ReactElement {
  const { onChangeDate, ...restProps } = props;

  return (
    <View {...restProps}>
      <Calendar onDayPress={onChangeDate} />
    </View>
  );
}

export interface CalendarObjectProps extends ViewProps {
  onChangeDate: (date: DateObject) => void;
}

CalendarObject.defaultProps = {
  //
};

export default CalendarObject;
