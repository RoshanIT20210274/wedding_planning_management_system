// const express = require("express");
const Salary = require("../models/salarySchema");
const router = require("express").Router();

router.post("/add", async (req, res) => {
  const salary = new Salary(req.body);
  try {
    await salary.save();
    res.send(salary);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/update", async (req, res) => {
  try {
    const salary = req.body;

    const filter = { employeeName: salary.employeeName };
    const update = payment;

    let doc = await Salary.findOneAndUpdate(filter, update, {
      new: true,
    });

    res.send(doc);
  } catch (error) {
    res.status(500).send(JSON.stringify({ message: error.message }));
  }
});

module.exports = router;
