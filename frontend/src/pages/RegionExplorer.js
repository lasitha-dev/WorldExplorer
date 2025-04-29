import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CircularProgress,
  Alert,
  Button,
  Divider
} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';

// REST Countries API base URL
const API_URL = 'https://restcountries.com/v3.1';

// Define regions with icons and colors
const regions = [
  { name: 'Africa', icon: '🌍', color: '#FFC107' },
  { name: 'Americas', icon: '🌎', color: '#4CAF50' },
  { name: 'Asia', icon: '🌏', color: '#F44336' },
  { name: 'Europe', icon: '🏰', color: '#2196F3' },
  { name: 'Oceania', icon: '🏝️', color: '#9C27B0' }
];

const RegionExplorer = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch countries by region
  useEffect(() => {
    const fetchCountriesByRegion = async () => {
      if (!selectedRegion) return;
      
      try {
        setLoading(true);
        setError('');
        
        const response = await axios.get(`${API_URL}/region/${selectedRegion}`);
        
        // Sort countries by name
        const sortedCountries = response.data.sort((a, b) => 
          a.name.common.localeCompare(b.name.common)
        );
        
        setCountries(sortedCountries);
        setLoading(false);
      } catch (err) {
        setError(`Failed to fetch countries in ${selectedRegion}. Please try again.`);
        setLoading(false);
      }
    };
    
    fetchCountriesByRegion();
  }, [selectedRegion]);

  // Handle region selection
  const handleRegionSelect = (regionName) => {
    setSelectedRegion(regionName);
  };

  // Navigate to country detail
  const handleCountryClick = (countryCode) => {
    navigate(`/countries/${countryCode}`);
  };

  // Handle back button click
  const handleBackClick = () => {
    setSelectedRegion('');
    setCountries([]);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <PublicIcon sx={{ fontSize: 32, mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1">
          Explore Countries by Region
        </Typography>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}
      
      {!selectedRegion ? (
        // Region Selection
        <Grid container spacing={3}>
          {regions.map((region) => (
            <Grid item xs={12} sm={6} md={4} key={region.name}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                  },
                  borderTop: `4px solid ${region.color}`
                }}
              >
                <CardActionArea 
                  onClick={() => handleRegionSelect(region.name)}
                  sx={{ height: '100%', p: 2 }}
                >
                  <Box 
                    sx={{ 
                      fontSize: '4rem', 
                      textAlign: 'center',
                      mb: 2
                    }}
                  >
                    {region.icon}
                  </Box>
                  <Typography variant="h5" component="h2" align="center" gutterBottom>
                    {region.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    Click to explore countries in {region.name}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
          
          <Grid item xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                },
                borderTop: '4px solid #607D8B'
              }}
            >
              <CardActionArea 
                onClick={() => navigate('/countries')}
                sx={{ height: '100%', p: 2 }}
              >
                <Box 
                  sx={{ 
                    fontSize: '4rem', 
                    textAlign: 'center',
                    mb: 2
                  }}
                >
                  🌐
                </Box>
                <Typography variant="h5" component="h2" align="center" gutterBottom>
                  All Countries
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  View and search all countries
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      ) : (
        // Countries List by Region
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Countries in {selectedRegion}
            </Typography>
            <Button 
              variant="outlined" 
              onClick={handleBackClick}
            >
              Back to Regions
            </Button>
          </Box>
          
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
              <CircularProgress />
            </Box>
          ) : (
            <>
              {countries.length === 0 && !loading ? (
                <Alert severity="info">No countries found in this region</Alert>
              ) : (
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
                              <strong>Population:</strong> {country.population.toLocaleString()}
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
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default RegionExplorer; 