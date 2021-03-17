const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema({
  numeroConsultation: {
    type: String,
    unique: true,
    required: true,
  },
  lettreConsultation: { type: String },
  reglementConsultation: { type: String },
  offresConcurrents: { type: String },
  pvOuverture: { type: String },
  dateOfCreation: {
    type: Date,
    default: Date.now,
  },
});

const consultations = mongoose.model("consultations", consultationSchema);

module.exports = consultations;
