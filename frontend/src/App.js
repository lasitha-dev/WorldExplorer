import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Countries from './pages/Countries';
import CountryDetail from './pages/CountryDetail';
import CountrySearch from './pages/CountrySearch';
import RegionExplorer from './pages/RegionExplorer';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            {/* Main Route */}
            <Route path="/" element={<Home />} />
            
            {/* Country Routes - Primary Feature */}
            <Route path="/countries" element={<Countries />} />
            <Route path="/countries/:countryCode" element={<CountryDetail />} />
            <Route path="/countries/search" element={<CountrySearch />} />
            <Route path="/countries/regions" element={<RegionExplorer />} />
            
            {/* Account Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
