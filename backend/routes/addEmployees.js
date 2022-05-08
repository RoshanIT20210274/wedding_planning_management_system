const router = require("express").Router();
const Employee = require("../models/employeeSchema");
// const app = express();

router.post("/add", async (req, res) => {
  const employee = new Employee(req.body);
  try {
    await employee.save();
    res.send(employee);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/update", async (req, res) => {
  try {
    const employee = req.body;

    const filter = { email: employee.email };
    const update = employee;

    let doc = await Employee.findOneAndUpdate(filter, update, {
      new: true,
    });

    res.send(doc);
  } catch (error) {
    res.status(500).send(JSON.stringify({ message: error.message }));
  }
});

module.exports = router;
