import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
// import arrow from "../assets/images/back.jpg";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: 1,
    background: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 400,
    marginRight: 400,
    marginTop: 100,
    borderRadius: 15,
    padding: 20,
  },
}));

const validationSchema = yup.object().shape({
  employeeID: yup.string().required("Employee ID is required"),
  fullName: yup.string().required("Full Name is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  employeeType: yup.string().required("Employee Type is required"),
  department: yup.string().required("Department is required"),
  nic: yup.string().required("NIC is required"),
  contact: yup.string().required("Contact No. is required"),
  address: yup.string().required("Address is required"),
  email: yup.string().email("Not a valid email").required("Email is required"),
  age: yup.string().required("Age is required"),
});

export default function Register() {
  const history = useHistory();
  const today = new Date().toLocaleDateString();

  const formik = useFormik({
    initialValues: {
      employeeID: uuidv4(),
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
      date: today,
    },
    validationSchema,
    isInitialValid: false,
  });

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

  const submitEmployee = async () => {
    try {
      const endpoint = "http://localhost:8070/employee/add";
      const body = JSON.stringify(formik.values);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      if (response.status === 200) {
        history.push("/edetails");
        swal("Good job!", "Your details added!", "success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GridItem = ({ fieldName, value, name, key, errror }) => (
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
          onChange={formik.handleChange}
          value={formik.values[name]}
          error={formik.errors[name]}
          helperText={formik.errors[name]}
        />
      </Grid>
    </React.Fragment>
  );

  const handleChange = (e) => {
    formik.setFieldValue("gender", e.target.value);
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
        {/* <a href="http://localhost:3000/admin-dashboard">
          <img src={arrow} height={70} alt={"arrow"} />
        </a> */}
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
                Add Employee
              </div>
            </div>
          </Grid>
          {requiredFields.map((item, key) => {
            return GridItem({
              fieldName: item.label,
              name: item.type,
              key: key,
              value: formik.values[item.type],
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
              value={formik.values.gender}
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
                  disabled={!formik.isValid}
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
