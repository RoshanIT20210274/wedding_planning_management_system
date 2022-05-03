const router = require("express").Router();
const Request = require("../models/requestSchema");

router.get("/allrequests", (req, res) => {
  Request.find({}, (err, requests) => {
    var requestMap = [];

    requests.forEach((request) => {
      requestMap.push(request);
    });

    res.send(requestMap);
  });
});

router.get("/find", (req, res) => {
  try {
    let fullName = "";

    if (req.query.fullName) {
      fullName = req.query.fullName;
    } else {
      throw new Error("Missing parameter 'fullName'");
    }

    Request.find({}, (err, requests) => {
      var requestMap = [];

      requests.forEach((request) => {
        if (request.fullName.toLowerCase().includes(fullName.toLowerCase()))
          requestMap.push(request);
      });

      res.send(requestMap);
    });
  } catch (error) {
    res.status(500).send(JSON.stringify({ message: error.message }));
  }
});

module.exports = router;
