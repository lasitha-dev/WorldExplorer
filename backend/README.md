# WorldExplorer Backend API

This is the authentication server for the WorldExplorer application, providing secure user management for the countries exploration portal.

## Features

- Secure user registration and authentication
- JWT-based secure access control
- Password encryption with bcrypt
- Protected routes middleware for authorized access
- MongoDB Atlas database connection
- RESTful API structure for client integration

## Usage

### Environment Variables

Create a `.env` file in the root directory and add the following:

```
PORT=5000
MONGO_URI=mongodb+srv://yourusername:yourpassword@yourcluster.mongodb.net/yourdatabase
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
```

### MongoDB Connection

This project is configured to use MongoDB Atlas. You'll need to create a MongoDB Atlas account and obtain your connection string to use in the `.env` file. The connection string should include your username, password, cluster information, and database name.

### Installation

```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Run in production
npm start
```

## API Endpoints

### Users

- Register a new user: `POST /api/users/register`
- Login user: `POST /api/users/login`
- Get current user profile: `GET /api/users/me` (Protected)

## Frontend Integration

The backend handles user authentication that enables personalized features in the WorldExplorer application. The frontend connects to these endpoints for user management while integrating with the [REST Countries API](https://restcountries.com/) to fetch and display country data.

## Request and Response Examples

### Register User

**Request:**
```
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login User

**Request:**
```
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Get User Profile

**Request:**
```
GET /api/users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60f1a5c7c6e04e001c8b45a0",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2021-07-16T12:00:00.000Z"
  }
}
``` 