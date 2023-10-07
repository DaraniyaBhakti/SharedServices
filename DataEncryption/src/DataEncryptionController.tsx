import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start
import { handleResponseMessage } from "../../../framework/src/Helpers/handle-response-message";
import createRequestMessage from "../../../framework/src/Helpers/create-request-message";
import DocumentPicker, {
  DocumentPickerResponse,
} from "react-native-document-picker";
import { PermissionsAndroid, Platform } from "react-native";
import RNFS from "react-native-fs";
import RNFetchBlob from "rn-fetch-blob";
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
  encryptStringInput: string;
  encryptStringOutput: string;
  decryptStringInput: string;
  decryptStringOutput: string;
  loginToken: string;
  documentPickerFileName: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class DataEncryptionController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiEmailLoginCallId: string | null = "";
  apiEncryptString: string | null = "";
  apiDecryptString: string | null = "";
  apiEncryptFile: string | null = "";
  apiDecryptFile: string | null = "";
  apiEncryptFolder: string | null = "";
  apiDecryptFolder: string | null = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];
    // Customizable Area End

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      encryptStringInput: "",
      encryptStringOutput: "",
      decryptStringInput: "",
      decryptStringOutput: "",
      loginToken: "",
      documentPickerFileName: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
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

      // Customizable Area Start
      switch (apiRequestCallId) {
        case this.apiEmailLoginCallId: {
          this.apiEmailLoginCallId = null;
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: async () => {
              this.setState({ loginToken: responseJson.meta.token });
            },
            onFail: () => this.showAlert(`User Login Failed`, "Please Retry"),
          });
          break;
        }
        case this.apiEncryptString: {
          this.apiEncryptString = null;
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: async () => {
              this.setState({
                encryptStringOutput: responseJson.data,
                decryptStringInput: responseJson.data,
              });
            },
            onFail: () => this.showAlert(responseJson.error, ""),
          });
          break;
        }
        case this.apiDecryptString: {
          this.apiDecryptString = null;
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: async () => {
              this.setState({ decryptStringOutput: responseJson.data });
            },
            onFail: () => this.showAlert(responseJson.error, ""),
          });
          break;
        }
        case this.apiEncryptFile: {
          this.apiEncryptFile = null;
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: async () => {
              const fileName =
                this.state.documentPickerFileName.replace(".txt", "") +
                "_encrypted.txt";
              this.checkPermission(responseJson, fileName);
            },
            onFail: () => {
              this.showAlert(responseJson.error, "Please retry!");
            },
          });
          break;
        }
        case this.apiDecryptFile: {
          this.apiDecryptFile = null;
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: async () => {
              const fileName =
                this.state.documentPickerFileName.replace(".txt", "") +
                "_decrypted.txt";
              this.checkPermission(responseJson, fileName);
            },
            onFail: () => {
              this.showAlert(responseJson.error, "Please retry!");
            },
          });
          break;
        }
        case this.apiEncryptFolder: {
          this.apiEncryptFolder = null;
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: async () => {
              const fileName =
                this.state.documentPickerFileName.replace(".zip", "") +
                "_encrypted.zip";
              this.checkPermission(responseJson, fileName);
            },
            onFail: () => this.showAlert(responseJson.error, "Please retry!"),
          });
          break;
        }
        case this.apiDecryptFolder: {
          this.apiDecryptFolder = null;
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: async () => {
              const fileName =
                this.state.documentPickerFileName.replace(".zip", "") +
                "_decrypted.zip";
              this.checkPermission(responseJson, fileName);
            },
            onFail: () => this.showAlert(responseJson.error, "Please retry!"),
          });
          break;
        }
      }
    }
    // Customizable Area End
  }

  doButtonPressed() {
    let message = new Message(getName(MessageEnum.AccoutLoginSuccess));
    message.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue,
    );
    this.send(message);
  }

  txtInputWebProps = {
    onChangeText: (textString: string) => {
      this.setState({ txtInputValue: textString });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  // web events
  setInputValue = (textString: string) => {
    this.setState({ txtInputValue: textString });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start

  checkPermission = async (responseJson: { data: string; message: string },
    fileName: string,) => {
    if (Platform.OS === "android") {
      try {
        const isPermitted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (isPermitted) {
          this.downloadOutputFiles(responseJson, fileName);
        } else {
          const getPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          );
          getPermission === "granted"
            ? this.downloadOutputFiles(responseJson, fileName)
            : this.showAlert("Error", "Permission denied");
        }
      } catch (error) { }
    } else {
      this.downloadOutputFiles(responseJson, fileName);
    }
  };

  downloadOutputFiles = (
    responseJson: { data: string; message: string },
    fileName: string,
  ) => {
    const fileUrl: string = responseJson.data;
    const filePath =
      Platform.OS === "ios"
        ? RNFS.DocumentDirectoryPath
        : RNFS.DownloadDirectoryPath;
    RNFS.downloadFile({
      fromUrl: fileUrl,
      toFile: filePath + "/" + fileName,
    })
      .promise.then((resolve) => {
        if (resolve.statusCode !== 404 && resolve.statusCode === 200) {
          if (Platform.OS === "ios") {
            RNFetchBlob.ios.previewDocument(filePath + "/" + fileName);
            setTimeout(async () => {
              this.showAlert(responseJson.message, "");
            }, 2000);
          } else {
            this.showAlert(responseJson.message, "");
          }
        } else {
          this.showAlert("Something went wrong", "Please retry");
        }
      })
      .catch((error) => {
        this.showAlert("Error in downloading file", "Please retry");
      });
  };

  emailLogIn = async () => {
    const httpBody = {
      data: {
        attributes: {
          email: configJSON.loginEmail,
          password: configJSON.loginSecurityText,
        },
        type: "email_account",
      },
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.apiEmailLoginCallId = requestMessage.messageId;
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.loginApiEndPoint,
      method: configJSON.postApiMethod,
      body: JSON.stringify(httpBody),
    });
  };

  encryptString = async (inputString: string) => {
    const payloadData = {
      string: inputString,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.apiEncryptString = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.stringEncryptionApiEndpoint,
      method: configJSON.postApiMethod,
      token: this.state.loginToken,
      body: JSON.stringify(payloadData),
    });
  };

  decryptString = async (inputString: string) => {
    const payloadData = {
      string: inputString,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.apiDecryptString = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.stringDecryptionApiEndpoint,
      method: configJSON.postApiMethod,
      token: this.state.loginToken,
      body: JSON.stringify(payloadData),
    });
  };

  encryptFile = async (fileObject: DocumentPickerResponse) => {
    const header = {
      "Content-Type":
        "multipart/form-data; boundary=<calculated when request is sent>",
    };

    const formData = new FormData();
    formData.append("file", fileObject as unknown as Blob);

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.apiEncryptFile = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.fileEncryptionApiEndpoint,
      method: configJSON.postApiMethod,
      token: this.state.loginToken,
      header: header,
      body: formData,
      isFormDataRequest: true,
    });
  };

  decryptFile = async (fileObject: DocumentPickerResponse) => {
    const header = {
      "Content-Type":
        "multipart/form-data; boundary=<calculated when request is sent>",
    };

    const formData = new FormData();
    formData.append("file", fileObject as unknown as Blob);

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.apiDecryptFile = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.fileDecryptionApiEndpoint,
      method: configJSON.postApiMethod,
      token: this.state.loginToken,
      header: header,
      body: formData,
      isFormDataRequest: true,
    });
  };

  encryptFolder = async (folderObject: DocumentPickerResponse) => {
    const header = {
      "Content-Type":
        "multipart/form-data; boundary=<calculated when request is sent>",
    };
    const formData = new FormData();
    formData.append("folder", folderObject as unknown as Blob);

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.apiEncryptFolder = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.folderEncryptionApiEndpoint,
      method: configJSON.postApiMethod,
      token: this.state.loginToken,
      header: header,
      body: formData,
      isFormDataRequest: true,
    });
  };

  decryptFolder = async (folderObject: DocumentPickerResponse) => {
    const header = {
      "Content-Type":
        "multipart/form-data; boundary=<calculated when request is sent>",
    };

    const formData = new FormData();
    formData.append("folder", folderObject as unknown as Blob);

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.apiDecryptFolder = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.folderDecryptionApiEndpoint,
      method: configJSON.postApiMethod,
      token: this.state.loginToken,
      header: header,
      body: formData,
      isFormDataRequest: true,
    });
  };

  componentDidMount = async () => {
    this.emailLogIn();
  };

  filePicker = async (featureType: string) => {
    const fileResource = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.plainText],
      copyTo: "documentDirectory",
    });
    fileResource.name !== null &&
      this.setState({ documentPickerFileName: fileResource.name });
    if (featureType === "encrypt") {
      this.state.documentPickerFileName !== null &&
        this.setState({
          documentPickerFileName: this.state.documentPickerFileName.replace(
            "_decrypted.txt",
            "",
          ),
        });
      this.encryptFile(fileResource);
    } else {
      this.state.documentPickerFileName !== null &&
        this.setState({
          documentPickerFileName: this.state.documentPickerFileName.replace(
            "_encrypted.txt",
            "",
          ),
        });
      this.decryptFile(fileResource);
    }
  };

  folderPicker = async (featureType: string) => {
    const folderResource = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.zip],
      copyTo: "documentDirectory",
    });
    folderResource.name !== null &&
      this.setState({ documentPickerFileName: folderResource.name });
    if (featureType === "encrypt") {
      this.state.documentPickerFileName !== null &&
        this.setState({
          documentPickerFileName: this.state.documentPickerFileName.replace(
            "_decrypted.zip",
            "",
          ),
        });
      this.encryptFolder(folderResource);
    } else {
      this.state.documentPickerFileName !== null &&
        this.setState({
          documentPickerFileName: this.state.documentPickerFileName.replace(
            "_encrypted.zip",
            "",
          ),
        });
      this.decryptFolder(folderResource);
    }
  };

  setEncryptionString = (encryptString: string) => {
    this.setState({ encryptStringInput: encryptString });
  };

  setDecryptionString = (decryptString: string) => {
    this.setState({ decryptStringInput: decryptString });
  };
  // Customizable Area End
}
