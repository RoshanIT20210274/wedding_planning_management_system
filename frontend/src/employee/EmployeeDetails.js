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
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { jsPDF } from "jspdf";
import { VscFilePdf } from "react-icons/vsc";

const columns = [
  {
    id: "employeeID",
    label: "ID",
    minWidth: 100,
  },
  { id: "fullName", label: "Name", minWidth: 100 },
  {
    id: "nic",
    label: "NIC",
    minWidth: 100,
    align: "right",
  },
  {
    id: "contact",
    label: "Contact No",
    minWidth: 100,
    align: "right",
  },
  {
    id: "email",
    label: "Email",
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

export default function EmployeeDetails() {
  const classes = useStyles();
  const [employees, setEmployees] = useState([]);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [searchTerm, setsearchTerm] = useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loadEmployees = async () => {
    try {
      const endpoint = `http://localhost:8070/employee/allemployees`;

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const responseBody = await response.json();
        setEmployees(responseBody);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePress = (item) => {
    history.push("/eupdate", {
      targetEmail: item,
    });
  };

  const handleDeletePress = (item) => {
    console.log(`${item} deleted`);
    setSelectedEmail(item);
    handleClickOpen();
  };

  const deleteEmployee = async () => {
    try {
      const endpoint = "http://localhost:8070/employee/delete";
      const body = JSON.stringify({ email: selectedEmail });
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
        loadEmployees();
      }
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
    const headers = [
      "ID",
      "Name",
      "NIC",
      "Contact No",
      "Email",
      "Post",
      "Department",
    ];
    let data = [];
    employees.map((item) => {
      let dataRow = {
        ID: item.employeeID,
        Name: item.fullName,
        NIC: item.nic,
        "Contact No": item.contact,
        Email: item.email,
        Post: item.employeeType,
        Department: item.department,
      };
      return data.push(dataRow);
    });
    doc.text("Employee Record", 150, 10, { align: "center" });
    doc.table(1, 20, data, headers, { autoSize: true });
    doc.save("a4.pdf");
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
          <Button onClick={deleteEmployee}>Yes</Button>
        </DialogActions>
      </Dialog>
      {/* <div className="back-image">
        <a href="http://localhost:3000/admin-dashboard">
          <img src={arrow} height={70} alt={"arrow"} />
        </a>
      </div> */}
      <div className="view-emp-card">
        <Paper className={classes.root}>
          <div className="view-title">Employee Details</div>
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
              onClick={handleDownloadPdf}
            >
              <VscFilePdf size={24} /> &nbsp; Generate Report
            </div>
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
                {employees
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
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleUpdatePress(row.email)}
                            startIcon={<CreateIcon />}
                          >
                            Update
                          </Button>
                          &nbsp;&nbsp;
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDeletePress(row.email)}
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
