import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import createRequestMessage from "../../../framework/src/Helpers/create-request-message";
import moment from "moment";
import { handleResponseMessage } from "../../../framework/src/Helpers/handle-response-message";
import { Data, IExportData, IJsonData, IPickCsvFile } from "./types";

// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}
export interface S {
  selectExpenseWeb: boolean;
  jsonDataWeb: Array<IJsonData>;
  filteredDataWeb: Array<IJsonData>;
  filterDataModalStateWeb: boolean;
  chartModalStateWeb: boolean;
  incomeLowValueWeb: string;
  incomeLowValueNumberWeb: number;
  incomeHighValueWeb: string;
  incomeHighValueNumberWeb: number;
  expenseLowValueWeb: string;
  expenseLowValueNumberWeb: number;
  expenseHighValueWeb: string;
  expenseHighValueNumberWeb: number;
  startDateWeb: Date;
  endDateWeb: Date;
  exportDataWeb: IExportData;
  selectedCsvWeb: Array<IPickCsvFile>;
  webToken: string;
  chartArrayWeb: IExportData;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class PayrollIntegration2Controller extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  // Customizable Area End

  loginApiCallIdWeb: string = "";
  getPayrollApiCallIdWeb: string = "";
  getPayrollFilterDataCallIdWeb: string = "";
  importPayrollDataCallIdWeb: string = "";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    // Customizable Area End
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.AlertMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      selectExpenseWeb: false,
      jsonDataWeb: [],
      filteredDataWeb: [],
      filterDataModalStateWeb: false,
      chartModalStateWeb: false,
      incomeLowValueWeb: "",
      incomeHighValueWeb: "",
      expenseLowValueWeb: "",
      expenseHighValueWeb: "",
      incomeLowValueNumberWeb: 0,
      expenseLowValueNumberWeb: 0,
      incomeHighValueNumberWeb: 999999999,
      expenseHighValueNumberWeb: 999999999,
      startDateWeb: new Date(1970, 1, 1),
      endDateWeb: new Date(2035, 1, 1),
      exportDataWeb: [],
      selectedCsvWeb: [],
      webToken: "",
      chartArrayWeb: [],
      // Customizable Area Start
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    await super.componentDidMount();
    this.loginWeb();
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<S>): void {
    if (
      this.state.webToken !== "" &&
      this.state.webToken !== prevState.webToken
    ) {
      this.getPayrollData();
    }
  }

  async receive(from: string, message: Message) {
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallIdWeb = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage),
      );
      let responseJsonWeb = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
      );
      let errorResponseWeb = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
      );

      switch (apiRequestCallIdWeb) {
        case this.getPayrollApiCallIdWeb: {
          this.setState({
            jsonDataWeb: responseJsonWeb.data,
            filteredDataWeb: responseJsonWeb.data,
          });
          break;
        }
        case this.getPayrollFilterDataCallIdWeb: {
          this.setState({ exportDataWeb: responseJsonWeb.data }, () => {
            this.exportCsvFile();
          });
          break;
        }
        case this.importPayrollDataCallIdWeb: {
          this.getPayrollData();
          break;
        }
        case this.loginApiCallIdWeb: {
          handleResponseMessage({
            responseJson: responseJsonWeb,
            errorJson: errorResponseWeb,
            onSuccess: () => {
              this.setState({ webToken: responseJsonWeb.meta.token });
            },
            onFail: () => {
              this.showAlert(`Error`, "Login Failed! Please retry");
            },
          });
          break;
        }
      }
    }
    // Customizable Area Start
    // Customizable Area End
  }

  loginWeb = () => {
    const requestMessageWeb = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    const bodyWeb = {
      data: {
        attributes: { email: configJSON.email, password: configJSON.securedText },
        type: configJSON.emailType,
      },
    };

    this.loginApiCallIdWeb = requestMessageWeb.messageId;

    createRequestMessage({
      requestMessage: requestMessageWeb,
      endPoint: configJSON.loginURLEndPoint,
      method: configJSON.postApiMethodType,
      body: JSON.stringify(bodyWeb),
    });
  };

  getPayrollData = () => {
    const requestMessageWeb = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.getPayrollApiCallIdWeb = requestMessageWeb.messageId;

    createRequestMessage({
      requestMessage: requestMessageWeb,
      endPoint: configJSON.getPayrollDataUrl,
      method: configJSON.getMethod,
      token: this.state.webToken,
    });
  };

  getExportPayrollCsvData = () => {
    const requestMessageWeb = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.getPayrollFilterDataCallIdWeb = requestMessageWeb.messageId;

    createRequestMessage({
      requestMessage: requestMessageWeb,
      endPoint: `bx_block_payroll_integration/export_csv?ids=${this.getCsvDataId()}`,
      method: configJSON.getMethod,
      token: this.state.webToken,
    });
  };

  postImportPayrollCsvData = (formData: FormData) => {
    const headersWeb = { "Content-Type": "multipart/form-data" };
    const requestMessageWeb = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.importPayrollDataCallIdWeb = requestMessageWeb.messageId;

    createRequestMessage({
      requestMessage: requestMessageWeb,
      header: headersWeb,
      endPoint: configJSON.importCsvUrl,
      method: configJSON.postMethod,
      body: formData,
      token: this.state.webToken,
      isFormDataRequest: true,
    });
  };

  handleFileUpload = (event: File) => {
    let uploadCsv = event;
    const formData = new FormData();

    formData.append("file", uploadCsv as unknown as Blob);
    this.postImportPayrollCsvData(formData);
  };

  getCsvDataId = () => {
    return this.state.filteredDataWeb.map((item) => item.id).join(",");
  };

  exportCsvFile = async () => {
    const rows = this.state.exportDataWeb;
    const date = new Date();
    let csvContent = "data:text/csv;charset=utf-8,";
    rows.forEach(function (rowArray: Data) {
      let rowData = rowArray.join(",");
      csvContent += rowData + "\r\n";
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");

    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `/payroll-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.csv`,
    );

    document.body.appendChild(link);

    link.click();
  };

  setSelectedWebView = (webViewState: boolean) => {
    this.setState({ selectExpenseWeb: webViewState });
  };

  setFilterWebModalView = (webFilterModal: boolean) => {
    this.setState({ filterDataModalStateWeb: webFilterModal });
  };

  setWebChartModalView = (chartModal: boolean) => {
    const newMainSeries: IExportData = [
      ["Total", "Income", "Expenses"],
      ...this.state.filteredDataWeb.map((item) => {
        let underArray = [];
        for (const [newKey, value] of Object.entries(item)) {
          if (newKey === "income") {
            underArray[0] = "";
            underArray[1] = value;
          } else if (newKey === "expense") {
            underArray[0] = "";
            underArray[2] = value;
          }
        }
        return underArray;
      }),
    ];

    this.setState({
      chartModalStateWeb: chartModal,
      chartArrayWeb: newMainSeries,
    });
  };

  webChangeIncomeLowValue = (newIncomeLowValue: string) => {
    this.setState({
      incomeLowValueWeb: newIncomeLowValue,
      incomeLowValueNumberWeb: Number(newIncomeLowValue),
    });
  };

  webChangeIncomeHighValue = (newIncomeHighValue: string) => {
    this.setState({
      incomeHighValueWeb: newIncomeHighValue,
      incomeHighValueNumberWeb: Number(newIncomeHighValue),
    });
  };

  webChangeExpenseLowValue = (newExpenseLowValue: string) => {
    this.setState({
      expenseLowValueWeb: newExpenseLowValue,
      expenseLowValueNumberWeb: Number(newExpenseLowValue),
    });
  };

  webChangeExpenseHighValue = (newExpenseHighValue: string) => {
    this.setState({
      expenseHighValueWeb: newExpenseHighValue,
      expenseHighValueNumberWeb: Number(newExpenseHighValue),
    });
  };

  webChangeStartDate = (date: Date) => {
    this.setState({ startDateWeb: date });
  };

  webChangeEndDate = (date: Date) => {
    this.setState({ endDateWeb: date });
  };

  filterDateFuncWeb = (newDate: string) => {
    const isBetween = moment(newDate);

    return isBetween.isBetween(
      this.state.startDateWeb,
      this.state.endDateWeb,
      null,
      "[]",
    );
  };

  webFilterNewData = () => {
    const newWebFilteredData = this.state.jsonDataWeb.filter(
      (webValue) =>
        webValue.income >= this.state.incomeLowValueNumberWeb &&
        webValue.income <= this.state.incomeHighValueNumberWeb &&
        webValue.expense >= this.state.expenseLowValueNumberWeb &&
        webValue.expense <= this.state.expenseHighValueNumberWeb &&
        this.filterDateFuncWeb(webValue.date),
    );

    this.setState({
      filteredDataWeb: newWebFilteredData,
      filterDataModalStateWeb: false,
    });
  };

  webClearFilterData = () => {
    this.setState({
      incomeLowValueWeb: "",
      incomeHighValueWeb: "",
      expenseLowValueWeb: "",
      expenseHighValueWeb: "",
      incomeLowValueNumberWeb: 0,
      expenseLowValueNumberWeb: 0,
      incomeHighValueNumberWeb: 999999999,
      expenseHighValueNumberWeb: 999999999,
      startDateWeb: new Date(1970, 1, 1),
      endDateWeb: new Date(2035, 1, 1),
    });

    this.setState({
      filteredDataWeb: this.state.jsonDataWeb,
      filterDataModalStateWeb: false,
    });
  };

  // web events
  // Customizable Area Start
  // Customizable Area End
}
