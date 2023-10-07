import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { createRequestMessage } from "../../../framework/src/Helpers/create-request-message";
import { handleResponseMessage } from "../../../framework/src/Helpers/handle-response-message";
import { Text } from "react-native";
import React from "react";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

interface IAttributes {
  name?: string;
  type?: string;
  amount?: string;
  currency: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}
interface IRevenuesAndExpensesType {
  id?: string;
  type?: string;
  attributes: IAttributes;
}
interface IDataType {
  total_revenues_amount?: string;
  total_expenses_amount?: string;
  total_budget_amount?: string;
  revenues?: Array<IRevenuesAndExpensesType>;
  expenses?: Array<IRevenuesAndExpensesType>;
}

export interface Props {
  navigation: NavigationProp<ParamListBase>;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  data: IDataType;
  token: string;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class BudgetingForecastingController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  // Customizable Area End
  getBudgetingForecastingApiCallId: string = "";
  loginApiCallId: string = "";
  token: string = "";
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      token: "",
      txtSavedValue: "A",
      enableField: false,
      data: {},
      // Customizable Area Start
      // Customizable Area End
    };
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.AlertMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area End
    ];
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }
  async componentDidMount() {
    await super.componentDidMount();
    this.login();
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<S>): void {
    if (this.state.token !== "" && this.state.token !== prevState.token) {
      this.getBudgetingForecasting();
    }
  }

  currencyType = (name: string) => {
    if (name === "Dollar") {
      return <Text>$</Text>;
    } else if (name === "Pound") {
      return <Text>€</Text>;
    } else if (name === "INR") {
      return <Text>₹</Text>;
    }
    return null;
  };

  async receive(from: string, message: Message) {
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage),
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
      );
      let errorResponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
      );
      if (this.getBudgetingForecastingApiCallId === apiRequestCallId) {
        handleResponseMessage({
          responseJson: responseJson,
          errorJson: errorResponse,
          onSuccess: () => {
            this.setState({ data: responseJson?.data });
          },
          onFail: () => {
            this.showAlert(
              `Error`,
              "Get Budgeting and Forecasting Failed! Please retry",
            );
          },
        });
      } else if (this.loginApiCallId === apiRequestCallId) {
        handleResponseMessage({
          responseJson: responseJson,
          errorJson: errorResponse,
          onSuccess: () => {
            this.setState({ token: responseJson.meta.token });
          },
          onFail: () => {
            this.showAlert(`Error`, "Login Failed! Please retry");
          },
        });
      }
    }
    // Customizable Area Start
    // Customizable Area End
  }

  getBudgetingForecasting = () => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.getBudgetingForecastingApiCallId = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.budgetForecastingURLEndPoint,
      method: configJSON.getApiMethodType,
      token: this.state.token,
    });
  };

  login = () => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    const body = {
      data: {
        attributes: {
          email: configJSON.email,
          password: configJSON.password,
        },
        type: "email_account",
      },
    };
    this.loginApiCallId = requestMessage.messageId;
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.loginURLEndPoint,
      method: configJSON.postApiMethodType,
      body: JSON.stringify(body),
    });
  };

  // web events

  // Customizable Area Start
  // Customizable Area End
}
