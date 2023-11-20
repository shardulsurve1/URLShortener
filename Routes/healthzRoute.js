const express = require("express");
const healthzController = require("../Controllers/healthzController");

//use Express for routing.
const router = express.Router();
//Global middleware added
router.use("/", (req, res, next) => {
  if (req.method === "GET") {
    if (
      Object.keys(req.body).length !== 0 ||
      Object.keys(req.query).length !== 0
    ) {
      return res.status(400).end();
    }

    next();
  } else {
    res.status(405).end();
  }
});

router.route("/").get(healthzController.healthzCheck);

module.exports = router;
