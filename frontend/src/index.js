import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddPayment from './finacial/AddPayment';
import PaymentDetails from './finacial/PaymentDetails';
import UpdatePayment from './finacial/UpdatePayment';
import Dash from './finacial/Dash';
import AddSalary from './finacial/AddSalary';




ReactDOM.render(

  <React.StrictMode>
    <BrowserRouter>
    <Switch>
      <Route exact path = {"/addpayment"}>
       < AddPayment/>
      </Route>
    </Switch>
    <Switch>
      <Route exact path = {"/dash"}>
       < Dash/>
      </Route>
    </Switch>
    <Switch>
      <Route exact path = {"/paymentdetails"}>
       < PaymentDetails/>
      </Route>
    </Switch>
    <Switch>
      <Route exact path = {"/updatepayment"}>
       < UpdatePayment/>
      </Route>
    </Switch>
    <Switch>
      <Route exact path = {"/addsalary"}>
       < AddSalary/>
      </Route>
    </Switch>
    
  
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
