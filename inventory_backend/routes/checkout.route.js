const express = require("express");
const router = express.Router();
const {
  getCheckouts,
  getCheckout,
  createCheckout,
  updateCheckout,
  deleteCheckout,
} = require("../controllers/checkout.controller");

// Route to get all checkout records
router.get("/", getCheckouts);

// Route to get a specific checkout record by ID
router.get("/:id", getCheckout);

// Route to create a new checkout entry
router.post("/", createCheckout);

// Route to update a checkout entry by ID
router.put("/:id", updateCheckout);

// Route to delete a checkout entry by ID
router.delete("/:id", deleteCheckout);

module.exports = router;
