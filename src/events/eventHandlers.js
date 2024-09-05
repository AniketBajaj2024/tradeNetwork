const eventEmitter = require('./eventEmitter');

// Handler for trade creation
eventEmitter.on('tradeCreated', (trade) => {
  console.log(`New trade created: ${trade.transactionId}`);
  // Further processing or notification logic goes here
});

// Handler for cargo creation
eventEmitter.on('cargoCreated', (cargo) => {
  console.log(`New cargo shipment created: ${cargo.shipmentId}`);
  // Further processing or notification logic goes here
});

module.exports = eventEmitter;
