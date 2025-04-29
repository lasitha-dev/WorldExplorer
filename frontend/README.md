# WorldExplorer - Frontend

This is the user interface for the WorldExplorer countries information portal, allowing users to discover detailed information about countries across the globe.

## What You Can Do

### User Management
- Create your personal account with email and password
- Access your personalized dashboard after logging in
- View your profile information securely
- Log out safely when finished

### Countries Discovery
- Explore the world through an interactive countries catalog
- Find countries instantly with the powerful search feature
- Filter countries by continents and regions
- Access comprehensive country profiles showing:
  - Official name and common name
  - Population statistics
  - Official languages spoken
  - High-resolution flag images
  - Capital cities and geographic data
  - Currency information
  - Border countries with quick links
  - Additional facts and regional information

### Experience
- Enjoy a visually appealing, modern interface
- Navigate effortlessly between different sections
- Receive immediate visual feedback during operations
- Use the application on any device with responsive design
- Experience smooth animations and transitions while browsing

## API Integration

WorldExplorer connects with two APIs:

1. **Authentication API** - For user management
   - Account creation
   - Secure login
   - Profile information retrieval

2. **REST Countries API** (https://restcountries.com/) - For country information
   - `GET /all` - Access the global countries database
   - `GET /name/{name}` - Find countries by name search
   - `GET /region/{region}` - Discover countries within specific regions
   - `GET /alpha/{code}` - View detailed single country profiles

## Setup and Installation

### Prerequisites
- Node.js installed
- Backend server running (see root README)

### Installation

```bash
# Install dependencies
npm install

# Create .env file
# Add the following to .env:
# REACT_APP_API_URL=http://localhost:5000/api

# Start development server
npm start
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js        # Navigation header
│   └── ProtectedRoute.js # Authentication guard
├── context/
│   └── AuthContext.js   # Authentication state management
├── pages/
│   ├── Dashboard.js     # User dashboard
│   ├── Home.js          # Landing page
│   ├── Login.js         # Login form
│   ├── Register.js      # Registration form
│   ├── Countries.js     # Countries list/browser
│   ├── CountryDetail.js # Detailed country view
│   ├── CountrySearch.js # Country search page
│   └── RegionExplorer.js # Region-based exploration
├── App.js               # Main app with routes
└── theme.js             # Material UI theme customization
```

## Routes

- `/` - Home page
- `/login` - User login
- `/register` - User registration
- `/dashboard` - User dashboard (protected)
- `/countries` - Browse all countries
- `/countries/search` - Search countries by name
- `/countries/regions` - Explore countries by region
- `/countries/:countryCode` - View country details

## UI Features

WorldExplorer's interface includes:

- Modern navigation with responsive header
- Information-rich country cards with hover effects
- Interactive search and filtering tools
- Detailed country profile pages with organized sections
- Loading indicators for better user experience
- Consistent color scheme and typography
- Mobile-optimized viewing experience

## Deployment

To build the application for production:

```bash
npm run build
```

This creates a `build` directory with optimized production files.

## Learn More

For more information about the APIs used:
- [REST Countries API](https://restcountries.com/)
- [Material UI Documentation](https://mui.com/)
