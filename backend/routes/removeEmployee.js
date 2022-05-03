const router = require("express").Router();
const Employee = require("../models/employeeSchema");

router.post("/delete", async (req, res) => {
  try {
    const { email } = req.body;

    const filter = { email: email };

    let doc = await Employee.findOneAndDelete(filter);

    res.send(doc);
  } catch (error) {
    res.status(500).send(JSON.stringify({ message: error.message }));
  }
});

module.exports = router;
