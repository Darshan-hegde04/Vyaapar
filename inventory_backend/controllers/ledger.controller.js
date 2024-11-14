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
    const { LedgerId } = req.params;  // Assuming LedgerId is passed as a parameter in the URL
    const { Status } = req.body;       // The Status is provided in the request body

    // Find by LedgerId and update Status field only
    const ledger = await Ledger.findOneAndUpdate(
      { LedgerId },                     // Find by LedgerId
      { Status },                       // Update Status
      { new: true }                     // Return the updated document
    );

    if (!ledger) {
      return res.status(404).json({ message: "Ledger not found" });
    }

    res.status(200).json(ledger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a ledger entry by ID
const deleteLedger = async (req, res) => {
  try {
    const { id } = req.params;
    const ledger = await Ledger.findOneAndDelete({ledgerid:id});
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
