const express = require("express");
const redirectController = require("../Controllers/redirectController");

const router = express.Router();

function handleMethodNotAllowed(req, res) {
  res.status(405).end(); // Send a 405 Method Not Allowed status
}

router
  .route("/:shortID")
  .get(redirectController.redirectToLongURL)
  .all(handleMethodNotAllowed);

module.exports = router;
