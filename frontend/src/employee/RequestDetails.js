import React, { useState, useEffect } from "react";
import "./styles/viewEmployee.css";
// import arrow from "../assets/images/back.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const columns = [
  {
    id: "employeeID",
    label: "ID",
    minWidth: 100,
  },
  { id: "fullName", label: "Name", minWidth: 100 },

  {
    id: "contact",
    label: "Contact No",
    minWidth: 100,
    align: "right",
  },

  {
    id: "employeeType",
    label: "Post",
    minWidth: 100,
    align: "right",
  },
  {
    id: "department",
    label: "Department",
    minWidth: 100,
    align: "right",
  },
  {
    id: "operations",
    label: "Operations",
    minWidth: 100,
    align: "center",
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    //maxHeight: 440,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RequestDetails() {
  const classes = useStyles();
  const [requests, setRequests] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedfullName, setSelectedfullName] = useState("");
  const [searchTerm, setsearchTerm] = useState("");

  useEffect(() => {
    loadRequests();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loadRequests = async () => {
    try {
      const endpoint = `http://localhost:8070/request/allrequests`;

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const responseBody = await response.json();
        setRequests(responseBody);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePress = (item) => {
    console.log(`${item} deleted`);
    setSelectedfullName(item);
    handleClickOpen();
  };

  const deleteRequest = async () => {
    try {
      const endpoint = "http://localhost:8070/request/delete";
      const body = JSON.stringify({ fullName: selectedfullName });
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      if (response.status === 200) {
        const responseBody = await response.json();
        console.log(responseBody);
        loadRequests();
      }
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  return (
    <div className="view-emp-background">
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Do you want to delete this employee?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Deletion cannot be undone, all information for this employee will be
            lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={deleteRequest}>Yes</Button>
        </DialogActions>
      </Dialog>
      {/* <div className="back-image">
        <a href="http://localhost:3000/admin-dashboard">
          <img src={arrow} height={70} alt={"arrow"} />
        </a>
      </div> */}
      <div className="view-emp-card">
        <Paper className={classes.root}>
          <div className="view-title">Request Employees details</div>
          <input
            className="search sfocus"
            type="text"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => {
              setsearchTerm(e.target.value);
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: 20,
            }}
          >
            <div
              style={{
                cursor: "pointer",
                background: "#42a1f5",
                width: 200,
                textAlign: "center",
                padding: 10,
                borderRadius: 10,
                color: "#fff",
                display: "flex",
                justifyContent: "center",
              }}
            ></div>
          </div>

          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {requests
                  .filter((val) => {
                    if (searchTerm === "") {
                      return val;
                    } else if (
                      val.fullName
                        .toLowerCase()
                        .includes(searchTerm.toLocaleLowerCase()) ||
                      val.email.toLowerCase().includes(searchTerm.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((row, key) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={key}>
                        {columns.map((column, key) => {
                          const value = row[column.id];
                          if (column.id !== "operations")
                            return (
                              <TableCell key={key} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          else return null;
                        })}
                        <TableCell align={"center"}>
                          &nbsp;&nbsp;
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDeletePress(row.fullName)}
                            startIcon={<DeleteIcon />}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
}
