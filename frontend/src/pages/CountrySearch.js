import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CircularProgress,
  Alert,
  InputAdornment,
  Divider,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

// REST Countries API base URL
const API_URL = 'https://restcountries.com/v3.1';

const CountrySearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Search for countries by name
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setError('Please enter a country name to search');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      setSearched(true);
      
      const response = await axios.get(`${API_URL}/name/${searchTerm}`);
      
      // Sort countries by name
      const sortedCountries = response.data.sort((a, b) => 
        a.name.common.localeCompare(b.name.common)
      );
      
      setCountries(sortedCountries);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError(`No countries found matching "${searchTerm}"`);
      } else {
        setError('Failed to search countries. Please try again.');
      }
      setCountries([]);
      setLoading(false);
    }
  };

  // Navigate to country detail
  const handleCountryClick = (countryCode) => {
    navigate(`/countries/${countryCode}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Paper 
        elevation={3}
        sx={{ 
          p: 4, 
          mb: 4,
          background: 'linear-gradient(to right, #f7f9fc, #e3f2fd)',
          borderRadius: 3
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <TravelExploreIcon sx={{ fontSize: 36, mr: 2, color: 'primary.main' }} />
          <Typography variant="h4" component="h1">
            Search Countries
          </Typography>
        </Box>
        
        <Typography variant="body1" paragraph>
          Enter a country name to search for detailed information.
        </Typography>
        
        <Box 
          component="form" 
          onSubmit={handleSearch} 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2
          }}
        >
          <TextField
            label="Country Name"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: 1 }}
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            size="large"
            disabled={loading}
            sx={{ minWidth: { xs: '100%', sm: 150 } }}
          >
            {loading ? <CircularProgress size={24} /> : 'Search'}
          </Button>
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Paper>
      
      {/* Search Results */}
      {searched && !loading && !error && (
        <>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Search Results
            </Typography>
            <Divider />
          </Box>
          
          {countries.length > 0 ? (
            <Grid container spacing={3}>
              {countries.map(country => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={country.cca3}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <CardActionArea onClick={() => handleCountryClick(country.cca3)}>
                      <CardMedia
                        component="img"
                        height="160"
                        image={country.flags.svg}
                        alt={`Flag of ${country.name.common}`}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent>
                        <Typography variant="h6" component="div" noWrap gutterBottom>
                          {country.name.common}
                        </Typography>
                        <Divider sx={{ my: 1.5 }} />
                        <Typography variant="body2" color="text.secondary">
                          <strong>Official Name:</strong> {country.name.official}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Population:</strong> {country.population.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Region:</strong> {country.region}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Alert severity="info">No countries found matching your search.</Alert>
          )}
        </>
      )}
      
      {/* Suggestions when not searched yet */}
      {!searched && (
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Popular Searches
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mt: 2 }}>
            <Button variant="outlined" onClick={() => setSearchTerm('united')}>United</Button>
            <Button variant="outlined" onClick={() => setSearchTerm('island')}>Island</Button>
            <Button variant="outlined" onClick={() => setSearchTerm('republic')}>Republic</Button>
            <Button variant="outlined" onClick={() => setSearchTerm('stan')}>-stan</Button>
            <Button variant="outlined" onClick={() => setSearchTerm('land')}>-land</Button>
          </Box>
          
          <Box sx={{ mt: 4 }}>
            <Button 
              variant="contained" 
              color="secondary"
              onClick={() => navigate('/countries')}
            >
              Browse All Countries
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default CountrySearch; 