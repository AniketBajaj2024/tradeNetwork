// src/api/inventory/inventoryRoutes.js
const express = require('express');
const Inventory = require('../../database/models/inventoryModel');

const router = express.Router();

// Get inventory details by station ID
router.get('/:stationId', async (req, res) => {
  try {
    const inventory = await Inventory.findOne({ stationId: req.params.stationId });
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving inventory', error });
  }
});

module.exports = router;
