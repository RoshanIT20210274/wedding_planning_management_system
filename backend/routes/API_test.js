const express = require("express");
const app = express();

app.get("/", async (request, response) => {
  try {
    response.send({
      message: "Wedding Planner API is online",
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
