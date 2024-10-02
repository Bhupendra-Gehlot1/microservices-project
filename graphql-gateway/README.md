# GraphQL Gateway

## Description
The GraphQL Gateway provides a unified API interface for the microservices architecture, aggregating data from User, Product, and Order services.

## Features
- Unified GraphQL API
- Authentication validation
- Data aggregation from multiple services
- Real-time updates via subscriptions

## Tech Stack
- Node.js
- Apollo Server Express
- Express.js
- Redis (for subscriptions)
- JWT for authentication

## Prerequisites
- Node.js (v20 or later)
- Redis
- Running instances of User, Product, and Order services

## Installation & Setup

1. Clone the repository
```bash
git clone <repository-url>
cd graphql-gateway
```

2. Install dependencies
```bash
npm install
```

3. Create .env file
```env
PORT=4000
JWT_SECRET=your-jwt-secret
USER_SERVICE_URL=http://localhost:3001
PRODUCT_SERVICE_URL=http://localhost:3002
ORDER_SERVICE_URL=http://localhost:3003
REDIS_URL=redis://localhost:6379
```

4. Start the service
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## GraphQL Schema

### Queries
```graphql
type Query {
  users: [User]
  user(id: ID!): User
  products: [Product]
  product(id: ID!): Product
  orders: [Order]
  order(id: ID!): Order
}
```

### Mutations
```graphql
type Mutation {
  registerUser(input: RegisterInput!): AuthPayload
  loginUser(input: LoginInput!): AuthPayload
  createProduct(input: ProductInput!): Product
  createOrder(input: OrderInput!): Order
}
```

## Testing
Use GraphQL Playground (available at http://localhost:4000/graphql) or Postman to test the API.

Example query:
```graphql
query {
  products {
    id
    name
    price
    inventory
  }
}
```

Example mutation:
```graphql
mutation {
  createOrder(input: {
    {
  "items": [
    {
      "product": "1234",
      "quantity": 2,
      "price": 40
    }
  ],
  "totalAmount": 80,
}
  }) {
    id
    totalAmount
    status
  }
}
```

## Docker Support
Build and run the service using Docker:
```bash
docker build -t graphql-gateway .
docker run -p 4000:4000 graphql-gateway
```
