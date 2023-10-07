import { Linking } from "react-native";
import { handleResponseMessage } from "framework/src/Helpers/handle-response-message";
import { createRequestMessage } from "framework/src/Helpers/create-request-message";
import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import { BlockComponent } from "framework/src/BlockComponent";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";
import { OrderItems } from "./types";

// Customizable Area Start

const urlToBlob = require("urltoblob-ext");

// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  ordersData: OrderItems[];
  isLoading: boolean;
  token: string;
  totalCountWeb: number;
  totalPageWeb: number;
  pageIndexWeb: number;
  pageSizeWeb: number;
  email: string;
  securedText: string;
  accountID: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class CentralisedBillingController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getOrdersDataAPICallId: string;

  loginApiCallId: string;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),

      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      ordersData: [],
      token: "",
      isLoading: false,
      pageIndexWeb: 1,
      totalCountWeb: 1,
      totalPageWeb: 1,
      pageSizeWeb: 10,
      email: "y@y.com",
      securedText: "Y@123",
      accountID: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.login = this.login.bind(this);
    this.getOrdersList = this.getOrdersList.bind(this);
    this.handleOpenInvoice = this.handleOpenInvoice.bind(this);
    this.getOrdersDataAPICallId = "";
    this.loginApiCallId = "";
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage),
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
      );

      const errorJson = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
      );
      this.setState({
        isLoading: false,
      });

      if (apiRequestCallId === this.getOrdersDataAPICallId) {
        handleResponseMessage({
          responseJson,
          errorJson,
          onSuccess: () => {
            this.setState({
              ordersData: responseJson.order.data as OrderItems[],
            });
            this.handleUpdatePaginationWeb(responseJson.pagination.meta);
          },
          onFail: () => {
            this.showAlert("Get order List  Failed", "Please retry!");
          },
        });
      } else if (apiRequestCallId === this.loginApiCallId) {
        handleResponseMessage({
          responseJson,
          errorJson,
          onSuccess: () => {
            this.setState({ token: responseJson.meta.token }, () =>
              this.getOrdersList(),
            );
          },
          onFail: () => {
            this.showAlert("Login  Failed", "Please retry!");
          },
        });
      }
    }

    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount() {
    this.login();
  }

  handleOpenInvoice = async (item: OrderItems) => {
    if (item.attributes?.invoice) {
      await Linking.openURL(item.attributes?.invoice);
    }
  };

  handleInvoiceClick = async (item: OrderItems) => {
    const link = document.createElement("a");
    link.download = item.attributes?.name as string;
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    const blob = await urlToBlob.urlToBlob(item.attributes?.invoice);
    const blobUrl = window.URL.createObjectURL(blob);

    link.href = blobUrl;
    link.click();
    document.body.removeChild(link);
  };

  login = () => {
    this.setState({
      isLoading: true,
    });
    const body = {
      data: {
        attributes: {
          email: this.state.email,
          password: this.state.securedText,
        },
        type: "email_account",
      },
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.loginApiCallId = requestMessage.messageId;

    createRequestMessage({
      requestMessage,
      endPoint: `${configJSON.loginInApiEndPoint}`,
      method: configJSON.postApiMethodType,
      body: JSON.stringify(body),
    });
  };

  async getOrdersList() {
    this.setState({
      isLoading: true,
    });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.getOrdersDataAPICallId = requestMessage.messageId;

    createRequestMessage({
      requestMessage,
      endPoint: `${configJSON.getOrdersApiEndPoint}?per_page=${
        this.state.pageSizeWeb
      }&page=${1}`,
      method: configJSON.getApiMethodType,
    });
  }

  handleGoToPage = (event?: React.ChangeEvent<unknown>, page?: number) => {
    if (page) {
      this.setState({
        pageIndexWeb: page,
        isLoading: true,
      });

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage),
      );

      this.getOrdersDataAPICallId = requestMessage.messageId;

      createRequestMessage({
        requestMessage,
        endPoint: `${configJSON.getOrdersApiEndPoint}?per_page=${this.state.pageSizeWeb}&page=${page}`,
        method: configJSON.getApiMethodType,
      });
    }
  };

  handleUpdatePaginationWeb = (meta: {
    pagination: {
      current_page: number;
      next_page: number | null;
      prev_page: number | null;
      total_pages: number;
      total_count: number;
      current_count: number;
      per_page: number;
    };
  }) => {
    if (meta && meta.pagination) {
      const { total_pages, total_count, current_page } = meta.pagination;

      this.setState({
        totalPageWeb: total_pages,
        totalCountWeb: total_count,
        pageIndexWeb: current_page,
      });
    }
  };
  // Customizable Area End
}
