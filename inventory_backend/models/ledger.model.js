const mongoose = require('mongoose');

const ledgerSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: false,
  },
  ledgerid: {
    type: Number,
    required: true,
  },
  orderValue: {
    type: Number,
    required: false,
  },
  dueAmount: {
    type: Number,
    required: false,
  },
  dueDate: {
    type: Date,
    required: false,
  },
  Status: {
    type: Boolean,
    required: false,
  },
}, {
  timestamps: true
});

const Ledger = mongoose.model("Ledger", ledgerSchema);
module.exports = Ledger;
