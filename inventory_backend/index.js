// Imports
const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

// Import routes
const productRoute = require("./routes/product.route.js");
const ledgerRoute = require("./routes/ledger.route.js");
const checkoutRoute = require("./routes/checkout.route.js");
const orderRoute = require("./routes/order.route.js");

const app = express();
const PORT = 3000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

// Routes
app.use("/vyaaparpro/products", productRoute);
app.use("/vyaaparpro/ledger", ledgerRoute);
app.use("/vyaaparpro/checkout", checkoutRoute);
app.use("/vyaaparpro/orders", orderRoute);

// Root route
app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

// Database Connection
mongoose
  .connect("mongodb+srv://admin:tushar1234@backenddb.istp5.mongodb.net/BackendDB?retryWrites=true&w=majority&appName=backendDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Connection failed!", error);
  });

module.exports = app;
