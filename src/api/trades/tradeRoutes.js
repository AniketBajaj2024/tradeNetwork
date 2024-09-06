// src/api/trades/tradeRoutes.js
const express = require('express');
const Trade = require('../../database/models/tradeModel');
const eventEmitter = require('../../events/eventEmitter');

module.exports = function(wss){
  const router = express.Router();

// Create a new trade
router.post('/', async (req, res) => {
  try {
    const newTrade = new Trade(req.body);
    const savedTrade = await newTrade.save();
    eventEmitter.emit('tradeCreated', savedTrade);// Emit event
    console.log("coming")
    res.status(201).json(savedTrade);
  } catch (error) {
    res.status(500).json({ message: 'Error creating trade', error });
  }
});

// Get trade details by transaction ID
router.get('/:transactionId', async (req, res) => {
  try {
    const trade = await Trade.findOne({ transactionId: req.params.transactionId });
    if (!trade) {
      return res.status(404).json({ message: 'Trade not found' });
    }
    res.status(200).json(trade);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving trade', error });
  }
});

return router;
}

// module.exports = router;
