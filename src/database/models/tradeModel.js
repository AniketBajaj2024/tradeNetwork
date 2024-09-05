const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true },
  buyer: { type: String, required: true },
  seller: { type: String, required: true },
  goods: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Trade', tradeSchema);
