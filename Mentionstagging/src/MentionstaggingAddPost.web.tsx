import React, { CSSProperties } from "react";

import {
  Container,
  Box,
  Input,
  Button,
  Checkbox,
  Typography,
  Modal,
  FormControlLabel,
  // Customizable Area Start
  // Customizable Area End
} from "@material-ui/core";
// Customizable Area Start
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { MentionsInput, Mention, SuggestionDataItem } from "react-mentions";
export enum PLACEHOLDERS {
  id = "__id__",
  display = "__display__",
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#fff",
    },
    secondary: {
      main: "#325fbf",
      contrastText: "#325fbf",
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
import MentionstaggingAddPostController, {
  Props,
  configJSON,
} from "./MentionstaggingAddPostController";
import Loader from "../../../components/src/Loader";

// Customizable Area End
export default class MentionstaggingAddPost extends MentionstaggingAddPostController {
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
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    let tempUserName = this.state.usersList.filter(
      (item: { id: string }) => item.id === this.state.accountId.toString(),
    )[0]?.name;
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
              data-test-id={"goBackBtn"}
              style={webStyle.buttonStyle}
              onClick={() => {
                this.navigateToMentionstagging();
              }}>
              <Typography variant="subtitle1" component="div">
                Go Back
              </Typography>
            </Button>

            <Typography variant="h5">
              {tempUserName?.charAt(0) + tempUserName?.slice(1)}
            </Typography>
            <br />
            <Typography>Title</Typography>
            <Input
              data-test-id={"textInputPostTitle"}
              placeholder="Post Title"
              value={this.state.postTitle}
              fullWidth={true}
              onChange={(text) => this.setPostTitle(text.target.value)}
            />
            <br />
            <Typography>Description</Typography>
            <Input
              data-test-id={"textInputDescription"}
              placeholder="Post Description"
              value={this.state.postDescription}
              fullWidth={true}
              onChange={(text) => this.setDescription(text.target.value)}
            />

            <br />
            <Typography>Body*</Typography>
            <MentionsInput
              data-test-id={"textInputPostText"}
              value={this.state.postText}
              onChange={(text) => {
                this.setPostText(text.target.value);
              }}>
              <Mention
                trigger="@"
                data={() => {
                  return this.state.usersList.map((user) => {
                    return { id: user.id, display: user.name };
                  });
                }}
                renderSuggestion={this.renderSuggestions}
              />
            </MentionsInput>
            <br />
            <Typography>Location*</Typography>
            <Input
              data-test-id={"textInputLocation"}
              placeholder="Post Location"
              value={this.state.location}
              fullWidth={true}
              onChange={(text) => this.setLocation(text.target.value)}
            />
            <br />
            <Typography>Tag*</Typography>

            <Button
              data-test-id={"btnAddTag"}
              style={{ backgroundColor: "white" }}
              onClick={() => {
                this.setUserModalVisibility(true);
              }}>
              <Input
                data-test-id={"textUserTagged"}
                placeholder="Post Tags"
                value={"Tagged users :" + this.state.taggedUserListString}
                fullWidth={true}
                disabled={true}
                onFocus={() => {
                  this.setUserModalVisibility(true);
                }}
              />
            </Button>

            <br />
            <Button
              data-test-id="btnSavePost"
              style={webStyle.buttonStyle}
              onClick={() => {
                this.validatePostData();
              }}>
              <Typography variant="subtitle1" component="div">
                {this.state.isEditablePost
                  ? configJSON.labelEditPost
                  : configJSON.labelSavePost}
              </Typography>
            </Button>

            {this.state.isEditablePost && (
              <Button
                data-test-id="btnDeletePost"
                style={webStyle.buttonStyle}
                onClick={() => {
                  this.deletePost();
                }}>
                <Typography variant="subtitle1" component="div">
                  Delete
                </Typography>
              </Button>
            )}
            <Modal
              data-test-id={"modalUserList"}
              open={this.state.isUserModalVisible}
              onClose={() => this.setUserModalVisibility(false)}
              style={webStyle.modalUserList as CSSProperties}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
              <Box>
                {this.state.usersList.map((item, index) => (
                  <Box key={item.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={item.isTagged}
                          color="secondary"
                          data-test-id={"usersCheckbox-" + item.id}
                          onChange={() => this.checkBoxOnPress({ item, index })}
                        />
                      }
                      label={item.name}
                    />
                  </Box>
                ))}
              </Box>
            </Modal>

            <Modal open={this.state.loading}>
              <Loader loading={this.state.loading} />
            </Modal>
          </Box>
        </Container>
      </ThemeProvider>
      // Customizable Area End
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const webStyle = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "left",
    paddingBottom: "30px",
    background: "#fff",
  },
  buttonStyle: {
    width: "100%",
    height: "45px",
    marginTop: "40px",
    border: "none",
    backgroundColor: "rgb(98, 0, 238)",
    color: "white",
    marginBottom: "10px",
  },
  modalUserList: {
    position: "absolute",
    top: "20%",
    left: "20%",
    justifyContent: "center",
    overflow: "scroll",
    height: "60%",
    display: "block",
    backgroundColor: "white",
  },
};
// Customizable Area End
