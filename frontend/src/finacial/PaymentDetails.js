import React, { useState, useEffect } from "react";
import "./viewPayment.css";
// import arrow from "../../assets/images/back.jpg";
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
    id: "paymentId",
    label: "ID",
    minWidth: 100,
  },
//   { id: "customerName", label: "Name", minWidth: 100 },
  {
    id: "contactNumber",
    label: "Contact No",
    minWidth: 100,
    align: "right",
    
  },
  {
    id: "totalAmount",
    label: "Total Amount",
    minWidth: 100,
    align: "right",
  },
  {
    id: "firstInstallment",
    label: "I Installment",
    minWidth: 100,
    align: "right",
  },
  {
    id: "secondInstallment",
    label: "II Installment",
    minWidth: 100,
    align: "right",
  },
  {
    id: "amountReceived",
    label: "Amount Received",
    minWidth: 100,
    align: "right",
  },
  {
    id: "amountDue",
    label: "Amount Due",
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

export default function PaymentDetails() {
  const classes = useStyles();
  const [payments, setPayments] = useState([]);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const [searchTerm, setsearchTerm] = useState("");

  useEffect(() => {
    loadPayements();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loadPayements = async () => {
    try {
      const endpoint = `http://localhost:8070/payment/allpayment`;

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const responseBody = await response.json();
        setPayments(responseBody);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePress = (item) => {
    history.push("/updatepayment", {
      targetCustomername: item,
    });
  };

  const handleDeletePress = (item) => {
    console.log(`${item} deleted`);
    setSelectedCustomerName(item);
    handleClickOpen();
  };

  const deletePayments = async () => {
    try {
      const endpoint = "http://localhost:8070/payment/delete";
      const body = JSON.stringify({ customerName: selectedCustomerName });
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
        loadPayements();
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
      "Contact No",
      "Total_Amount",
      "I_Installment",
      "II_Installmen",
      "Amount_Received",
      "Amount_Due",
    ];
    let data = [];
    payments.map((item) => {
      let dataRow = {
        ID: item.paymentId,
        "Contact No": item.contactNumber,
        "Total_Amount": item.totalAmount,
        "I_Installment": item.firstInstallment,
        "II_Installmen": item.secondInstallment,
        "Amount_Received": item.amountReceived,
        "Amount_Due":item.amountDue,
      };
      return data.push(dataRow);
    });
    doc.text("Payment Record", 150, 10, { align: "center" });
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
        <DialogTitle>{"Do you want to delete this customer payment details?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Deletion cannot be undone, all information for this customer payment details will be
            lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={deletePayments}>Yes</Button>
        </DialogActions>
      </Dialog>
      {/* <div className="back-image">
        <a href="http://localhost:3000/admin-dashboard">
          <img src={arrow} height={70} alt={"arrow"} />
        </a>
      </div> */}
      <div className="view-emp-card">
        <Paper className={classes.root}>
          <div className="view-title">Payment Details</div>

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
              <VscFilePdf size={24} /> &nbsp; Download PDF
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
                {payments.filter((val) => {
                 if (searchTerm === "") {
                 return val;
                 } else if (
val.contactNumber
.toLowerCase()
.includes(searchTerm.toLocaleLowerCase()) ||
val.totalAmount.toLowerCase().includes(searchTerm.toLowerCase())
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
                          onClick={() => {
                            handleUpdatePress(row.customerName)
                      
                          }}
                          startIcon={<CreateIcon />}
                        >
                          Update
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDeletePress(row.customerName)}
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
