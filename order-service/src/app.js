import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import orderRoutes from './routes/order.routes.js';
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
app.use('/api/orders', orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Subscribe to events
subscribeToEvent('PRODUCT_CREATED', async (message) => {
  // Handle product creation event
  console.log('Product created:', message);
});

subscribeToEvent('USER_REGISTERED', async (message) => {
  // Handle user registration event
  console.log('User registered:', message);
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
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