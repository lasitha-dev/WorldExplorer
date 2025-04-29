[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mNaxAqQD)

# WorldExplorer - Countries Information Portal

A comprehensive countries exploration application that provides detailed information about all countries in the world with secure user authentication.

## Project Structure

The project is divided into two main parts:

- `backend/`: Express.js server and API for authentication
- `frontend/`: React client with Material UI components

## Features

### User Management
- Register and create a personal account
- Log in securely to access personalized features
- View your profile information on a dashboard
- Securely store user data with encryption

### Countries Exploration
- Browse through a comprehensive catalog of countries worldwide
- Search for specific countries by name
- Filter countries by geographic region 
- View detailed country profiles including:
  - Population statistics
  - Official languages
  - High-quality flag images
  - Capital cities
  - Currencies
  - Border countries
  - Geographic information

### User Experience
- Navigate through an intuitive, responsive interface
- Get real-time feedback with loading indicators
- Experience smooth transitions and animations
- Access the application seamlessly on both desktop and mobile devices

## Backend

The backend is a RESTful API built with Express.js and MongoDB.

### Setup and Installation

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file with the following variables
# PORT=5000
# MONGO_URI=mongodb+srv://yourmongodburi
# JWT_SECRET=your_jwt_secret
# JWT_EXPIRE=30d

# Run in development mode
npm run dev

# Run in production mode
npm start
```

For more details, see the [backend README](./backend/README.md).

## Frontend

The frontend is built with React and Material UI, featuring authentication and Countries Explorer.

### Setup and Installation

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Create a .env file with the following variables
# REACT_APP_API_URL=http://localhost:5000/api

# Run in development mode
npm start

# Build for production
npm run build
```

## API Integration

The application uses the [REST Countries API](https://restcountries.com/) for fetching country data with the following endpoints:

- `GET /all` - fetches all countries data
- `GET /name/{name}` - searches countries by name
- `GET /region/{region}` - fetches countries by region
- `GET /alpha/{code}` - fetches detailed country information by country code

## Development Status

- [x] Set up Backend
  - [x] Express server setup
  - [x] MongoDB connection
  - [x] User model
  - [x] Authentication routes and controllers
  - [x] Protected routes middleware
- [x] Set up Frontend
  - [x] React setup
  - [x] Authentication components (login/register)
  - [x] Protected routes
  - [x] User dashboard
  - [x] Countries browser component
  - [x] Country details view
  - [x] Region explorer
  - [x] Country search functionality
- [ ] Deploy Application
