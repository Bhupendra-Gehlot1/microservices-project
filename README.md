# Microservices Project

This project implements a microservices-based backend system with user management, product management, and order processing capabilities.

## Services

1. User Service (Port 3001)
   - User registration and authentication
   - Profile management
   - Event handling for user actions

2. Product Service (Port 3002)
   - Product management
   - Inventory tracking
   - Event handling for product updates

3. Order Service (Port 3003)
   - Order processing
   - Order management
   - Event handling for orders

4. GraphQL Gateway (Port 4000)
   - Unified API interface
   - Data aggregation
   - Authentication handling

## Prerequisites

- Node.js (v20 or later)
- Docker Desktop
- MongoDB Atlas account
- Redis

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Bhupendra-Gehlot1/microservices-project
   cd microservices-project
   ```

2. Set up environment variables:
   - Configure `.env` in each service directory according to `README.md` file of each service directory
   - Update the variables with your configurations

3. Install dependencies:
   ```bash
   cd ./user-service && npm install
   cd ./product-service && npm install
   cd ./order-service && npm install
   cd ./graphql-gateway && npm install
   ```

4. Run with Docker:
   ```bash
   docker-compose up --build
   ```

   Or run services individually:
   ```bash
   # In separate terminals
   cd user-service && npm run dev
   cd product-service && npm run dev
   cd order-service && npm run dev
   cd graphql-gateway && npm run dev
   ```

## API Documentation

### REST Endpoints

#### User Service (3001)
- POST /api/users/register - Register new user
- POST /api/users/login - User login
- GET /api/users/profile - Get user profile
- PUT /api/users/profile - Update user profile

#### Product Service (3002)
- POST /api/products - Create product
- GET /api/products - List products
- GET /api/products/:id - Get product
- PUT /api/products/:id - Update product
- DELETE /api/products/:id - Delete product

#### Order Service (3003)
- POST /api/orders - Create order
- GET /api/orders - List orders
- GET /api/orders/:id - Get order
- PUT /api/orders/:id - Update order

### GraphQL API (4000)

Example queries:
```graphql
query {
  users {
    id
    username
    email
  }
  products {
    id
    name
    price
    inventory
  }
  orders {
    id
    userId
    totalAmount
    products {
      productId
      quantity
    }
  }
}
```

## Testing

Use the provided Postman collection for API testing:
 Sent you with the mail

## Architecture

- MongoDB Atlas for data persistence
- Redis for pub/sub messaging
- JWT for authentication
- GraphQL for API gateway
- Docker for containerization
