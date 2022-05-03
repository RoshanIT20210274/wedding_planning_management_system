const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
//reading url in .env file
require("dotenv").config();

//Define port
const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Connect database

const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
//open created database connection
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongodb Connection success");
});

const employeeRouter = require("./routes/addEmployees");
app.use("/employee", employeeRouter);

const getemployeeRouter = require("./routes/getEmployees");
app.use("/employee", getemployeeRouter);

const removeemployeeRouter = require("./routes/removeEmployee");
app.use("/employee", removeemployeeRouter);

const authenticationRouter = require("./routes/authentication");
app.use("/employee", authenticationRouter);

const requestRouter = require("./routes/addRequests");
app.use("/request", requestRouter);

const getrequestRouter = require("./routes/getRequests");
app.use("/request", getrequestRouter);

const removerequestRouter = require("./routes/removeRequest");
app.use("/request", removerequestRouter);

//running port 8970
app.listen(PORT, () => {
  console.log(`Server is up and running on port no: ${PORT}`);
});
