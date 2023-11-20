const express = require("express");
const router = express.Router();
const accountController = require("../Controllers/accountController");

// Define routes for user-related operations
router.post("/", accountController.createAccount);

// Add more routes as needed

module.exports = router;
