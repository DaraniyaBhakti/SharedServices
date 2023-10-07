import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { LeaderboardItem, LeaderboardItemResponse } from "./types";
import { handleResponseMessage } from "../../../framework/src/Helpers/handle-response-message";
import { createRequestMessage } from "../../../framework/src/Helpers/create-request-message";
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
  isLoading: boolean;
  needRetakeToken: boolean;
  leaderboard: LeaderboardItem[];
  token: string;
  totalCount: number;
  totalPage: number;
  pageIndex: number;
  moreLoading: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class LeaderboardController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  unsubscribe: object;
  loginApiCallId: string;
  getLeaderboardDataApi: string;
  getMoreLeaderboardDataApi: string;
  pageSize: number;
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
      // Customizable Area Start
      isLoading: false,
      needRetakeToken: true,
      leaderboard: [],
      token: "",
      pageIndex: 1,
      totalCount: 1,
      totalPage: 1,
      moreLoading: false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.handleGetLeaderboard = this.handleGetLeaderboard.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.loginApiCallId = "";
    this.getLeaderboardDataApi = "";
    this.getMoreLeaderboardDataApi = "";
    this.pageSize = 10;
    this.unsubscribe = {};
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallDataId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage),
      );

      const responseDataJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
      );

      const errorDataJson = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
      );

      this.setState({
        isLoading: false,
        moreLoading: false,
      });

      switch (apiRequestCallDataId) {
        case this.getLeaderboardDataApi: {
          handleResponseMessage({
            responseJson: responseDataJson,
            errorJson: errorDataJson,
            onSuccess: () => {
              const { leader_boards } = responseDataJson;
              if (leader_boards) {
                const { data, meta } = leader_boards;
                this.handleUpdatePagination(meta);
                this.handleUpdateData(data, false);
              }
            },
            onFail: () => {
              this.showAlert(`Error`, "Get Leaderboard Failed! Please retry");
            },
          });
          break;
        }

        case this.loginApiCallId: {
          handleResponseMessage({
            responseJson: responseDataJson,
            errorJson: errorDataJson,
            onSuccess: () => {
              this.setState(
                {
                  token: responseDataJson.meta.token,
                  needRetakeToken: false,
                },
                () => this.handleGetLeaderboard(),
              );
            },
            onFail: () => {
              this.showAlert(`Error`, "Get Token Failed. Please retry!");
            },
          });
          break;
        }

        case this.getMoreLeaderboardDataApi: {
          handleResponseMessage({
            responseJson: responseDataJson,
            errorJson: errorDataJson,
            onSuccess: () => {
              const { leader_boards } = responseDataJson;
              if (leader_boards) {
                const { data, meta } = leader_boards;
                this.handleUpdatePagination(meta);
                this.handleUpdateData(data, true);
              }
            },
            onFail: () => {
              this.showAlert(`Error`, "Get Leaderboard Failed! Please retry");
            },
          });
          break;
        }
      }
    }
    // Customizable Area End
  }
  // Customizable Area Start
  async componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("willFocus", () =>
      this.handleComponentDidMount(),
    );
  }
  handleComponentDidMount() {
    if (this.state.needRetakeToken) {
      this.handleLoginUser();
    } else {
      this.handleGetLeaderboard();
    }
  }
  handleConvertData(data: LeaderboardItemResponse[]): LeaderboardItem[] {
    return data.map((item: LeaderboardItemResponse) => item.attributes);
  }
  handleUpdatePagination(meta: {
    pagination: {
      current_page: number;
      next_page: number | null;
      prev_page: number | null;
      total_pages: number;
      total_count: number;
      current_count: number;
      per_page: number;
    };
  }) {
    if (meta && meta.pagination) {
      const { total_pages, total_count, current_page } = meta.pagination;

      this.setState({
        totalPage: total_pages,
        totalCount: total_count,
        pageIndex: current_page,
      });
    }
  }
  handleUpdateData(data: LeaderboardItemResponse[], loadMore: boolean) {
    if (data) {
      const mapping: LeaderboardItem[] = this.handleConvertData(data);

      if (loadMore) {
        this.setState((prevState) => ({
          moreLoading: false,
          leaderboard: [...prevState.leaderboard, ...mapping],
        }));
      } else {
        this.setState({
          leaderboard: mapping,
        });
      }
    }
  }
  handleLoginUser() {
    this.setState({
      isLoading: true,
    });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.loginApiCallId = requestMessage.messageId;

    const body = {
      data: {
        attributes: {
          email: configJSON.loginEmail,
          password: configJSON.loginPassword,
        },
        type: "email_account",
      },
    };

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.loginURLEndPoint,
      method: configJSON.postApiMethodType,
      body: JSON.stringify(body),
    });
  }
  handleGetLeaderboard() {
    this.setState({
      isLoading: true,
    });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.getLeaderboardDataApi = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.leaderboardURLEndPoint}?per_page=${
        this.pageSize
      }&page=${1}`,
      method: configJSON.getApiMethodType,
      token: this.state.token,
    });
  }

  handleLoadMore() {
    const morePageIndex = this.state.pageIndex + 1;

    this.setState({
      pageIndex: this.state.pageIndex + 1,
      moreLoading: true,
    });

    const requestMoreMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.getMoreLeaderboardDataApi = requestMoreMessage.messageId;

    createRequestMessage({
      requestMessage: requestMoreMessage,
      endPoint: `${configJSON.leaderboardURLEndPoint}?per_page=${this.pageSize}&page=${morePageIndex}`,
      method: configJSON.getApiMethodType,
      token: this.state.token,
    });
  }
  // Customizable Area End
}
