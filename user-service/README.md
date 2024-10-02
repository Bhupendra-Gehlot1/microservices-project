# User Service

## Description
The User Service is responsible for user authentication, registration, and profile management within the microservices architecture.

## Features
- User registration
- User authentication (JWT-based)
- Profile management
- Event publishing for user-related activities

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
cd user-service
```

2. Install dependencies
```bash
npm install
```

3. Create .env file
```env
PORT=3001
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.setri.mongodb.net/user-service
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

### Authentication
- POST `/api/users/register` - Register a new user
  ```json
  {
    "username": "one",
    "email": "one@gmail.com",
    "password": "password"
  }
  ```

- POST `/api/users/login` - Login user
  ```json
  {
    "email": "one@gmail.com",
    "password": "password"
  }
  ```

### Profile Management
- GET `/api/users/profile` - Get user profile (Requires authentication)
- PUT `/api/users/profile` - Update user profile (Requires authentication)
  ```json
  {
    "username": "updated",
    "email": "updated@gmail.com"
  }
  ```

## Event Publishing
The service publishes the following events:
- `USER_REGISTERED` - When a new user registers
- `USER_PROFILE_UPDATED` - When a user updates their profile

## Testing
Use Postman or any API testing tool with the provided endpoints.

## Docker Support
Build and run the service using Docker:
```bash
docker build -t user-service .
docker run -p 3001:3001 user-service
```
