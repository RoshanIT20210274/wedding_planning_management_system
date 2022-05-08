// const express = require("express");
const Payment = require("../models/paymentSchema");
const router = require("express").Router();

router.get("/allpayment", (req, res) => {
  Payment.find({}, (err, payments) => {
    var paymentMap = [];

    payments.forEach((payment) => {
      paymentMap.push(payment);
    });

    res.send(paymentMap);
  });
});

router.get("/find", (req, res) => {
  try {
    let customerName = "";

    if (req.query.customerName) {
      customerName = req.query.customerName;
    } else {
      throw new Error("Missing parameter 'customerName'");
    }

    Payment.find({}, (err, payments) => {
      var paymentMap = [];

      payments.forEach((payment) => {
        if (payment.customerName.toLowerCase().includes(customerName.toLowerCase()))
          paymentMap.push(payment);
      });

      res.send(paymentMap);
    });
  } catch (error) {
    res.status(500).send(JSON.stringify({ message: error.message }));
  }
});

router.get("/find/customerName", (req, res) => {
  try {
  let customerName = "";
  
  if (req.query.customerName) {
    customerName = req.query.customerName;
  } else {
  throw new Error("Missing parameter 'customerName'");
  }
  
  Payment.find({}, (err, payments) => {
  var paymentMap = [];
  
  payments.forEach((payment) => {
  if (payment.customerName.toLowerCase() === customerName.toLowerCase())
  paymentMap.push(payment);
  });
  
  res.send(JSON.stringify(paymentMap));
  });
  } catch (error) {
  res.status(500).send(JSON.stringify({ message: error.message }));
  }
 });

module.exports = router;
