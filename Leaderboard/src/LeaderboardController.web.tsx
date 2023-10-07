import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { LeaderboardItem, LeaderboardItemResponse } from "./types";
import { createRequestMessage } from "../../../framework/src/Helpers/create-request-message";
import { handleResponseMessage } from "../../../framework/src/Helpers/handle-response-message";
import * as React from "react";

// Customizable Area Start
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
  isLoadingWeb: boolean;
  leaderboardWeb: LeaderboardItem[];
  tokenWeb: string;
  totalCountWeb: number;
  totalPageWeb: number;
  pageIndexWeb: number;
  moreLoadingWeb: boolean;
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
  loginLeaderboardWebApi: string;
  getLeaderboardWebApi: string;
  getMoreLeaderboardWebApi: string;
  pageSizeWeb: number;
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
      isLoadingWeb: false,
      leaderboardWeb: [],
      tokenWeb: "",
      pageIndexWeb: 1,
      totalCountWeb: 1,
      totalPageWeb: 1,
      moreLoadingWeb: false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.handleGetLeaderboardWeb = this.handleGetLeaderboardWeb.bind(this);
    this.handleGoToPage = this.handleGoToPage.bind(this);
    this.loginLeaderboardWebApi = "";
    this.getLeaderboardWebApi = "";
    this.getMoreLeaderboardWebApi = "";
    this.pageSizeWeb = 10;
    // Customizable Area End
  }

  async receive(from: string, receiveMessage: Message) {
    // Customizable Area Start
    if (receiveMessage.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallDataId = receiveMessage.getData(
        getName(MessageEnum.RestAPIResponceDataMessage),
      );

      const responseDataJson = receiveMessage.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
      );

      const errorDataJson = receiveMessage.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
      );

      this.setState({
        moreLoadingWeb: false,
      });

      switch (apiRequestCallDataId) {
        case this.getLeaderboardWebApi: {
          this.setState({
            isLoadingWeb: false,
          });
          handleResponseMessage({
            responseJson: responseDataJson,
            errorJson: errorDataJson,
            onSuccess: () => {
              const { leader_boards, message } = responseDataJson;
              if (leader_boards) {
                const { data, meta } = leader_boards;
                this.handleUpdatePaginationWeb(meta);
                this.handleUpdatePageData(data, false);
              } else {
                this.showAlert(``, message);
              }
            },
            onFail: () => {
              this.showAlert(`Error`, "Get Leaderboard Failed! Please retry");
            },
          });
          break;
        }

        case this.loginLeaderboardWebApi: {
          handleResponseMessage({
            responseJson: responseDataJson,
            errorJson: errorDataJson,
            onSuccess: () => {
              this.setState(
                {
                  tokenWeb: responseDataJson.meta.token,
                },
                () => {
                  this.handleGetLeaderboardWeb();
                },
              );
            },
            onFail: () => {
              this.showAlert(`Error`, "Get Token Failed. Please retry!");
            },
          });
          break;
        }

        case this.getMoreLeaderboardWebApi: {
          handleResponseMessage({
            responseJson: responseDataJson,
            errorJson: errorDataJson,
            onSuccess: () => {
              const { leader_boards } = responseDataJson;
              if (leader_boards) {
                const { data, meta } = leader_boards;
                this.handleUpdatePaginationWeb(meta);
                this.handleUpdatePageData(data, true);
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
    this.handleLoginLeaderboardWeb();
  }
  handleConvertDataWeb(data: LeaderboardItemResponse[]): LeaderboardItem[] {
    return data.map((item: LeaderboardItemResponse, index) => ({
      ...item.attributes,
      position: (this.state.pageIndexWeb - 1) * 10 + index + 1,
    }));
  }
  handleUpdatePaginationWeb(meta: {
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
        totalPageWeb: total_pages,
        totalCountWeb: total_count,
        pageIndexWeb: current_page,
      });
    }
  }
  handleUpdatePageData(data: LeaderboardItemResponse[], loadMore: boolean) {
    if (data) {
      const mapping: LeaderboardItem[] = this.handleConvertDataWeb(data);

      if (loadMore) {
        this.setState(() => ({
          moreLoadingWeb: false,
          leaderboardWeb: [...mapping],
        }));
      } else {
        this.setState({
          leaderboardWeb: mapping,
        });
      }
    }
  }
  handleLoginLeaderboardWeb() {
    this.setState({
      isLoadingWeb: true,
    });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.loginLeaderboardWebApi = requestMessage.messageId;

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
  handleGetLeaderboardWeb() {
    this.setState({
      isLoadingWeb: true,
    });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.getLeaderboardWebApi = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.leaderboardURLEndPoint}?per_page=${
        this.pageSizeWeb
      }&page=${1}`,
      method: configJSON.getApiMethodType,
      token: this.state.tokenWeb,
    });
  }

  handleGoToPage(event?: React.ChangeEvent<unknown>, page?: number) {
    if (page) {
      this.setState({
        pageIndexWeb: page,
        moreLoadingWeb: true,
      });

      const requestMoreMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage),
      );

      this.getMoreLeaderboardWebApi = requestMoreMessage.messageId;

      createRequestMessage({
        requestMessage: requestMoreMessage,
        endPoint: `${configJSON.leaderboardURLEndPoint}?per_page=${this.pageSizeWeb}&page=${page}`,
        method: configJSON.getApiMethodType,
        token: this.state.tokenWeb,
      });
    }
  }
  // Customizable Area End
}
