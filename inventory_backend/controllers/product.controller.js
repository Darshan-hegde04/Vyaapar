const Product = require("../models/product.model");
const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");
const xlsx = require("xlsx");

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product by productId
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ productId: id });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product quantity by productId
const updateProduct = async (req, res) => {
  try {
    const { id, Quantity } = req.body;
    const product = await Product.findOneAndUpdate({ productId: id }, { Quantity }, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product by productId
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOneAndDelete({ productId: id });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload products from CSV or Excel
const uploadProducts = async (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const file = req.files.file;
  const ext = path.extname(file.name).toLowerCase();
  const tempFilePath = path.join(__dirname, "../uploads", file.name);

  try {
    // Save the uploaded file temporarily
    await file.mv(tempFilePath);

    if (ext === ".csv") {
      // Parse CSV
      const products = [];
      fs.createReadStream(tempFilePath)
        .pipe(csvParser())
        .on("data", (data) => products.push(data))
        .on("end", async () => {
          try {
            await Product.insertMany(products);
            res.status(200).json({ message: "Products added successfully" });
          } catch (err) {
            res.status(500).json({ message: "Failed to add products to database." });
          } finally {
            fs.unlinkSync(tempFilePath); // Delete temp file
          }
        });
    } else if (ext === ".xlsx") {
      // Parse Excel
      const workbook = xlsx.readFile(tempFilePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = xlsx.utils.sheet_to_json(sheet);

      try {
        await Product.insertMany(jsonData);
        res.status(200).json({ message: "Products added successfully" });
      } catch (err) {
        res.status(500).json({ message: "Failed to add products to database." });
      } finally {
        fs.unlinkSync(tempFilePath); // Delete temp file
      }
    } else {
      res.status(400).json({ message: "Unsupported file format. Use CSV or Excel." });
      fs.unlinkSync(tempFilePath); // Delete temp file if format is invalid
    }
  } catch (error) {
    res.status(500).json({ message: "File upload failed." });
    if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath); // Ensure temp file is removed on error
  }
};

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct, uploadProducts };
