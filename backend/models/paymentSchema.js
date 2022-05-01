const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({

  customerName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: String,
    required: true,
  },
  firstInstallment: {
    type: String,
    required: true,
  },
  firstInstallmentDate: {
    type: String,
    required: true,
  },
  secondInstallment: {
    type: String,
    required: true,
  },
  secondInstallmentDate: {
    type: String,
    required: true,
  },
  amountReceived: {
    type: String,
    required: true,
  },
  amountDue: {
    type: String,
    required: true,
  },
  
  
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;