// src/api/inventory/inventoryRoutes.js
const express = require('express');
const Inventory = require('../../database/models/inventoryModel');
// const router = express.Router();


// // Get all inventory items
// router.get('/', async (req, res) => {
//   try {
//     const inventoryItems = await Inventory.find();
//     res.status(200).json(inventoryItems);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching inventory items', error });
//   }
// });

// // Add a new inventory item
// router.post('/', async (req, res) => {
//   try {
//     const newItem = new Inventory(req.body);
//     const savedItem = await newItem.save();

//     // Emit an event to all connected clients
//     wss.clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(JSON.stringify({ event: 'inventoryUpdated', data: savedItem }));
//       }
//     });

//     res.status(201).json(savedItem);
//   } catch (error) {
//     console.error('Error adding inventory item:', error.message);
//     res.status(500).json({ message: 'Error adding inventory item', error });
//   }
// });

// // Update an inventory item
// router.put('/:id', async (req, res) => {
//   try {
//     const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });

//     // Emit an event to all connected clients
//     wss.clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(JSON.stringify({ event: 'inventoryUpdated', data: updatedItem }));
//       }
//     });

//     res.status(200).json(updatedItem);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating inventory item', error });
//   }
// });

// // Delete an inventory item
// router.delete('/:id', async (req, res) => {
//   try {
//     await Inventory.findByIdAndDelete(req.params.id);

//     // Emit an event to all connected clients
//     wss.clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(JSON.stringify({ event: 'inventoryDeleted', id: req.params.id }));
//       }
//     });

//     res.status(200).json({ message: 'Inventory item deleted' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting inventory item', error });
//   }
// });

// module.exports = router;

module.exports = function (wss) { // Accept the wss instance as a parameter
  const router = express.Router();

  // Get all inventory items
  router.get('/', async (req, res) => {
    try {
      const inventoryItems = await Inventory.find();
      res.status(200).json(inventoryItems);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching inventory items', error });
    }
  });

  // Add a new inventory item
  router.post('/', async (req, res) => {
    try {
      const newItem = new Inventory(req.body);
      const savedItem = await newItem.save();

      // Emit an event to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ event: 'inventoryUpdated', data: savedItem }));
        }
      });

      res.status(201).json(savedItem);
    } catch (error) {
      console.error('Error adding inventory item:', error.message);
      res.status(500).json({ message: 'Error adding inventory item', error: error.message });
    }
  });

  // Update an inventory item
  router.put('/:id', async (req, res) => {
    try {
      const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });

      // Emit an event to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ event: 'inventoryUpdated', data: updatedItem }));
        }
      });

      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: 'Error updating inventory item', error });
    }
  });

  // Delete an inventory item
  router.delete('/:id', async (req, res) => {
    try {
      await Inventory.findByIdAndDelete(req.params.id);

      // Emit an event to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ event: 'inventoryDeleted', id: req.params.id }));
        }
      });

      res.status(200).json({ message: 'Inventory item deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting inventory item', error });
    }
  });

  return router;
};
