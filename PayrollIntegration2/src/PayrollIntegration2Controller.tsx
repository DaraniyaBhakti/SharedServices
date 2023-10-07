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
import { PermissionsAndroid } from "react-native";
import XLXS from "xlsx";
import { writeFile, DownloadDirectoryPath } from "react-native-fs";
import DocumentPicker from "react-native-document-picker";
import { IBarChartData, IExportData, IJsonData, IPickCsvFile } from "./types";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  enableField: boolean;
  selectExpense: boolean;
  jsonData: Array<IJsonData>;
  filteredData: Array<IJsonData>;
  filterDataModalState: boolean;
  chartModalState: boolean;
  incomeLowValue: string;
  incomeLowValueNumber: number;
  incomeHighValue: string;
  incomeHighValueNumber: number;
  expenseLowValue: string;
  expenseLowValueNumber: number;
  expenseHighValue: string;
  expenseHighValueNumber: number;
  isOpenStartDatePicker: boolean;
  isOpenEndDatePicker: boolean;
  startDate: Date;
  shownStartDate: string | undefined;
  endDate: Date;
  shownEndDate: string;
  exportData: IExportData;
  selectedCsv: Array<IPickCsvFile> | null;
  token: string;
  incomeBarData: IBarChartData;
  expenseBarData: IBarChartData;
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

  loginApiCallId: string = "";
  getPayrollApiCallId: string = "";
  getPayrollFilterDataCallId: string = "";
  importPayrollDataCallId: string = "";

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
      enableField: false,
      selectExpense: false,
      jsonData: [],
      filteredData: [],
      filterDataModalState: false,
      chartModalState: false,
      incomeLowValue: "",
      incomeHighValue: "",
      expenseLowValue: "",
      expenseHighValue: "",
      incomeLowValueNumber: 0,
      expenseLowValueNumber: 0,
      incomeHighValueNumber: 999999999,
      expenseHighValueNumber: 999999999,
      isOpenStartDatePicker: false,
      isOpenEndDatePicker: false,
      startDate: new Date(1990, 1, 1),
      endDate: new Date(2035, 1, 1),
      shownStartDate: "",
      shownEndDate: "",
      exportData: [],
      selectedCsv: null,
      token: "",
      incomeBarData: {
        labels: [],
        datasets: [],
      },
      expenseBarData: {
        labels: [],
        datasets: [],
      },

      // Customizable Area Start
      // Customizable Area End
    };
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
      this.getPayrollData();
    }
  }

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

      if (this.getPayrollApiCallId === apiRequestCallId) {
        this.setState({
          jsonData: responseJson.data,
          filteredData: responseJson.data,
        });
      }

      if (this.getPayrollFilterDataCallId === apiRequestCallId) {
        this.setState({ exportData: responseJson.data }, () => {
          this.exportCsvFile();
        });
      }

      if (this.importPayrollDataCallId === apiRequestCallId) {
        this.getPayrollData();
      }

      if (this.loginApiCallId === apiRequestCallId) {
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

  login = () => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    const body = {
      data: {
        attributes: {
          email: configJSON.email,
          password: configJSON.securedText,
        },
        type: configJSON.emailType,
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

  getPayrollData = () => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.getPayrollApiCallId = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.getPayrollDataUrl,
      method: configJSON.getMethod,
      token: this.state.token,
    });
  };
  getExportPayrollCsvData = () => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.getPayrollFilterDataCallId = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `bx_block_payroll_integration/export_csv?ids=${this.getCsvDataId()}`,
      method: configJSON.getMethod,
      token: this.state.token,
    });
  };

  postImportPayrollCsvData = (formData: FormData) => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.importPayrollDataCallId = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      header: {
        "Content-Type": "multipart/form-data",
      },
      endPoint: configJSON.importCsvUrl,
      method: configJSON.postMethod,
      body: formData,
      token: this.state.token,
      isFormDataRequest: true,
    });
  };

  importCsvFile = async () => {
    try {
      const setSelectedCsv = await DocumentPicker.pick();

      const formData = new FormData();
      formData.append("file", setSelectedCsv[0] as unknown as Blob, "[PROXY]");

      this.postImportPayrollCsvData(formData);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        this.showAlert(`picker cancelled`, "Please retry!");
      }
    }
  };

  getCsvDataId = () => {
    return this.state.filteredData.map((item) => item.id).join(",");
  };

  exportDataToExcel = () => {
    const { exportData } = this.state;

    const date = new Date();
    let writeBook = XLXS.utils.book_new();
    let writeSampleData = XLXS.utils.aoa_to_sheet(exportData);
    XLXS.utils.book_append_sheet(writeBook, writeSampleData, "Users");
    const writeAbout = XLXS.write(writeBook, {
      type: "binary",
      bookType: "xlsx",
    });

    writeFile(
      DownloadDirectoryPath +
        `/payroll-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.csv`,
      writeAbout,
      "ascii",
    )
      .then(() => {
        this.showAlert(`Done`, "The CSV file has been downloaded!");
      })
      .catch((error) => {
        this.showAlert(`The CSV file has not been downloaded`, `${error}`);
      });
  };

  exportCsvFile = async () => {
    try {
      let isPermittedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (!isPermittedExternalStorage) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: configJSON.permissionTitle,
            buttonNeutral: configJSON.neutralButton,
            buttonNegative: configJSON.cancelText,
            buttonPositive: configJSON.okButton,
            message: "",
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.exportDataToExcel();
        } else {
          this.showAlert(`Permission`, `Denied`);
        }
      } else {
        this.exportDataToExcel();
      }
    } catch (error) {
      this.showAlert(`Permission`, `Denied`);

      return;
    }
  };

  setSelectedView = (viewState: boolean) => {
    this.setState({ selectExpense: viewState });
  };

  setFilterModalView = (filterModal: boolean) => {
    this.setState({ filterDataModalState: filterModal });
  };

  setChartModalView = (chartModal: boolean) => {
    let incomeBarData = {
      labels: this.state.filteredData.map(
        (item, index) => `income ${index + 1}`,
      ),
      datasets: [
        {
          data: this.state.filteredData.map((item) => item.income),
        },
      ],
    };
    let expenseBarData = {
      labels:
        this.state.filteredData &&
        this.state.filteredData.map((item, index) => `expense ${index + 1}`),
      datasets: [
        {
          data:
            this.state.filteredData &&
            this.state.filteredData.map((item) => item.expense),
        },
      ],
    };

    this.setState({
      chartModalState: chartModal,
      incomeBarData: incomeBarData,
      expenseBarData: expenseBarData,
    });
  };

  changeIncomeLowValue = (newIncomeLowValue: string) => {
    this.setState({
      incomeLowValue: newIncomeLowValue,
      incomeLowValueNumber: Number(newIncomeLowValue),
    });
  };

  changeIncomeHighValue = (newIncomeHighValue: string) => {
    this.setState({
      incomeHighValue: newIncomeHighValue,
      incomeHighValueNumber: Number(newIncomeHighValue),
    });
  };

  changeExpenseLowValue = (newExpenseLowValue: string) => {
    this.setState({
      expenseLowValue: newExpenseLowValue,
      expenseLowValueNumber: Number(newExpenseLowValue),
    });
  };

  changeExpenseHighValue = (newExpenseHighValue: string) => {
    this.setState({
      expenseHighValue: newExpenseHighValue,
      expenseHighValueNumber: Number(newExpenseHighValue),
    });
  };

  changeStartDate = (_event: DateTimePickerEvent, date?: Date) => {
    this.setState({
      startDate: date || this.state.startDate,
      isOpenStartDatePicker: false,
    });

    date &&
      this.setState({
        shownStartDate: new Date(date.toString()).toLocaleDateString("en-EN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      });
  };
  changeEndDate = (_event: DateTimePickerEvent, date?: Date) => {
    this.setState({
      endDate: date || this.state.endDate,
      isOpenEndDatePicker: false,
    });

    date &&
      this.setState({
        shownEndDate: new Date(date.toString()).toLocaleDateString("en-EN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      });
  };

  filterDateFunc = (newDate: string) => {
    const isBetween = moment(newDate);

    return isBetween.isBetween(
      this.state.startDate,
      this.state.endDate,
      null,
      "[]",
    );
  };

  filterNewData = () => {
    const newFilteredData = this.state.jsonData.filter(
      (value) =>
        value.income >= this.state.incomeLowValueNumber &&
        value.income <= this.state.incomeHighValueNumber &&
        value.expense >= this.state.expenseLowValueNumber &&
        value.expense <= this.state.expenseHighValueNumber &&
        this.filterDateFunc(value.date),
    );

    this.setState({
      filteredData: newFilteredData,
      filterDataModalState: false,
    });
  };

  clearFilterData = () => {
    this.setState({
      incomeLowValue: "",
      incomeHighValue: "",
      expenseLowValue: "",
      expenseHighValue: "",
      shownStartDate: "",
      shownEndDate: "",
      incomeLowValueNumber: 0,
      expenseLowValueNumber: 0,
      incomeHighValueNumber: 999999999,
      expenseHighValueNumber: 999999999,
      startDate: new Date(1990, 1, 1),
      endDate: new Date(2035, 1, 1),
    });
    this.setState({
      filteredData: this.state.jsonData,
      filterDataModalState: false,
    });
  };

  openStartDatePicker = () => {
    this.setState({ isOpenStartDatePicker: true });
  };

  openEndDatePicker = () => {
    this.setState({ isOpenEndDatePicker: true });
  };

  // web events

  // Customizable Area Start
  // Customizable Area End
}
