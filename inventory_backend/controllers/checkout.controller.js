const Checkout = require("../models/checkout.model");

// Get all checkout records
const getCheckouts = async (req, res) => {
  try {
    const checkouts = await Checkout.find({});
    res.status(200).json(checkouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific checkout record by ID
const getCheckout = async (req, res) => {
  try {
    const { id } = req.params;
    const checkout = await Checkout.findOne({ _id: id });
    if (!checkout) {
      return res.status(404).json({ message: "Checkout record not found" });
    }
    res.status(200).json(checkout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new checkout entry
const createCheckout = async (req, res) => {
  try {
    const checkout = await Checkout.create(req.body);
    res.status(201).json(checkout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a checkout entry by ID
const updateCheckout = async (req, res) => {
  try {
    const { id } = req.params;
    const checkout = await Checkout.findByIdAndUpdate(id, req.body, { new: true });
    if (!checkout) {
      return res.status(404).json({ message: "Checkout record not found" });
    }
    res.status(200).json(checkout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a checkout entry by ID
const deleteCheckout = async (req, res) => {
  try {
    const { id } = req.params;
    const checkout = await Checkout.findByIdAndDelete(id);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout record not found" });
    }
    res.status(200).json({ message: "Checkout deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCheckouts,
  getCheckout,
  createCheckout,
  updateCheckout,
  deleteCheckout,
};
