const Ledger = require("../models/ledger.model");

// Get all ledgers
const getLedgers = async (req, res) => {
  try {
    const ledgers = await Ledger.find({});
    res.status(200).json(ledgers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific ledger by ID
const getLedger = async (req, res) => {
  try {
    const { id } = req.params;
    const ledger = await Ledger.findOne({ id });
    if (!ledger) {
      return res.status(404).json({ message: "Ledger not found" });
    }
    res.status(200).json(ledger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new ledger entry
const createLedger = async (req, res) => {
  try {
    const ledger = await Ledger.create(req.body);
    res.status(200).json(ledger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a ledger entry by ID
const updateLedger = async (req, res) => {
  try {
    const { id } = req.params;
    const ledger = await Ledger.findOneAndUpdate({ id }, req.body, { new: true });
    if (!ledger) {
      return res.status(404).json({ message: "Ledger not found" });
    }
    res.status(200).json(ledger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteLedger = async (req, res) => {
  try {
    const { id } = req.params;
    const ledger = await Ledger.findOneAndDelete({ id });
    if (!ledger) {
      return res.status(404).json({ message: "Ledger not found" });
    }
    res.status(200).json({ message: "Ledger deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLedgers,
  getLedger,
  createLedger,
  updateLedger,
  deleteLedger,
};
