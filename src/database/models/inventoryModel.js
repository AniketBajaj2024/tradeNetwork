// src/database/models/inventoryModel.js
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  stationId: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Inventory', inventorySchema);
