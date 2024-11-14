const express = require("express");
const router = express.Router();
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");

// Route to get all orders
router.get("/", getOrders);

// Route to get a specific order by ID
router.get("/:id", getOrder);

// Route to create a new order entry
router.post("/", createOrder);

// Route to update an order entry by ID
router.put("/:id", updateOrder);

// Route to delete an order entry by ID
router.delete("/:id", deleteOrder);

module.exports = router;
