import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import arrow from "../assets/images/back.jpg";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";

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

export default function UpdateEmployee() {
  const location = useLocation();
  const history = useHistory();
  const [formValues, setFormValues] = useState({
    employeeID: "",
    fullName: "",
    username: "",
    password: "",
    employeeType: "",
    department: "",
    nic: "",
    contact: "",
    address: "",
    email: "",
    gender: "female",
    age: "",
    date: "",
  });
  const [submitEnabled, setSubmitEnabled] = useState(true);

  const { targetEmail } = location.state;

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const endpoint = `http://localhost:8070/employee/find/email?email=${targetEmail}`;

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          const responseBody = await response.json();
          setFormValues({
            employeeID: responseBody[0].employeeID,
            fullName: responseBody[0].fullName,
            username: responseBody[0].username,
            password: responseBody[0].password,
            employeeType: responseBody[0].employeeType,
            department: responseBody[0].department,
            nic: responseBody[0].nic,
            contact: responseBody[0].contact,
            address: responseBody[0].address,
            email: targetEmail,
            gender: responseBody[0].gender,
            age: responseBody[0].age,
            date: responseBody[0].date,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (targetEmail) {
      loadEmployee();
    }
  }, [targetEmail]);

  const requiredFields = [
    {
      type: "employeeID",
      label: "Employee ID",
    },
    {
      type: "fullName",
      label: "Full Name",
    },
    {
      type: "username",
      label: "Username",
    },
    {
      type: "password",
      label: "Password",
    },
    {
      type: "employeeType",
      label: "Employee Type",
    },
    {
      type: "department",
      label: "Department",
    },
    {
      type: "nic",
      label: "NIC No.",
    },
    {
      type: "contact",
      label: "Contact No.",
    },
    {
      type: "address",
      label: "Address",
    },
    {
      type: "email",
      label: "Email",
    },
    {
      type: "age",
      label: "Age",
    },
    {
      type: "date",
      label: "Date",
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

  const submitEmployee = async () => {
    setSubmitEnabled(false);
    try {
      const endpoint = "http://localhost:8070/employee/update";
      const body = JSON.stringify(formValues);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      if (response.status === 200) {
        history.push("edetails");
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
            paddingLeft: 300,
          }}
        >
          <h5>{fieldName}</h5>
        </div>
      </Grid>
      <Grid item xs={6}>
        <TextField
          style={{ width: "100%", paddingRight: 300 }}
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

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      gender: e.target.value,
    });
  };

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
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
        }}
      >
        <a href="http://localhost:3000/edetails">
          <img src={arrow} height={70} alt={"arrow"} />
        </a>
      </div>
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
                Update Employee
              </div>
            </div>
          </Grid>
          {requiredFields.map((item, key) => {
            return GridItem({
              fieldName: item.label,
              name: item.type,
              key: key,
              value: formValues[item.type],
              readOnly: item.label === "Email" || item.label === "Date",
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
            >
              <h5>Gender</h5>
            </div>
          </Grid>
          <Grid item xs={6}>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={formValues.gender}
              onChange={handleChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
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
                  onClick={submitEmployee}
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
