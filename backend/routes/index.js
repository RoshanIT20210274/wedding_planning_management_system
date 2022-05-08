const API_test = require("./API_test");
const employees = require("./getEmployees");
const addEmployee = require("./addEmployee");
const removeEmployee = require("./removeEmployee");
const requests = require("./getRequests");
const addRequest = require("./addRequests");
const removeRequest = require("./removeRequest");
const auth = require("./authentication");
const addPayment = require("./addPayment");
const payments = require("./getPayment");
const addSalary = require("./addSalary");

module.exports = [
  API_test,
  employees,
  addEmployee,
  removeEmployee,
  auth,
  requests,
  addRequest,
  removeRequest,
  API_test,
  addPayment,
  payments,
  addSalary,
];
