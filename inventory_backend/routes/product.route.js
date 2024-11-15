const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProducts,
  getProductsBelowThreshold
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

// Get products with quantity below a given threshold
router.get("/threshold/:threshold", getProductsBelowThreshold);

module.exports = router;
