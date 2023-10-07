import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import {
  ProfileTemplate,
  ResponseLogin,
  ResponseProfileTemplate,
  SummaryData,
} from "./Types";
import createRequestMessage from "../../../framework/src/Helpers/create-request-message";
import storage from "../../../framework/src/StorageProvider";
import { handleResponseMessage } from "../../../framework/src/Helpers/handle-response-message";
import { Platform } from "react-native";
import DocumentPicker, {
  DocumentPickerResponse,
} from "react-native-document-picker";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  fileResponse: DocumentPickerResponse[];
  searchText: string;
  summaryDetails: SummaryData[];
  filterSummaryDetails: SummaryData[];
  isAddResumeModalOpen: boolean;
  title: string;
  summary: string;
  profileData?: ProfileTemplate;
  isProfileShown: boolean;
  allow_publish: boolean;
  resumeEditId: string;
  name: string;
  personAge: string;
  years_of_experience: string;
  experience_summary: string;
  education_summary: string;
  education_file: DocumentPickerResponse[];
  experience_file: DocumentPickerResponse[];
  authToken: string;
  userID?: number;
  isLoading: boolean;
  isProfileCreated: boolean;
  isEditProfile: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class CvresumeCandidateManagement2Controller extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getResumesDataCallId: string = "";
  addResumesDataCallId: string = "";
  updateResumesDataCallId: string = "";
  deleteResumesDataCallId: string = "";
  getCandidateDetailsCallId: string = "";
  addCandidateDetailsCallId: string = "";
  loginApiCallId: string = "";
  editCandidateDetailsCallId: string = "";
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

    this.state = {
      // Customizable Area Start
      fileResponse: [],
      searchText: "",
      summaryDetails: [],
      filterSummaryDetails: [],
      title: "",
      isAddResumeModalOpen: false,
      summary: "",
      isProfileShown: false,
      authToken: "",
      allow_publish: false,
      resumeEditId: "",
      experience_summary: "",
      name: "",
      years_of_experience: "",
      personAge: "",
      isLoading: false,
      education_summary: "",
      education_file: [],
      experience_file: [],
      isProfileCreated: false,
      isEditProfile: false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start

    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const requestCallDataId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage),
      );

      const responseSuccess = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
      );

      const responseError = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
      );

      switch (requestCallDataId) {
        case this.getResumesDataCallId: {
          handleResponseMessage({
            responseJson: responseSuccess,
            errorJson: responseError,
            onSuccess: () => {
              this.onSuccessGetResumes(responseSuccess);
            },
            onFail: () => {
              this.showAlert(`Error`, "Get Cv resume Failed! Please retry");
            },
          });
          break;
        }
        case this.addResumesDataCallId: {
          handleResponseMessage({
            responseJson: responseSuccess,
            errorJson: responseError,
            onSuccess: () => {
              this.onSuccessAddResumes();
            },
            onFail: () => {
              this.showAlert(`Error`, "adding resume Failed! Please retry");
            },
          });
          break;
        }
        case this.deleteResumesDataCallId: {
          handleResponseMessage({
            responseJson: responseSuccess,
            errorJson: responseError,
            onSuccess: () => {
              this.onSuccessDeleteResumes(responseSuccess);
            },
            onFail: () => {
              this.showAlert(`Error`, "Unable to delete! Please retry");
            },
          });
          break;
        }
        case this.updateResumesDataCallId: {
          handleResponseMessage({
            responseJson: responseSuccess,
            errorJson: responseError,
            onSuccess: () => {
              this.onSuccessUpdateResumes();
            },
            onFail: () => {
              this.showAlert(`Error`, "Unable to delete! Please retry");
            },
          });
          break;
        }
        case this.getCandidateDetailsCallId: {
          handleResponseMessage({
            responseJson: responseSuccess,
            errorJson: responseError,
            onSuccess: () => {
              this.onSuccessGetCandidates(responseSuccess);
              this.setState({ isLoading: false });
            },
            onFail: () => {
              this.setState({ isLoading: false });
              this.showAlert(`Error`, "Get Cv resume Failed! Please retry");
            },
          });
          break;
        }
        case this.editCandidateDetailsCallId: {
          handleResponseMessage({
            responseJson: responseSuccess,
            errorJson: responseError,
            onSuccess: () => {
              this.onSuccessUpdateCandidates(responseSuccess);
              this.setState({ isLoading: false });
            },
            onFail: () => {
              this.setState({ isLoading: false });
              this.showAlert(`Error`, "Get Cv resume Failed! Please retry");
            },
          });
          break;
        }
        case this.addCandidateDetailsCallId: {
          handleResponseMessage({
            responseJson: responseSuccess,
            errorJson: responseError,
            onSuccess: () => {
              this.onSuccessAddCandidates(responseSuccess);
              this.setState({ isLoading: false });
            },
            onFail: () => {
              this.setState({ isLoading: false });
              this.showAlert(`Error`, "Get Token Failed. Please retry!");
            },
          });
          break;
        }
        case this.loginApiCallId: {
          handleResponseMessage({
            responseJson: responseSuccess,
            errorJson: responseError,
            onSuccess: () => {
              this.onSuccessLogin(responseSuccess);
              this.setState({ isLoading: false });
            },
            onFail: () => {
              this.setState({ isLoading: false });
              this.showAlert(`Error`, "Get Token Failed. Please retry!");
            },
          });
          break;
        }
      }
    }

    // Customizable Area End
  }

  // Customizable Area Start

  // onSuceeded and get the candidate data
  onSuccessGetCandidates = (responseDataJson: ResponseProfileTemplate) => {
    if (responseDataJson?.data === null) {
      this.setState({ isProfileCreated: false });
    } else if (responseDataJson.data.attributes) {
      this.setState(
        {
          profileData: responseDataJson.data?.attributes,
          isProfileCreated: true,
        },
        () => {
          this.getResumesData();
        },
      );
    } else {
      // call directly the function to get resumes
    }
  };

  // onSuceeded and get the candidate data
  onSuccessAddCandidates = (responseDataJson?: { message: string }) => {
    if (responseDataJson?.message) {
      this.getCandidateDetails();
    }
  };

  //  onSuccess update the candidate details
  onSuccessUpdateCandidates = (responseDataJson: ResponseProfileTemplate) => {
    if (responseDataJson?.data) {
      this.getCandidateDetails();
      this.setState({
        isProfileCreated: true,
        isEditProfile: false,
        isProfileShown: false,
      });
    }
  };

  // onSuccessfullyLogin
  onSuccessLogin = async (responseDataJson: ResponseLogin) => {
    await storage.set("token", responseDataJson.meta.token);
    await storage.set("user", responseDataJson.meta.id);
    this.setState(
      {
        authToken: responseDataJson.meta.token,
        userID: responseDataJson.meta.id,
      },
      () => this.getCandidateDetails(),
    );
  };

  // common pick function
  selectFile = async () => {
    // Opening Document Picker to select one file
    let response;
    try {
      response = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.ppt,
          DocumentPicker.types.pptx,
        ],
      });
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        this.showAlert("Error", "Canceled");
      } else {
        this.showAlert("Error", JSON.stringify(error));
        throw error;
      }
      response = null;
    }
    return response;
  };

  // pick the document with document picikers
  uploadEducationFile = async () => {
    const response = await this.selectFile();
    if (response) {
      this.setState({ education_file: response });
    }
  };

  // pick the document with document picikers
  uploadExperienceFile = async () => {
    const response: DocumentPickerResponse[] | null = await this.selectFile();
    if (response) {
      this.setState({ experience_file: response });
    }
  };

  // add the candidate details
  handleSubmit = () => {
    if (this.state.name.length <= 1) {
      this.showAlert("Error", "Please enter a name");
      return false;
    }

    if (this.state.personAge.length < 1) {
      this.showAlert("Error", "Please enter age ");
      return false;
    }
    if (isNaN(Number(this.state.personAge))) {
      this.showAlert("Error", "Please enter age in number");
      return false;
    }
    if (this.state.years_of_experience.length < 1) {
      this.showAlert("Error", "Please enter years of experience");
      return false;
    }
    if (isNaN(Number(this.state.years_of_experience))) {
      this.showAlert("Error", "Please enter years of experience");
      return false;
    }
    if (
      this.state.education_summary &&
      this.state.education_summary.length < 1
    ) {
      this.showAlert("Error", "Please enter education summary");
      return false;
    }
    if (this.state.education_summary.length < 1) {
      this.showAlert("Error", "Please enter education summary");
      return false;
    }
    if (this.state.experience_summary.length < 1) {
      this.showAlert("Error", "Please enter education summary");
      return false;
    }
    this.setState({ isLoading: true });
    const headers = {
      "token": this.state.authToken,
      "Content-Type": "multipart/form-data; ",
    };
    const body = new FormData();
    body.append("name", this.state.name);
    body.append("age", this.state.personAge);
    body.append("years_of_experience", this.state.years_of_experience);
    body.append("experience_summary", this.state.experience_summary);
    body.append("education_summary", this.state.education_summary);
    this.state.education_file.length > 0 &&
      this.state.education_file[0].type &&
      body.append("education_file", {
        uri: this.state.education_file[0].uri,
        type: this.state.education_file[0].type,
        name:
          Platform.OS === "ios"
            ? this.state.education_file[0].uri.replace("file://", "")
            : this.state.education_file[0].name,
      } as unknown as Blob);

    this.state.experience_file.length > 0 &&
      this.state.experience_file[0].type &&
      body.append("experience_file", {
        uri: this.state.experience_file[0].uri,
        type: this.state.experience_file[0].type,
        name:
          Platform.OS === "ios"
            ? this.state.experience_file[0].uri.replace("file://", "")
            : this.state.experience_file[0].name,
      } as unknown as Blob);
    if (this.state.isEditProfile) {
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage),
      );
      this.editCandidateDetailsCallId = requestMessage.messageId;

      createRequestMessage({
        requestMessage: requestMessage,
        endPoint: `${configJSON.profile_EndPoint}/${this.state.userID}`,
        method: configJSON.updateApiMethodType,
        header: headers,
        body: body,
      });
    } else {
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage),
      );
      this.addCandidateDetailsCallId = requestMessage.messageId;
      createRequestMessage({
        requestMessage: requestMessage,
        endPoint: configJSON.profile_EndPoint,
        method: configJSON.postApiMethodType,
        header: headers,
        body: body,
      });
    }
  };

  // update the profile by id
  editProfileByUserId = (profileDetails?: ProfileTemplate) => {
    if (profileDetails) {
      this.setState({
        isEditProfile: true,
        isProfileCreated: false,
        personAge: profileDetails?.age.toString(),
        education_summary: profileDetails?.education_summary,
        experience_summary: profileDetails?.experience_summary,
        years_of_experience: profileDetails?.years_of_experience.toString(),
        name: profileDetails.name,
      });
    }
  };

  // fake login function
  handleFakeLoginUser() {
    this.setState({ isLoading: true });
    const requestApiMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.loginApiCallId = requestApiMessage.messageId;
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
    };
    const body = {
      data: {
        attributes: {
          email: configJSON.USERNAME,
          password: configJSON.PASSWORD,
        },
        type: "email_account",
      },
    };
    createRequestMessage({
      requestMessage: requestApiMessage,
      endPoint: configJSON.Login_EndPoint,
      method: configJSON.postApiMethodType,
      header: headers,
      body: JSON.stringify(body),
    });
  }

  // get the candidate details
  getCandidateDetails = () => {
    this.setState({ isLoading: true });
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.getCandidateDetailsCallId = requestMessage.messageId;
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      "token": this.state.authToken,
    };
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.profile_EndPoint}/${this.state.userID}`,
      method: configJSON.getApiMethodType,
      header: headers,
    });
  };

  // added resume successfully
  onSuccessAddResumes = () => {
    this.getResumesData();
    this.setState({
      isAddResumeModalOpen: false,
      title: "",
      allow_publish: false,
      fileResponse: [],
      resumeEditId: "",
      summary: "",
    });
  };

  onSuccessUpdateResumes = () => {
    this.getResumesData();
    this.setState({
      isAddResumeModalOpen: false,
      title: "",
      allow_publish: false,
      fileResponse: [],
      resumeEditId: "",
      summary: "",
    });
  };

  // resume deleted successfully
  onSuccessDeleteResumes = (responseDataJson: { message: string }) => {
    this.showAlert("success", responseDataJson.message);
    this.getResumesData();
  };

  // get the all resumes successfully
  onSuccessGetResumes = (responseDataJson: { data: SummaryData[] }) => {
    this.setState({
      summaryDetails: responseDataJson.data,
      filterSummaryDetails: responseDataJson.data.map((data: SummaryData) => {
        return {
          ...data,
          attributes: {
            ...data.attributes,
            allow_publish: data.attributes.allow_publish ? "public" : "private",
          },
        };
      }),
    });
  };

  handleGoTOResumeList = () => {
    this.props.navigation.navigate("ResumeList");
  };
  // handle Go to template screen
  handleGetAllTemplates = () => {
    this.props.navigation.navigate("TemplateList");
  };

  handlePublicallyAvailable = () => {
    this.handleGoTOResumeList();
  };

  // to toggle the resume modal to add
  toggleAddResumeModal = () => {
    this.setState({ isAddResumeModalOpen: !this.state.isAddResumeModalOpen });
  };
  // pick the new resume
  uploadResumeFile = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: "fullScreen",
        allowMultiSelection: false,
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.ppt,
          DocumentPicker.types.pptx,
        ],
      });
      this.setState({ fileResponse: response });
    } catch (error) {
      this.showAlert("Error", "user not selected docs");
    }
  };
  // to toggle the modal of profile page
  toggleProfile = () => {
    this.setState({ isProfileShown: !this.state.isProfileShown });
  };

  // get resumes function
  getResumesData = () => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.getResumesDataCallId = requestMessage.messageId;
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      "token": this.state.authToken,
    };
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.resume_EndPoint,
      method: configJSON.getApiMethodType,
      header: headers,
    });
  };

  // deleted by id function
  deleteResumseById = (resumeDeleteId: string) => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.deleteResumesDataCallId = requestMessage.messageId;
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      "token": this.state.authToken,
    };
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.resume_EndPoint}/${resumeDeleteId}`,
      method: configJSON.deleteApiMethodType,
      header: headers,
    });
  };

  // to toggle the checkbox check
  toggleCheckbox = () => {
    this.setState({ allow_publish: !this.state.allow_publish });
  };

  editById = (item: SummaryData) => {
    this.setState({
      allow_publish: Boolean(item.attributes.allow_publish),
      summary: item.attributes.summary,
      title: item.attributes.title,
      isAddResumeModalOpen: true,
      resumeEditId: item.id,
    });
  };

  handleSubmitResume = () => {
    if (this.state.title.length <= 0) {
      this.showAlert("Error", "Please enter a title");
      return false;
    }
    if (this.state.fileResponse.length <= 0) {
      this.showAlert("Error", "Please select a resume file");
      return false;
    }
    if (this.state.summary.length <= 0) {
      this.showAlert("Error", "Please write a summary");
      return false;
    }
    this.state.resumeEditId ? this.updateById() : this.addResumeFile();
  };
  updateById = () => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.updateResumesDataCallId = requestMessage.messageId;
    const headers = {
      "token": this.state.authToken,
      "Content-Type": "multipart/form-data",
    };
    const body = new FormData();
    body.append("title", this.state.title);
    body.append("summary", this.state.summary);
    body.append("allow_publish", this.state.allow_publish.toString());
    this.state.fileResponse &&
      this.state.fileResponse[0].type &&
      body.append("file", {
        uri: this.state.fileResponse[0].uri,
        type: this.state.fileResponse[0].type,
        name:
          Platform.OS === "ios"
            ? this.state.fileResponse[0].uri.replace("file://", "")
            : this.state.fileResponse[0].name,
      } as unknown as Blob);

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.resume_EndPoint}/${this.state.resumeEditId}`,
      method: configJSON.updateApiMethodType,
      header: headers,
      body: body,
    });
  };
  // to add the new resume
  addResumeFile = () => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.addResumesDataCallId = requestMessage.messageId;
    const headers = {
      "token": this.state.authToken,
      "Content-Type": "multipart/form-data",
    };
    const body = new FormData();
    body.append("title", this.state.title);
    body.append("summary", this.state.summary);
    body.append("allow_publish", this.state.allow_publish.toString());
    this.state.fileResponse.length > 0 &&
      this.state.fileResponse[0].type &&
      body.append("file", {
        uri: this.state.fileResponse[0].uri,
        type: this.state.fileResponse[0].type,
        name:
          Platform.OS === "ios"
            ? this.state.fileResponse[0].uri.replace("file://", "")
            : this.state.fileResponse[0].name,
      } as unknown as Blob);

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.resume_EndPoint,
      method: configJSON.postApiMethodType,
      header: headers,
      body: body,
    });
  };
  searchByText = (text: string) => {
    const summaryDetails: SummaryData[] = this.state.summaryDetails;
    if (text.length > 0) {
      const filterSummary = summaryDetails.filter((summary) =>
        summary.attributes.title.toLowerCase().includes(text.toLowerCase()),
      );
      this.setState({ searchText: text, summaryDetails: filterSummary });
    } else {
      this.setState({ searchText: text, summaryDetails: summaryDetails });
    }
  };

  filteredByType = (text: string) => {
    const summaryDetails = this.state.filterSummaryDetails;

    this.setState({
      summaryDetails: summaryDetails
        .filter((element) => {
          if ("all".toLowerCase() === text.toLowerCase()) {
            return element;
          } else {
            return (
              element.attributes.allow_publish.toString().toLowerCase() ===
              text.toLowerCase()
            );
          }
        })
        .map((data: SummaryData) => {
          return {
            ...data,
            attributes: {
              ...data.attributes,
              allow_publish: data.attributes.allow_publish === "public",
            },
          };
        }),
    });
  };

  async componentDidMount() {
    const token = await storage.get("token");
    const userId = await storage.get("user");
    if (!token || !userId || token == null || userId == null) {
      this.handleFakeLoginUser();
    } else {
      this.setState({ authToken: token, userID: userId }, () => {
        this.getCandidateDetails();
      });
    }
  }

  // on change education summary text
  onChangeEducationSummary = (text: string) => {
    this.setState({ education_summary: text });
  };

  // on change experience summary text
  onChangeTextExperience = (text: string) => {
    this.setState({ experience_summary: text });
  };

  // common handle change text function
  handleChangeText = (text: string, stateName: string) => {
    this.setState({ ...this.state, [stateName]: text });
  };
  // Customizable Area End
}
