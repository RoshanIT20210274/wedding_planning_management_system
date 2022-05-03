import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchBar(onSearch) {
  const [searchText, setSearchText] = useState("");

  const useStyles = makeStyles((theme) => ({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 400,
      marginBottom: 40,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
      width: 25,
      height: 25,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search"
          inputProps={{ "aria-label": "search healthline" }}
          onChange={handleSearchText}
          onKeyPress={(ev) => {
            if (ev.key === "Enter") {
              ev.preventDefault();
              onSearch(searchText);
            }
          }}
        />
        <IconButton
          className={classes.iconButton}
          aria-label="search"
          onClick={() => onSearch(searchText)}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </React.Fragment>
  );
}
