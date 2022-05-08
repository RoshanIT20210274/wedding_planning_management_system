const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({

  employeeName: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  basicSalary: {
    type: String,
    required: true,
  },
  festivalAllowance: {
    type: String,
    required: true,
  },
  specialAllowance: {
    type: String,
    required: true,
  },
  medicalAllowance: {
    type: String,
    required: true,
  },
  netSalary: {
    type: String,
    required: true,
  },
  
  
});

const Salary = mongoose.model("Salary", salarySchema);

module.exports = Salary;