const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  employeeID: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  employeeType: {
    type: String,
    required: false,
  },
  department: {
    type: String,
    required: false,
  },
  nic: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: true,
  },
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
