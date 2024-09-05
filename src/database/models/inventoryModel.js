const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  stationId: { type: String, required: true, unique: true },
  inventoryItems: { type: Array, default: [] },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Inventory', inventorySchema);
