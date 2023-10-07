import { defineFeature, loadFeature } from "jest-cucumber";
import { HTMLAttributes, shallow, ShallowWrapper } from "enzyme";
import * as React from "react";
import GoalCreate from "../../src/GoalCreate/GoalCreate";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { handleTestApiCall } from "../../../../framework/src/Helpers/handle-test-api";
import CalendarInputComponent from "../../src/components/CalendarInputComponent/CalendarInputComponent";
import InputComponent from "../../src/components/InputComponent/InputComponent";
import HeaderComponent from "../../src/components/HeaderComponent/HeaderComponent";
import ConfirmModal from "../../src/components/ConfirmModal/ConfirmModal";
import DropdownComponent from "../../src/components/DropdownComponent/DropdownComponent";
import CalendarObject from "../../src/components/CalendarInputComponent/CalendarObject";
import { mockGoal } from "./mockData";

const feature = loadFeature("./__tests__/features/GoalCreate-scenario.feature");

const navigation = {
  navigate: () => jest.fn(),
  state: {
    params: {
      goal: undefined,
      token: undefined,
    },
  },
};

const nullScreenProps = {
  navigation: navigation,
  id: "GoalCreate",
};

const screenProps = {
  navigation: {
    ...navigation,
    state: {
      params: {
        goal: mockGoal,
        token: "abc",
      },
    },
  },
  id: "GoalCreate",
};

function testTextInputFormik(input: {
  testID: string;
  fieldName: string;
  instanceComponent: ShallowWrapper<
    HTMLAttributes,
    any,
    React.Component<{}, {}, any>
  >;
}) {
  const { testID, fieldName, instanceComponent } = input;

  const component = instanceComponent
    .dive()
    .findWhere((node) => node.prop("testID") === testID);

  component.prop("onChangeText")("abc");
  expect(component.prop("onChangeText")).toBeDefined();
  component.prop("onBlur")({ target: { [fieldName]: "" } });
  expect(component).toBeTruthy();
}

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
  });

  test("User navigates to GoalCreate", ({ given, when, then }) => {
    let goalCreateWrapper: ShallowWrapper;
    let goalCreateInstance: GoalCreate;

    given("I am a User loading GoalCreate", () => {
      goalCreateWrapper = shallow(<GoalCreate {...screenProps} />);
      expect(goalCreateWrapper).toBeTruthy();
    });

    when("I navigate to the GoalCreate", () => {
      goalCreateInstance = goalCreateWrapper.instance() as GoalCreate;

      goalCreateWrapper = shallow(<GoalCreate {...nullScreenProps} />);
      goalCreateInstance = goalCreateWrapper.instance() as GoalCreate;
      expect(goalCreateWrapper).toBeTruthy();

      goalCreateInstance.setState({
        token: "abc",
        goal: mockGoal,
        deleteLoading: true,
        updateLoading: true,
        createLoading: true,
      });

      goalCreateInstance.handleCreateGoal("");
      const createGoalCallApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      goalCreateInstance.createGoalCallApi = createGoalCallApi.messageId;
      handleTestApiCall(createGoalCallApi, {});

      goalCreateInstance.handleUpdateGoal("");
      const updateGoalCallApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      goalCreateInstance.updateGoalCallApi = updateGoalCallApi.messageId;
      handleTestApiCall(updateGoalCallApi, {});

      goalCreateInstance.handleDeleteGoal();
      const deleteGoalCallApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );
      goalCreateInstance.deleteGoalCallApi = deleteGoalCallApi.messageId;
      handleTestApiCall(deleteGoalCallApi, {});
    });

    then("GoalCreate will load with out errors", () => {
      expect(goalCreateWrapper).toBeTruthy();

      goalCreateInstance.handleLoginCreate();
      goalCreateInstance.initialGoal = {};

      goalCreateInstance.handleGoBack();
      goalCreateInstance.initialGoal = mockGoal;

      goalCreateInstance.handleGoBack();
      goalCreateInstance.handleSubmitMobile({
        name: "abc",
        description: "abc",
        goalStatus: "tracked",
        goalEndDate: new Date("2023-02-17T00:00:00.000Z"),
        goalStartDate: new Date("2023-02-17T00:00:00.000Z"),
        rewards: "abc",
        target: "abc",
      });

      const containerGoalCreate = goalCreateWrapper.findWhere(
        (node) => node.prop("testID") === "containerID",
      );
      expect(containerGoalCreate).toBeTruthy();

      let formikComponent = containerGoalCreate.find("Formik");

      expect(formikComponent).toBeTruthy();

      const inputComponent = shallow(
        <InputComponent onChangeText={jest.fn()} errorTitle={"abc"} />,
      );

      expect(inputComponent).toBeTruthy();

      testTextInputFormik({
        testID: "nameInputID",
        fieldName: "name",
        instanceComponent: formikComponent,
      });

      testTextInputFormik({
        testID: "descriptionInputID",
        fieldName: "description",
        instanceComponent: formikComponent,
      });

      testTextInputFormik({
        testID: "targetInputID",
        fieldName: "target",
        instanceComponent: formikComponent,
      });

      testTextInputFormik({
        testID: "rewardInputID",
        fieldName: "rewards",
        instanceComponent: formikComponent,
      });

      let dateComponent = shallow(
        <CalendarInputComponent
          initialDate={new Date()}
          onChangeDate={jest.fn}
          errorTitle={"abc"}
        />,
      );

      expect(dateComponent).toBeTruthy();

      dateComponent = shallow(
        <CalendarInputComponent onChangeDate={jest.fn} errorTitle={"abc"} />,
      );

      expect(dateComponent).toBeTruthy();

      let calendarObject = shallow(<CalendarObject onChangeDate={jest.fn} />);

      expect(calendarObject).toBeTruthy();

      let dateObject = dateComponent.findWhere(
        (node) => node.prop("testID") === "calendarObjectID",
      );

      dateObject.prop("onChangeDate")(jest.fn);

      const btnToggleDateModal = dateComponent.findWhere(
        (node) => node.prop("testID") === "toggleModalID",
      );

      btnToggleDateModal.simulate("press");

      let datePickerComponent = formikComponent
        .dive()
        .findWhere((node) => node.prop("testID") === "startDateID");

      datePickerComponent.prop("onChangeDate")(jest.fn);

      datePickerComponent = formikComponent
        .dive()
        .findWhere((node) => node.prop("testID") === "endDateID");

      datePickerComponent.prop("onChangeDate")(jest.fn);

      const dropdownComponent = shallow(
        <DropdownComponent defaultButtonText={"abc"} onSelect={jest.fn} />,
      );

      const dropdown = dropdownComponent.findWhere(
        (node) => node.prop("dropdownIconPosition") === "right",
      );

      dropdown.prop("onChangeSearchInputText")(jest.fn);

      const headerComponent = shallow(
        <HeaderComponent title={"abc"} onBackButton={jest.fn} />,
      );

      expect(headerComponent).toBeTruthy();

      const modalComponent = shallow(
        <ConfirmModal
          onConfirm={jest.fn}
          titleModal={"abc"}
          onToggleModal={jest.fn}
          isVisible={true}
        />,
      );

      expect(modalComponent).toBeTruthy();

      const buttonConfirmModal = modalComponent.findWhere(
        (node) => node.prop("testID") === "buttonConfirmID",
      );
      buttonConfirmModal.simulate("press");
    });

    then("I can leave GoalCreate with out errors", () => {
      goalCreateInstance.componentWillUnmount();
      expect(goalCreateWrapper).toBeTruthy();
    });
  });
});
