// src/api/cargo/cargoRoutes.js
const express = require('express');
const Cargo = require('../../database/models/cargoModel');
const eventEmitter = require('../../events/eventEmitter');


const router = express.Router();

// Create a new cargo shipment
router.post('/', async (req, res) => {
  try {
    const newCargo = new Cargo(req.body);
    const savedCargo = await newCargo.save();
    eventEmitter.emit('cargoCreated', savedCargo); // Emit event
    res.status(201).json(savedCargo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating cargo', error });
  }
});

// Get cargo details by shipment ID
router.get('/:shipmentId', async (req, res) => {
  try {
    const cargo = await Cargo.findOne({ shipmentId: req.params.shipmentId });
    if (!cargo) {
      return res.status(404).json({ message: 'Cargo not found' });
    }
    res.status(200).json(cargo);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cargo', error });
  }
});

module.exports = router;
