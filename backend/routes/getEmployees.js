const router = require("express").Router();
const Employee = require("../models/employeeSchema");

router.get("/allemployees", (req, res) => {
  Employee.find({}, (err, employees) => {
    var employeeMap = [];

    employees.forEach((employee) => {
      employeeMap.push(employee);
    });

    res.send(employeeMap);
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

    Employee.find({}, (err, employees) => {
      var employeeMap = [];

      employees.forEach((employee) => {
        if (employee.fullName.toLowerCase().includes(fullName.toLowerCase()))
          employeeMap.push(employee);
      });

      res.send(employeeMap);
    });
  } catch (error) {
    res.status(500).send(JSON.stringify({ message: error.message }));
  }
});

router.get("/find/email", (req, res) => {
  try {
    let email = "";

    if (req.query.email) {
      email = req.query.email;
    } else {
      throw new Error("Missing parameter 'email'");
    }

    Employee.find({}, (err, employees) => {
      var employeeMap = [];

      employees.forEach((employee) => {
        if (employee.email.toLowerCase() === email.toLowerCase())
          employeeMap.push(employee);
      });

      res.send(employeeMap);
    });
  } catch (error) {
    res.status(500).send(JSON.stringify({ message: error.message }));
  }
});

module.exports = router;
