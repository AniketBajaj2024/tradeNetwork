// const express = require('express');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const dotenv = require('dotenv');
// const connectDB = require('./src/database/database');

// // Importing routes
// const tradeRoutes = require('./src/api/trades/tradeRoutes');
// const cargoRoutes = require('./src/api/cargo/cargoRoutes');
// const inventoryRoutes = require('./src/api/inventory/inventoryRoutes');
// const analyticsRoutes = require('./src/api/analytics/analyticsRoutes');

// dotenv.config();
// connectDB(); // Connect to MongoDB

// const app = express();

// // Middleware
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



// after WebSocket
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const WebSocket = require('ws');
const cors = require('cors'); // Import the CORS package
const connectDB = require('./src/database/database');
const tradeRoutes = require('./src/api/trades/tradeRoutes');
const cargoRoutes = require('./src/api/cargo/cargoRoutes');
const inventoryRoutes = require('./src/api/inventory/inventoryRoutes');
const analyticsRoutes = require('./src/api/analytics/analyticsRoutes');
const eventEmitter = require('./src/events/eventHandlers');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Enable CORS
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

// Route middlewares
app.use('/api/trades', tradeRoutes);
app.use('/api/cargo', cargoRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/updates', analyticsRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('Welcome to the Intergalactic Trade Network API');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
