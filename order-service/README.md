# Order Service

## Description
The Order Service manages order processing and tracking within the microservices architecture.

## Features
- Order creation and management
- Order status tracking
- Event publishing for order-related activities
- Integration with Product and User services

## Tech Stack
- Node.js
- Express.js
- MongoDB (via Mongoose)
- Redis (for event publishing)
- JWT for authentication

## Prerequisites
- Node.js (v20 or later)
- MongoDB Atlas account
- Redis

## Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/Bhupendra-Gehlot1/microservices-project
cd microservices-project
cd order-service
```

2. Install dependencies
```bash
npm install
```

3. Create .env file
```env
PORT=3003
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.setri.mongodb.net/order-service
JWT_SECRET=your-jwt-secret
REDIS_URL=redis://localhost:6379
```

4. Start the service
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Order Management
- POST `/api/orders` - Create a new order (Requires authentication)
  ```json
  {
  "userId": "123",
  "items": [
    {
      "product": "1234",
      "quantity": 2,
      "price": 40
    }
  ],
  "totalAmount": 80,
  }
  ```

- GET `/api/orders` - Get all orders for authenticated user
- GET `/api/orders/:id` - Get a specific order
- PUT `/api/orders/:id` - Update order status (Requires authentication)

## Event Publishing
The service publishes the following events:
- `ORDER_PLACED` - When a new order is created
- `ORDER_STATUS_UPDATED` - When an order's status is updated

## Event Subscription
The service subscribes to:
- `PRODUCT_CREATED` - Updates local product catalog
- `USER_REGISTERED` - Updates local user reference

## Testing
Use Postman or any API testing tool with the provided endpoints.

## Docker Support
Build and run the service using Docker:
```bash
docker build -t order-service .
docker run -p 3003:3003 order-service
```
