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
