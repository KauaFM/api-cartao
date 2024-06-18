const mongoose = require("mongoose");
const Cartao = require("../models/modelCartoes");


async function createCartao(req, res) {
  const cartao = await Cartao.create(req.body);
  res.status(201).json(cartao);
}

async function getCartoes(req, res) {
  const cartoes = await Cartao.find({});
  res.json(cartoes);
}

async function getCartaoById(req, res, next) {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const cartao = await Cartao.findOne({ _id: id });
    if (cartao) {
      next();
    } else {
      res.status(404).json({ msg: "cartao nao contrado" });
    }
  } catch (err) {
    res.status(400).json({ msg: "Id invalido" });
  }
}



async function updateCartao(req, res) {
  const id = new mongoose.Types.ObjectId(req.params.id);
  const cartao = await Cartao.findOneAndUpdate({ _id: id }, req.body);
  res.json(cartao);
}

async function deleteCartao(req, res) {
  const id = new mongoose.Types.ObjectId(req.params.id);
  const cartao = await Cartao.findOneAndDelete({ _id: id });
  res.status(204).end();
}

module.exports = {
  createCartao,
  getCartoes,
  getCartaoById,
  updateCartao,
  deleteCartao,
};