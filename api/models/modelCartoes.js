const mongoose = require("mongoose");

const cartaoSchema = new mongoose.Schema({
  nome: { type: String, trim: true, uppercase: true, required: true },
  numCartao: { type: Number, required: true },
});

module.exports = mongoose.model("Cartao", cartaoSchema);