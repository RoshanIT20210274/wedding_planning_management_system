const router = require("express").Router();
const Request = require("../models/requestSchema");
// const app = express();

router.post("/add", async (req, res) => {
  const request = new Request(req.body);
  try {
    await request.save();
    res.send(request);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
