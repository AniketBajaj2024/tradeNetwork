const mongoose = require('mongoose');

const cargoSchema = new mongoose.Schema({
  shipmentId: { type: String, required: true, unique: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  cargoDetails: { type: String, required: true },
  status: { type: String, default: 'in transit' },
  expectedDelivery: { type: Date, required: true },
});

module.exports = mongoose.model('Cargo', cargoSchema);
