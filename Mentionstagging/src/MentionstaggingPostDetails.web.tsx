import React from "react";

// Customizable Area Start

import {
  Container,
  Box,
  Button,
  Typography,
  Modal,
  // Customizable Area Start
  // Customizable Area End
} from "@material-ui/core";

// Merge Engine - import assets - Start
import Loader from "../../../components/src/Loader";
// Customizable Area End

import MentionstaggingPostDetailsController, {
  Props,
  configJSON,
} from "./MentionstaggingPostDetailsController";
import { CommentListItem } from "./domain/mentions.dto";
import { Mention, MentionsInput, SuggestionDataItem } from "react-mentions";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#fff",
    },
  },
  typography: {
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      margin: "20px 0px",
    },
  },
});

export default class MentionstaggingPostDetails extends MentionstaggingPostDetailsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  renderSuggestions: (
    suggestion: SuggestionDataItem,
    search: string,
    highlightedDisplay: React.ReactNode,
    index: number,
    focused: boolean,
  ) => React.ReactNode = (
    suggestion,
    search,
    highlightedDisplay,
    index,
    focused,
  ) => {
    return (
      <Typography
        style={{
          color: focused ? "#437FFE" : "black",
          fontWeight: 700,
        }}>
        {suggestion.display}
      </Typography>
    );
  };

  commentListItemView = (data: { item: CommentListItem; index: number }) => {
    const { item } = data;
    return (
      <Box style={webStyle.viewCommentListItem}>
        <Box style={webStyle.width85Pr}>
          <Typography data-test-id={"textCommentUserName"}>
            {item.name}
          </Typography>
          {item.commentText?.split(" ").map((word: string, index: number) => (
            <Typography
              data-test-id={"textComment"}
              display="inline"
              key={word + index.toString()}
              style={
                word.charAt(0) === "@"
                  ? webStyle.textMentionBold
                  : webStyle.textMention
              }>
              {word + " "}
            </Typography>
          ))}
        </Box>
        {item.accountID === this.state.userAccountId ? (
          <Box style={webStyle.flexDirRow}>
            <Button
              data-test-id={`btnEditComment-${item.id}`}
              onClick={() =>
                this.setEditComment(
                  true,
                  parseInt(item.id, 10),
                  item.commentText,
                )
              }>
              <Typography>Edit</Typography>
            </Button>
            <Button
              data-test-id={`btnDeleteComment-${item.id}`}
              onClick={() => this.deleteComment(item.id)}>
              <Typography>Delete</Typography>
            </Button>
          </Box>
        ) : null}
      </Box>
    );
  };

  renderHeader = () => {
    let userName = this.state.usersList.filter(
      (element) => element.id === this.state.accountId.toString(),
    )[0]?.name;
    return (
      <Box style={webStyle.zIndex}>
        <Box style={webStyle.viewTopHeader}>
          <Box style={webStyle.flexDirRow}>
            <Box style={webStyle.viewFirstLetter}>
              <Typography data-test-id={"textUserFirstAlphabet"}>
                {userName?.charAt(0).toUpperCase()}
              </Typography>
            </Box>
            <Typography data-test-id={"textUserName"}>
              {userName?.charAt(0).toUpperCase() + userName?.slice(1)}
            </Typography>
          </Box>
          {this.state.accountId === this.state.userAccountId && (
            <Button
              data-test-id={"btnPostEdit"}
              onClick={() => this.navigateToAddPostScreen()}
            />
          )}
        </Box>

        <Box style={webStyle.postText}>
          <Typography>Title:</Typography>
          <Typography data-test-id={"textPostTitle"} style={webStyle.textColor}>
            {this.state.postTitle}
          </Typography>
          <br />
          <br />
          {this.state.postDescription !== "" && (
            <>
              <Typography>Description</Typography>
              <Box>
                <Typography
                  data-test-id={"textPostDescription"}
                  style={webStyle.textColor}>
                  {this.state.postDescription}
                </Typography>
              </Box>
            </>
          )}

          <Typography>Body:</Typography>
          <Typography>
            {this.state.postText
              .split(" ")
              .map((word: string, index: number) => (
                <Typography
                  display="inline"
                  key={word + index.toString()}
                  style={
                    word.charAt(0) === "@"
                      ? webStyle.textMentionBold
                      : webStyle.textMention
                  }>
                  {word + " "}
                </Typography>
              ))}
          </Typography>

          {this.state.location !== "" && (
            <>
              <Typography>Location:</Typography>
              <Box>
                <Typography
                  data-test-id={"textLocation"}
                  style={webStyle.textColor}>
                  {this.state.location}
                </Typography>
              </Box>
            </>
          )}

          {this.state.taggedUserListString !== "" && (
            <>
              <Typography>Tagged Users:</Typography>
              <Box>
                <Typography data-test-id={"textSelectedUserTag"}>
                  {this.state.taggedUserListString
                    .split(" ")
                    .map((word: string, index: number) => (
                      <Typography
                        display="inline"
                        key={word + index.toString()}
                        style={
                          word.charAt(0) === "@"
                            ? webStyle.textMentionBold
                            : webStyle.textMention
                        }>
                        {" "}
                        {word + " "}
                      </Typography>
                    ))}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Box>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth={"sm"}>
          <Box>
            <Button
              style={webStyle.buttonStyle}
              onClick={() => {
                this.navigateToMentionstagging();
              }}>
              <Typography variant="subtitle1" component="div">
                Go Back
              </Typography>
            </Button>

            {this.renderHeader()}
            <br />
            <Typography>Comments:</Typography>
            {this.state?.commentsData?.map((item, index) => {
              return this.commentListItemView({ item, index });
            })}
          </Box>
          <br />
          <hr />
          <Box style={webStyle.flex1}>
            <Box>
              <Box style={webStyle.flexDirRow}>
                <Typography>Comment:</Typography>
                <MentionsInput
                  data-test-id={"textInputComment"}
                  value={this.state.commentText}
                  onChange={(text) => {
                    this.setCommentText(text.target.value);
                  }}>
                  <Mention
                    trigger="@"
                    // markup={`@${PLACEHOLDERS.display}`}
                    // displayTransform={(user) => `@${user}`}
                    data={() => {
                      return this.state.usersList.map((user) => {
                        return { id: user.id, display: user.name };
                      });
                    }}
                    renderSuggestion={this.renderSuggestions}
                  />
                </MentionsInput>
                <Button
                  onClick={async () => {
                    await this.addComment();
                    this.hideKeyboard();
                  }}
                  style={webStyle.imgComment}
                  data-test-id={"btnAddComment"}>
                  <Typography
                    data-test-id={"textPost"}
                    style={webStyle.textPost}>
                    {this.state.isEditComment ? "Update" : configJSON.labelSave}
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Box>
          <Modal open={this.state.loading}>
            <Loader loading={this.state.loading} />
          </Modal>
        </Container>
      </ThemeProvider>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}
// Customizable Area Start
// Customizable Area End

// Customizable Area Start
const webStyle = {
  viewTopHeader: {
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  buttonStyle: {
    width: "100%",
    height: "45px",
    marginTop: "40px",
    border: "none",
    backgroundColor: "rgb(98, 0, 238)",
    color: "white",
    margin: "10px",
  },
  postText: {
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  },
  viewFirstLetter: {
    marginVertical: "20",
    marginRight: "10",
    width: "30px",
    height: "30px",
    backgroundColor: "#d2d2d2",
    borderRadius: "20",
    alignItems: "center",
    justifyContent: "center",
  },
  flexDirRow: {
    flexDirection: "row" as "row",
  },
  width85Pr: {
    width: "85%",
  },
  textPost: {
    color: "#4781FC",
    fontSize: 15,
  },
  viewCommentListItem: {
    borderBottomColor: "#d2d2d2",
    borderBottomWidth: 1,
    marginHorizontal: 18,
    marginVertical: 5,
    //flexDirection: "row",
    justifyContent: "space-between",
  },
  textUserName: {
    fontWeight: "500",
    fontSize: 13,
  },
  textComment: {
    textAlign: "left",
    marginBottom: "10px",
    fontSize: "15px",
  },
  textColor: {
    color: "black",
  },
  imgComment: {
    alignSelf: "flex-end",
    marginBottom: 12,
  },
  zIndex: {
    zIndex: -999999,
  },
  flexGrow: {
    flexGrow: 1,
  },
  flex1: {
    flex: 1,
  },
  textMention: {
    color: "black",
    fontWeight: 400,
  },
  textMentionBold: {
    color: "#437FFE",
    fontWeight: 700,
  },
};

// Customizable Area End
