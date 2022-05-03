const API_test = require("./API_test");
const employees = require("./getEmployees");
const addEmployee = require("./addEmployee");
const removeEmployee = require("./removeEmployee");
const requests = require("./getRequests");
const addRequest = require("./addRequests");
const removeRequest = require("./removeRequest");
const auth = require("./authentication");

module.exports = [
  API_test,
  employees,
  addEmployee,
  removeEmployee,
  auth,
  requests,
  addRequest,
  removeRequest,
];
