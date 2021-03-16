const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
  numeroConsultation: {
    type: String,
    required: true
  },
  numeroCommande: {
    type: String,
    required: true
  },
  bonCommande: { type: String },
  pvReception: { type: String }
});

const commande = mongoose.model('commande', commandeSchema);

module.exports = commande;
