const mongoose = require("mongoose");

const factureSchema = new mongoose.Schema({
  numeroConsultation: {
    type: String,
    required: true,
  },
  numeroFacture: {
    type: String,
    required: true,
  },
  facture: { type: String },
  dateOfCreation: {
    type: Date,
    default: Date.now,
  },
});

const facture = mongoose.model("facture", factureSchema);

module.exports = facture;
