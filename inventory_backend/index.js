const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// routes
app.use("/vyaaparpro/products", productRoute);
app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});


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
  .catch(() => {
    console.log("Connection failed!");
  });


