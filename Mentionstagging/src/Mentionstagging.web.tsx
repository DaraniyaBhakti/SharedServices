import React from "react";

import {
  Container,
  Box,
  Button,
  Typography,
  Modal,
  // Customizable Area Start
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Loader from "../../../components/src/Loader";

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
// Customizable Area End

import MentionstaggingController, {
  Props,
  configJSON,
} from "./MentionstaggingController";
import { PostListItem } from "./domain/mentions.dto";

export default class Mentionstagging extends MentionstaggingController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  postItemView = (data: { item: PostListItem; index: number }) => {
    const { item } = data;
    let userName = this.state.userList.filter(
      (element: { id: string }) => element.id === item.accountId.toString(),
    )[0]?.name;
    let postText = item.body;
    return (
      <Button
        data-test-id={`touchableListPostItem-${item.id}`}
        onClick={() => {
          this.navigateToPostDetail(item.id);
        }}>
        <Box sx={webStyle.mentionWrapper}>
          <Typography variant="h5" component="div">
            {userName}
          </Typography>
          <Typography variant="body2" display="inline">
            {postText?.split(" ").map((word: string, postIndex: number) => (
              <Typography
                key={word + postIndex.toString()}
                display="inline"
                style={
                  word.charAt(0) === "@"
                    ? webStyle.textMentionBold
                    : webStyle.textMention
                }>
                {word + " "}
              </Typography>
            ))}
          </Typography>
        </Box>
      </Button>
    );
  };
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <Container maxWidth={"sm"}>
          <Box sx={webStyle.mainWrapper}>
            <Typography variant="h6">{configJSON.labelTitleText}</Typography>
            <Typography variant="subtitle1" component="div">
              {configJSON.labelBodyText}
            </Typography>
            <Button
              data-test-id={"btnAddPost"}
              style={webStyle.buttonStyle}
              onClick={() => {
                this.navigateToAddPost();
              }}>
              <Typography variant="subtitle1" component="div">
                Add New Post
              </Typography>
            </Button>
            <Button
              data-test-id={"btnMentionsTagging"}
              style={webStyle.buttonStyle}
              onClick={() => {
                this.navigateToMentionsTaggingList();
              }}>
              <Typography variant="subtitle1" component="div">
                Mentions Tagging List
              </Typography>
            </Button>
            {this.state.postDataList.map((item, index) => {
              return (
                <Box key={item.id} sx={webStyle.inputStyle}>
                  {this.postItemView({ item, index })}
                </Box>
              );
            })}
          </Box>

          <Modal open={this.state.loading}>
            <Loader loading={this.state.loading} />
          </Modal>
        </Container>
      </ThemeProvider>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const webStyle = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    background: "#fff",
  },
  inputStyle: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "space-between",
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
  textMention: {
    color: "black",
    fontWeight: 400,
  },
  textMentionBold: {
    color: "#437FFE",
    fontWeight: 700,
  },
  mentionWrapper: {
    padding: 20,
    border: "1px solid grey",
    width: "100%",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    textAlign: "left",
    borderRadius: 10,
    margin: 2,
  },
};
// Customizable Area End
