# Product Service

## Description
The Product Service handles product management and inventory tracking within the microservices architecture.

## Features
- Product CRUD operations
- Inventory management
- Event publishing for product-related activities

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
cd product-service
```

2. Install dependencies
```bash
npm install
```

3. Create .env file
```env
PORT=3002
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.setri.mongodb.net/product-service
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

### Product Management
- POST `/api/products` - Create a new product (Requires authentication)
  ```json
  {
    "name": "Notebook",
    "description": "This is a expensive notebook",
    "price": 40,
    "inventory": 200
  }
  ```

- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get a specific product
- PUT `/api/products/:id` - Update a product (Requires authentication)
- DELETE `/api/products/:id` - Delete a product (Requires authentication)

## Event Publishing
The service publishes the following events:
- `PRODUCT_CREATED` - When a new product is created
- `INVENTORY_UPDATED` - When product inventory is updated

## Testing
Use Postman or any API testing tool with the provided endpoints.

## Docker Support
Build and run the service using Docker:
```bash
docker build -t product-service .
docker run -p 3002:3002 product-service
```
