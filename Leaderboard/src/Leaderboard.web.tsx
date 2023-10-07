import React from "react";

import {
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";

// Customizable Area Start
import { Pagination } from "@material-ui/lab";
import { createTheme, styled, ThemeProvider } from "@material-ui/core/styles";
import LeaderboardController, {
  configJSON,
  Props,
} from "./LeaderboardController.web";
import { LeaderboardItem } from "./types";
import { Avatar } from "react-native-elements";
import dayjs from "dayjs";

// Customizable Area End

export default class Leaderboard extends LeaderboardController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    const {
      leaderboardWeb,
      pageIndexWeb,
      totalPageWeb,
      isLoadingWeb,
      moreLoadingWeb,
    } = this.state;

    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <Container maxWidth={"sm"}>
          <Box sx={webStyle.mainWrapper}>
            <Title>{configJSON.labelTitleText}</Title>
            {(isLoadingWeb || moreLoadingWeb) && (
              <CircularProgress size={40} color={"inherit"} />
            )}
            {leaderboardWeb.length > 0 && (
              <>
                {/*First Place*/}
                {pageIndexWeb === 1 && (
                  <FirstPlaceBox key={"top"}>
                    <AvatarBox>
                      <Avatar
                        size={120}
                        rounded={true}
                        title={leaderboardWeb[0].account_user_name ?? ""}
                        source={{ uri: leaderboardWeb[0].profile_picture }}
                        avatarStyle={webStyle.avatarStyle}
                      />
                      <FirstPlaceNumberBox>
                        <FirstPlaceNumberTypo>
                          {leaderboardWeb[0].position}
                        </FirstPlaceNumberTypo>
                      </FirstPlaceNumberBox>
                    </AvatarBox>
                    <FirstUsername>
                      {leaderboardWeb[0].account_user_name}
                    </FirstUsername>
                    <FirstPoint>
                      {leaderboardWeb[0].total_point}
                    </FirstPoint>
                    <CenterTypo>
                      Member since:{" "}
                      {dayjs(leaderboardWeb[0].member_since).format(
                        configJSON.dateFormat,
                      )}
                    </CenterTypo>
                  </FirstPlaceBox>
                )}

                {/*Following Places*/}
                {(pageIndexWeb === 1
                  ? leaderboardWeb.slice(1, leaderboardWeb.length)
                  : leaderboardWeb
                ).map((item: LeaderboardItem) => (
                  <PlaceBox key={item.account_id}>
                    <AvatarBox>
                      <Avatar
                        size={"large"}
                        rounded={true}
                        title={item.account_user_name ?? ""}
                        source={{ uri: item.profile_picture }}
                      />

                      <PlaceNumberBox>
                        <PlaceNumberTypo>{item.position}</PlaceNumberTypo>
                      </PlaceNumberBox>
                    </AvatarBox>

                    <UsernameTypo>{item.account_user_name}</UsernameTypo>
                    <UserPointTypo>{item.total_point}</UserPointTypo>
                    <CenterTypo>
                      Member since:{" "}
                      {dayjs(item.member_since).format(configJSON.dateFormat)}
                    </CenterTypo>
                  </PlaceBox>
                ))}

                <BottomPagination
                  count={totalPageWeb}
                  page={pageIndexWeb}
                  onChange={this.handleGoToPage}
                  shape={"round"}
                />
              </>
            )}
          </Box>
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
  avatarStyle: {
    marginLeft: "auto",
    marginRight: "auto",
  },
};

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

const PlaceBox = styled(Box)({
  border: "1px solid black",
  borderRadius: 10,
  padding: 16,
  margin: "16px 0",
});

const FirstPlaceBox = styled(PlaceBox)({
  width: "50%",
});

const AvatarBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 16,
  width: "100%",
});

const PlaceNumberBox = styled(Box)({
  position: "absolute",
  marginTop: 76,
});

const FirstPlaceNumberBox = styled(PlaceNumberBox)({
  marginTop: 120,
});

const PlaceNumberTypo = styled(Typography)({
  fontWeight: "bold",
  textAlign: "center",
  color: "white",
  backgroundColor: "black",
  borderRadius: 100,
  height: 40,
  width: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const FirstPlaceNumberTypo = styled(PlaceNumberTypo)({
  fontSize: 24,
  height: 52,
  width: 52,
});

const UsernameTypo = styled(Typography)({
  fontSize: 18,
  fontWeight: "bold",
  textAlign: "center",
  marginTop: 24,
});

const UserPointTypo = styled(Typography)({
  fontSize: 18,
  fontWeight: "bold",
  textAlign: "center",
  marginTop: 16,
});

const FirstUsername = styled(UsernameTypo)({
  fontSize: 24,
  marginTop: 46,
});

const FirstPoint = styled(UserPointTypo)({
  fontSize: 20,
  marginTop: 8,
});

const BottomPagination = styled(Pagination)({
  marginTop: 16,
});

const Title = styled(Typography)({
  fontSize: 32,
  color: "#6200EE",
  fontWeight: "bold",
});

const CenterTypo = styled(Typography)({
  textAlign: "center",
});

// Customizable Area End
