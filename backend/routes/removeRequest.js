const router = require("express").Router();
const Request = require("../models/requestSchema");

router.post("/delete", async (req, res) => {
  try {
    const { fullName } = req.body;

    const filter = { fullName: fullName };

    let doc = await Request.findOneAndDelete(filter);

    res.send(doc);
  } catch (error) {
    res.status(500).send(JSON.stringify({ message: error.message }));
  }
});

module.exports = router;
