const express = require("express");
const { generateSellerId } = require("../controllers/seller.controller"); // Import the controller
const router = express.Router();

// Define the GET route to generate a unique seller ID
router.get("/generate-id", generateSellerId);

module.exports = router;
