const API_test = require("./API_test");
const addPayment = require("./addPayment");
const payments = require("./getPayment");
const addSalary = require("./addSalary");


module.exports = [
    API_test,
    addPayment,
    payments,
    addSalary  
];