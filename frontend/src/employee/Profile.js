import React, { useState, useEffect } from "react";
import "./styles/profile.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import profile from "../assets/images/main-profile.png";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const Ca = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const currentEmployee = JSON.parse(localStorage.getItem("@employee"));
    setEmployee(currentEmployee[0]);
  }, []);

  return (
    <div className="main-contain">
      <div className="container">
        <form>
          <h1 className="title">Profile</h1>
          <div className="cprofile-image">
            <img src={profile} height={100} alt={"main-profile "} />
          </div>
          <div>
            <Button
              style={{ marginLeft: 550, width: 100, top: -90 }}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              Open Menu
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>
                {" "}
                <a href="http://localhost:3000/login"> Logout</a>
              </MenuItem>
            </Menu>
          </div>
          <div className="row">
            <div className="cpname">
              <p for="fname">Full Name</p>
            </div>
            <div className="cans">
              <TextField
                id="standard-basic"
                label="Full Name"
                variant="standard"
                value={employee?.fullName}
              />
            </div>
          </div>

          <div className="row">
            <div className="cpname">
              <p for="lname">NIC</p>
            </div>
            <div className="cans">
              <TextField
                id="standard-basic"
                label="NIC"
                variant="standard"
                value={employee?.nic}
              />
            </div>
          </div>
          <div className="row">
            <div className="cpname">
              <p for="lname">Contact</p>
            </div>
            <div className="cans">
              <TextField
                id="standard-basic"
                label="Contact"
                variant="standard"
                value={employee?.contact}
              />
            </div>
          </div>

          <div className="row">
            <div className="cpname">
              <p for="lname">Address</p>
            </div>
            <div className="cans">
              <TextField
                id="standard-basic"
                label="Pharmacy Name"
                variant="standard"
                value={employee?.address}
              />
            </div>
          </div>
          <div className="row">
            <div className="cpname">
              <p for="lname">Email</p>
            </div>
            <div className="cans">
              <TextField
                id="standard-basic"
                label="Pharmacy License No"
                variant="standard"
                value={employee?.email}
              />
            </div>
          </div>
          <div className="row">
            <div className="cpname">
              <p for="lname">Department</p>
            </div>
            <div className="cans">
              <TextField
                id="standard-basic"
                label="pharmacy Location"
                variant="standard"
                value={employee?.department}
              />
            </div>
          </div>
        </form>
        <br></br>
        <div style={{ marginLeft: 400 }}>
          <Button
            style={{ margin: 10 }}
            className="p-click"
            variant="contained"
            color="primary"
          >
            {/* <a href="http://localhost:3000/request-customer">Change Details</a> */}
            Change Details
          </Button>
          <Button
            style={{ margin: 10 }}
            className="p-click"
            variant="contained"
            color="primary"
          >
            Salary Details
          </Button>
          {/* <Button
            style={{ margin: 10 }}
            className="p-click"
            variant="contained"
            color="primary"
          >
            
          </Button>
          <Button
            style={{ margin: 10 }}
            className="p-click"
            variant="contained"
            color="primary"
          >
            Payment History
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default Ca;
