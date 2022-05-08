import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import AddPayment from "./AddPayment";
import PaymentDetails from "./PaymentDetails";
import UpdatePayment from "./UpdatePayment";
import AddSalary from "./AddSalary";
function dash() {
  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/addpayment" exact component={AddPayment} />
          <Route path="/paymentdetails" component={PaymentDetails} />
          <Route path="/updatepayment" component={UpdatePayment} />
          <Route path="/AddSalary" component={AddSalary} />
        </Switch>
      </Router>
    </div>
  );
}

export default dash;
