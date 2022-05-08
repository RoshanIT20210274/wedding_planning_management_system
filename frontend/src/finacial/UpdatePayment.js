import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import { useLocation } from "react-router";
// import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: 1,
    background: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 400,
    marginRight: 400,
    borderRadius: 15,
    padding: 20,
  },
}));

export default function UpdatePayment() {
  const location = useLocation();
  const history = useHistory();
  const [formValues, setFormValues] = useState({
        customerName: "",
        contactNumber: "",
        paymentId: "",
        totalAmount: "",
        firstInstallment: "",
        firstInstallmentDate: "",
        secondInstallment: "",
        secondInstallmentDate: "",
        amountReceived: "",
        amountDue:"",

  });
  const [submitEnabled, setSubmitEnabled] = useState(true);

  const { targetCustomername } = location.state;

  useEffect(() => {
    console.log(targetCustomername)
    const loadPayment = async () => {
      try {
        const endpoint = `http://localhost:8070/payment/find/customerName?customerName=${targetCustomername}`;

        const response = await fetch(endpoint, {
          method: "GET",
          
        });

        if (response.status === 200) {
          
          const responseBody = await response.json();
          console.log(responseBody[0])
          setFormValues({
            customerName: targetCustomername,
            contactNumber: responseBody[0].contactNumber,
            paymentId: responseBody[0].paymentId,
            totalAmount: responseBody[0].totalAmount,
            firstInstallment: responseBody[0].firstInstallment,
            firstInstallmentDate: responseBody[0].firstInstallmentDate,
            secondInstallment: responseBody[0].secondInstallment,
            secondInstallmentDate: responseBody[0].secondInstallmentDate,
            amountReceived: responseBody[0].amountReceived,
            amountDue: responseBody[0].amountDue,
          });
         

          console.log(formValues)
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (targetCustomername) {
      loadPayment();
    }
  }, [targetCustomername]);

  const requiredFields = [
  
    {
      type: "customerName",
      label: "Customer Name",
    },
    {
      type: "contactNumber",
      label: "Contact Number",
    },
    {
      type: "paymentId",
      label: "Payment ID",
    },
    {
      type: "totalAmount",
      label: "Total Amount",
    },
    {
      type: "firstInstallment",
      label: "First Installment ",
    },
    {
      type: "firstInstallmentDate",
      label: "First Installment Date",
    },
    {
      type: "secondInstallment",
      label: "Second Installment",
    },
    {
      type: "secondInstallmentDate",
      label: "Second Installment Date ",
    },
    {
      type: "amountReceived",
      label: "Amount Received",
    },
    {
      type: "amountDue",
      label: "Amount Due",
    },
   
  ];

  const classes = useStyles();

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const submitPayment = async () => {
    setSubmitEnabled(false);
    try {
      const endpoint = "http://localhost:8070/payment/update";
      const body = JSON.stringify(formValues);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      if (response.status === 200) {
        history.push("paymentdetails");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GridItem = ({ fieldName, value, name, key, readOnly = false }) => (
    <React.Fragment key={key}>
      <Grid
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
        item
        xs={6}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            height: "100%",
            alignContent: "center",
            alignItems: "center",
            paddingTop: 6,
            paddingLeft: 3,
          }}
        >
          <h5>{fieldName}</h5>
        </div>
      </Grid>
      <Grid item xs={6}>
        <TextField
          style={{ width: "100%"}}
          id="standard-basic"
          label={fieldName}
          name={name}
          onChange={handleFormChange}
          value={value}
          InputProps={{
            readOnly: readOnly,
          }}
        />
      </Grid>
    </React.Fragment>
  );
  // const handleChange = (e) => {
  //   setFormValues({
  //     ...formValues,
  //     gender: e.target.value,
  //   });
  // };

  return (
    <div
      style={{
        background: "#5696fc",
        height: "100%",
        display: "flex",
        paddingTop: 50,
        paddingBottom: 50,
      }}
    >
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 25,
              }}
            >
              <div
                style={{
                  fontFamily: "poppins",
                  fontSize: 24,
                  fontWeight: "bold",
                }}
              >
                Update Payment
              </div>
            </div>
          </Grid>
          {requiredFields.map((item, key) => {
            console.log(formValues[item.type])
            return GridItem({
              fieldName: item.label,
              name: item.type,
              key: key,
              value: formValues[item.type],
              readOnly: item.label === "customerName",
            });
          })}
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
            item
            xs={6}
          >
            <div
              style={{
                display: "flex",
                flex: 1,
                height: "100%",
                alignContent: "center",
                alignItems: "center",
                paddingTop: 6,
                paddingLeft: 300,
              }}
            ></div>
          </Grid>
         
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 25,
                paddingBottom: 20,
              }}
            >
              <div style={{ width: 200 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={submitPayment}
                  disabled={!submitEnabled}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
