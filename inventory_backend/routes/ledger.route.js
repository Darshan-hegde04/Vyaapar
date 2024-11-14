const express = require("express");
const router = express.Router();
const {
  getLedgers,
  getLedger,
  createLedger,
  updateLedger,
  deleteLedger,
} = require("../controllers/ledger.controller");


router.get("/", getLedgers);

router.get("/:id", getLedger);


router.post("/", createLedger);


router.put("/:id", updateLedger);


router.delete("/:id", deleteLedger);

module.exports = router;
