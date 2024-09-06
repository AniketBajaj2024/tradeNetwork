// const express = require('express');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const dotenv = require('dotenv');
// const connectDB = require('./src/database/database');

// const tradeRoutes = require('./src/api/trades/tradeRoutes');
// const cargoRoutes = require('./src/api/cargo/cargoRoutes');
// const inventoryRoutes = require('./src/api/inventory/inventoryRoutes');
// const analyticsRoutes = require('./src/api/analytics/analyticsRoutes');

// dotenv.config();
// connectDB(); // Connect to MongoDB

// const app = express();

// app.use(bodyParser.json());
// app.use(morgan('dev'));

// // Route middlewares
// app.use('/api/trades', tradeRoutes);
// app.use('/api/cargo', cargoRoutes);
// app.use('/api/inventory', inventoryRoutes);
// app.use('/api/updates', analyticsRoutes);

// // Basic Route
// app.get('/', (req, res) => {
//   res.send('Welcome to the Intergalactic Trade Network API');
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// const express = require('express');
// const http = require('http');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const dotenv = require('dotenv');
// const WebSocket = require('ws');
// const cors = require('cors'); // Import the CORS package
// const connectDB = require('./src/database/database');

// const analyticsRoutes = require('./src/api/analytics/analyticsRoutes');
// const eventEmitter = require('./src/events/eventHandlers');

// dotenv.config();
// connectDB();

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// // Enable CORS with specific origin
// app.use(cors({
//   origin: '*', // Allow requests from this origin (your React frontend)
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
//   allowedHeaders: ['Content-Type'], // Allowed headers
//   credentials: true,
// }));

// // Middleware
// app.use(bodyParser.json());
// app.use(morgan('dev'));

// // WebSocket server to handle real-time updates
// wss.on('connection', (ws , req) => {
//     console.log('New WebSocket connection established.' , req.socket.remoteAddress);
  
//     ws.on('message', (message) => {
//       console.log('Received message:', message);
//     });
    
//     ws.on('close', () => {
//       console.log('WebSocket connection closed.');
//     });
//     ws.on('error', (error) => {
//       console.error('WebSocket Error:', error);
//     });
//   });

  
// const tradeRoutes = require('./src/api/trades/tradeRoutes')(wss);
// const cargoRoutes = require('./src/api/cargo/cargoRoutes')(wss);
// const inventoryRoutes = require('./src/api/inventory/inventoryRoutes')(wss);
// // Route middlewares
// app.use('/api/trades', tradeRoutes);  
// app.use('/api/cargo', cargoRoutes);
// app.use('/api/inventory', inventoryRoutes);
// app.use('/api/updates', analyticsRoutes);

// // Basic Route
// app.get('/', (req, res) => {
//   res.send('Welcome to the Intergalactic Trade Network API');
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// src/index.js
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const WebSocket = require('ws');

dotenv.config(); // Load environment variables

const app = express();
const server = http.createServer(app); // Create HTTP server

// Setup WebSocket Server
const wss = new WebSocket.Server({ server });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

connectDB();

// WebSocket server to handle real-time updates
wss.on('connection', (ws, req) => {
  console.log(`New WebSocket connection established from ${req.socket.remoteAddress}`);

  ws.on('message', (message) => {
    console.log('Received message:', message);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed.');
  });

  ws.on('error', (error) => {
    console.error('WebSocket Error:', error);
  });
});

// Import route handlers and pass the `wss` instance
const tradeRoutes = require('./src/api/trades/tradeRoutes')(wss);  // Pass the wss instance to routes
const cargoRoutes = require('./src/api/cargo/cargoRoutes')(wss);  // Pass the wss instance to routes
const inventoryRoutes = require('./src/api/inventory/inventoryRoutes')(wss);  // Pass the wss instance to routes

// Register routes
app.use('/api/trades', tradeRoutes);
app.use('/api/cargo', cargoRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/updates', require('./src/api/analytics/analyticsRoutes'));

// Basic Route
app.get('/', (req, res) => {
  res.send('Welcome to the Intergalactic Trade Network API');
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

