import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from './routes/product.routes.js';
import { subscribeToEvent, closeConnections } from './utils/redis.js';

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/products', productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Subscribe to events
subscribeToEvent('ORDER_PLACED', async (message) => {
  // Update inventory when an order is placed
  // Implement inventory update logic here
  console.log('Order placed:', message);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});

process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await closeConnections();
  await mongoose.connection.close();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});