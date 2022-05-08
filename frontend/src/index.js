import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import reportWebVitals from "./reportWebVitals";
import Register from "./employee/Register";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import EmployeeDetails from "./employee/EmployeeDetails";
import SearchEmployee from "./employee/SearchEmployee";
import UpdateEmployee from "./employee/UpdateEmployee";
import Login from "./employee/Login";
import Dash from "./employee/Dash";
import Request from "./employee/Request";
import RequestDetails from "./employee/RequestDetails";
import Profile from "./employee/Profile";

import AddPayment from "./finacial/AddPayment";
import PaymentDetails from "./finacial/PaymentDetails";
import UpdatePayment from "./finacial/UpdatePayment";
import fDash from "./finacial/fDash";
import AddSalary from "./finacial/AddSalary";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path={"/register"}>
          <Register />
        </Route>
        <Route exact path={"/edetails"}>
          <EmployeeDetails />
        </Route>
        <Route exact path={"/esearch"}>
          <SearchEmployee />
        </Route>
        <Route exact path={"/eupdate"}>
          <UpdateEmployee />
        </Route>
        <Route exact path={"/login"}>
          <Login />
        </Route>
        <Route exact path={"/dash"}>
          <Dash />
        </Route>
        <Route exact path={"/requestdetails"}>
          <RequestDetails />
        </Route>
        <Route exact path={"/request"}>
          <Request />
        </Route>
        <Route exact path={"/profile"}>
          <Profile />
        </Route>
      </Switch>
      <Switch>
        <Route exact path={"/addpayment"}>
          <AddPayment />
        </Route>
      </Switch>
      <Switch>
        <Route exact path={"/fdash"}>
          <fDash />
        </Route>
      </Switch>
      <Switch>
        <Route exact path={"/paymentdetails"}>
          <PaymentDetails />
        </Route>
      </Switch>
      <Switch>
        <Route exact path={"/updatepayment"}>
          <UpdatePayment />
        </Route>
      </Switch>
      <Switch>
        <Route exact path={"/addsalary"}>
          <AddSalary />
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
