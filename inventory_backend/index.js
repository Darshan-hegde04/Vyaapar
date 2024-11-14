// Imports
const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

// Import routes
const productRoute = require("./routes/product.route.js");
const ledgerRoute = require("./routes/ledger.route.js");

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

// Routes
app.use("/vyaaparpro/products", productRoute);
app.use("/vyaaparpro/ledger", ledgerRoute);

// Root route
app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

// Database Connection
mongoose
  .connect(
    "mongodb+srv://admin:tushar1234@backenddb.istp5.mongodb.net/BackendDB?retryWrites=true&w=majority&appName=backendDB"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.log("Connection failed!", error);
  });

module.exports = app;

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const ledgerRoutes = require("./routes/ledger.route");
const orderRoutes = require("./routes/order.route");
const checkoutRoutes = require("./routes/checkout.route");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/ledgers", ledgerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/checkouts", checkoutRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });

// Error handling for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;

