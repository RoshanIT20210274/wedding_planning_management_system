const router = require("express").Router();
const Employee = require("../models/employeeSchema");

// const app = express();

router.post("/login", (req, res) => {
  try {
    const guestEmployee = req.body;

    Employee.find({}, (err, employees) => {
      var employeeMap = [];

      employees.forEach((employee) => {
        if (
          employee.username === guestEmployee.username &&
          employee.password === guestEmployee.password
        )
          employeeMap.push(employee);
      });
      if (employeeMap.length === 0) {
        res.status(401).send(JSON.stringify({ message: "Unauthorized" }));
      } else res.send(employeeMap);
    });
  } catch (error) {
    res.status(500).send(JSON.stringify({ message: error.message }));
  }
});

module.exports = router;
