import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Register from "./Register";
import EmployeeDetails from "./EmployeeDetails";
import RequestDetails from "./RequestDetails";
import Request from "./Request";
import UpdateEmployee from "./UpdateEmployee";

function dash() {
  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/register" exact component={Register} />
          <Route path="/edetails" component={EmployeeDetails} />
          <Route path="/requestdetails" component={RequestDetails} />
          <Route path="/request" component={Request} />
          <Route path="/eupdate" component={UpdateEmployee} />
        </Switch>
      </Router>
    </div>
  );
}

export default dash;
