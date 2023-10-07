import React from "react";

import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Input,
  TextField,
  Typography,
} from "@material-ui/core";

// Customizable Area Start
import { createTheme, styled, ThemeProvider } from "@material-ui/core/styles";
import GoalRetrieveController, { Props } from "./GoalRetrieveController.web";
import { dropdownIcon, searchIcon } from "../assets";
import { Goal } from "../types";
import { GoalItemList } from "../components/GoalItemList/GoalItemList.web";
import BackIconWeb from "../components/BackIcon/BackIcon.web";

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

const HeaderContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Header = styled(Box)({
  border: "1px solid #826FFC",
  borderRadius: 50,
  padding: "24px 24px",
  margin: "16px 50px",
  width: "70%",
});

const SearchContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
});

const Search = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "70%",
});

const InputSearch = styled(Input)({
  borderBottomWidth: 10,
  marginLeft: 24,
  flex: 1,
});

const Filter = styled(Button)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
});

const FilterLabel = styled(Typography)({
  marginRight: 16,
});

const Item = styled(Box)({
  padding: 1,
  textAlign: "center",
  color: "#826FFC",
  fontFamily: "Roboto-Medium",
  fontSize: 20,
  fontWeight: "bold",
});

const FilterContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  marginTop: "2vh",
});

const FilterItem = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "50%",
});

const FilterItemLabel = styled(Typography)({
  width: "50%",
});

const ProgressContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// Customizable Area End

export default class GoalRetrieve extends GoalRetrieveController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    const {
      isLoading,
      nameFilter,
      dateFilter,
      isFiltered,
      filterSelectionVisible,
      filterVisible,
      goalList,
    } = this.state;
    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <BackIconWeb onClick={this.handleGoBack} />
        <Box sx={webStyle.mainWrapper}>
          {/*Header*/}
          <HeaderContainer>
            <Header>
              {/*Search*/}
              <SearchContainer>
                <Search>
                  <img alt={"Search"} src={searchIcon} />
                  <InputSearch
                    placeholder={"Search"}
                    value={nameFilter}
                    onChange={this.handleChangeSearch}
                  />
                </Search>

                {isFiltered && (
                  <Button onClick={this.handleCancelFilter}>
                    Cancel filter
                  </Button>
                )}

                {/*Filter*/}
                <Filter onClick={this.handleToggleFilterVisible}>
                  <FilterLabel>Filter</FilterLabel>
                  <img alt={"Filter"} src={dropdownIcon} />
                </Filter>
              </SearchContainer>
              {filterVisible && (
                <Box>
                  {filterSelectionVisible && (
                    <FilterContainer>
                      <FilterItem>
                        <FilterItemLabel>Goal Date</FilterItemLabel>

                        <TextField
                          id="date"
                          type="date"
                          placeholder={"Please choose"}
                          value={dateFilter}
                          onChange={this.handleChangeDate}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </FilterItem>
                    </FilterContainer>
                  )}
                </Box>
              )}
            </Header>
          </HeaderContainer>

          {/*Body*/}
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Item>Goal Name</Item>
            </Grid>
            <Grid item xs={2}>
              <Item>Goal Target</Item>
            </Grid>
            <Grid item xs={2}>
              <Item>Goal Status</Item>
            </Grid>
            <Grid item xs={2}>
              <Item>Start & End Date</Item>
            </Grid>
            <Grid item xs={3}>
              <Item>Action</Item>
            </Grid>
          </Grid>

          {isLoading ? (
            <ProgressContainer>
              <CircularProgress size={40} color={"inherit"} />
            </ProgressContainer>
          ) : (
            <Box>
              {[
                goalList.map((item: Goal, index) => (
                  <GoalItemList
                    goal={item}
                    key={item.id}
                    onDeleteGoal={this.handleDeleteGoalWeb}
                    navigation={this.props.navigation}
                    totalGoal={goalList.length}
                    indexGoal={index}
                  />
                )),
              ]}
            </Box>
          )}
        </Box>
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
    paddingBottom: "30px",
  },
};
// Customizable Area End
