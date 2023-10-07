import React from "react";

// Customizable Area Start

import {
  Container,
  Box,
  Button,
  Typography,
  Modal,
  Checkbox,
  FormControlLabel,
  // Customizable Area Start
  // Customizable Area End
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

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
import MentionstaggingListController, {
  Props,
  configJSON,
} from "./MentionstaggingListController";
import { MentionedList } from "./domain/mentions.dto";
import Loader from "../../../components/src/Loader";
// Customizable Area End

export default class MentionstaggingList extends MentionstaggingListController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  mentionedItemView = (data: { item: MentionedList; index: number }) => {
    const { item } = data;
    let userName = this.state.usersList.filter(
      (element: { id: string }) =>
        element.id === item.creatorAccountId.toString(),
    )[0]?.name;
    return (
      <Button
        data-test-id={`touchableListMentionsTaggingItem-${item.id}`}
        onClick={() => {
          this.navigateToPostDetail(item.postId);
        }}>
        <Box sx={webStyle.navigationButtonWrapper}>
          <Typography variant="body2" display="inline">
            {userName} {item.isMentioned ? " mentioned " : " tagged "} you in
            the {item.isPost ? " post" : " comment"}
          </Typography>
        </Box>
      </Button>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth={"sm"}>
          <Box sx={webStyle.mainWrapper}>
            <Typography variant="h6">{configJSON.labelTitleText}</Typography>
            <Typography variant="subtitle1" component="div">
              {configJSON.labelBodyText}
            </Typography>
            <Button
              style={webStyle.buttonStyle}
              onClick={() => {
                this.navigateToMentionstagging();
              }}>
              <Typography variant="subtitle1" component="div">
                Go Back
              </Typography>
            </Button>
            <Box sx={webStyle.row}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    data-test-id={"checkboxTagged"}
                    onChange={() => this.setFilterIsTagged()}
                  />
                }
                label={"Tagged"}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    data-test-id={"checkBoxMentioned"}
                    onChange={() => this.setFilterIsMentioned()}
                  />
                }
                label={"Mentioned"}
              />
            </Box>
            <Box data-test-id={"listMentionsTaggingItem"}>
              {this.filterList().map((item, index) => {
                return (
                  <Box key={item.id} sx={webStyle.inputStyle}>
                    {this.mentionedItemView({ item, index })}
                  </Box>
                );
              })}
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
  navigationButtonWrapper: {
    padding: 20,
    border: "1px solid grey",
    width: "100%",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    textAlign: "left",
    borderRadius: 10,
    margin: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
};
// Customizable Area End
