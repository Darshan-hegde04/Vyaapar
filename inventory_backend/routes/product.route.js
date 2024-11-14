const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProducts,
} = require("../controllers/product.controller.js");

const router = express.Router();

// Get all products
router.get("/", getProducts);

// Get a single product by ID
router.get("/:id", getProduct);

// Create a new product
router.post("/", createProduct);

// Update a product (via productId in the request body)
router.put("/", updateProduct);

// Delete a product by ID
router.delete("/:id", deleteProduct);

// Upload products via CSV/Excel file
router.post("/upload", uploadProducts);

module.exports = router;
