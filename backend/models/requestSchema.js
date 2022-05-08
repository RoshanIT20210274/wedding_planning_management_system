const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  fullName: {
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

  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  age: {
    type: String,
    required: false,
  },
});

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;
