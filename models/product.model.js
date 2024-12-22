// product.model.js

const mongoose = require('mongoose');

// Lottery Schema
const lotterySchema = new mongoose.Schema({
  id: { type: String, required: true },
  image: { type: String, required: true },
  value: { type: Number, required: true },
  url :{type: String, required: true}
});

// Purchase Schema to track buyer purchases
const purchaseSchema = new mongoose.Schema({
  buyerId: { type: String, required: true },
  lotteryId: { type: String, required: true },
  lotteryValue: { type: Number, required: true },
  purchasedAt: { type: Date, default: Date.now },
});

// Seller Schema
const sellerSchema = new mongoose.Schema({
  sellerId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  details: { type: String, required: true },
  lotteries: [lotterySchema],  // Array of lotteries the seller offers
  purchases: [purchaseSchema],  // Track the buyer purchases
});

// Seller Model
const Seller = mongoose.model('Seller', sellerSchema);

module.exports = { Seller };
