// const express = require("express");
const Payment = require("../models/paymentSchema");
const router = require("express").Router();

router.post("/add", async (req, res) => {
  const payment = new Payment(req.body);
  try {
    await payment.save();
    res.send(payment);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/update", async (req, res) => {
  try {
    const payment = req.body;

    const filter = { customerName: payment.customerName };
    const update = payment;

    let doc = await Payment.findOneAndUpdate(filter, update, {
      new: true,
    });

    res.send(doc);
  } catch (error) {
    res.status(500).send(JSON.stringify({ message: error.message }));
  }
});

module.exports = router;
