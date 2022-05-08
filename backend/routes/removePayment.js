
const Payment = require("../models/paymentSchema");
const router = require("express").Router();


router.post("/delete", async (req, res) => {
 try {
   const { customerName } = req.body;


   const filter = { customerName: customerName };


   let doc = await Payment.findOneAndDelete(filter);


   res.send(doc);
 } catch (error) {
   res.status(500).send(JSON.stringify({ message: error.message }));
 }
});


module.exports = router;