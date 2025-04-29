import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Chip,
  CircularProgress,
  Alert,
  Divider,
  Card,
  CardMedia
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// REST Countries API base URL
const API_URL = 'https://restcountries.com/v3.1';

const CountryDetail = () => {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Fetch country details on component mount
  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Fetch country by alpha code
        const response = await axios.get(`${API_URL}/alpha/${countryCode}`);
        
        if (response.data && response.data.length > 0) {
          setCountry(response.data[0]);
          
          // Fetch border countries if they exist
          if (response.data[0].borders && response.data[0].borders.length > 0) {
            const borderCodes = response.data[0].borders.join(',');
            const bordersResponse = await axios.get(`${API_URL}/alpha?codes=${borderCodes}`);
            
            const borderData = bordersResponse.data.map(border => ({
              name: border.name.common,
              code: border.cca3,
              flag: border.flags.svg
            }));
            
            setBorderCountries(borderData);
          }
        } else {
          setError('Country not found');
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch country details. Please try again later.');
        setLoading(false);
      }
    };
    
    if (countryCode) {
      fetchCountryDetails();
    }
  }, [countryCode]);
  
  // Format languages as a comma-separated string
  const formatLanguages = (languages) => {
    if (!languages) return 'N/A';
    return Object.values(languages).join(', ');
  };
  
  // Format currencies as a comma-separated string
  const formatCurrencies = (currencies) => {
    if (!currencies) return 'N/A';
    return Object.values(currencies)
      .map(currency => `${currency.name} (${currency.symbol || ''})`)
      .join(', ');
  };
  
  // Format number with commas
  const formatNumber = (num) => {
    return num ? num.toLocaleString() : 'N/A';
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Button 
        variant="outlined" 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/countries')}
        sx={{ mb: 4 }}
      >
        Back to Countries
      </Button>
      
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : country ? (
        <Grid container spacing={6}>
          {/* Flag Section */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: 350,
                objectFit: 'contain',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                borderRadius: 2
              }}
              alt={`Flag of ${country.name.common}`}
              src={country.flags.svg}
            />
          </Grid>
          
          {/* Country Info Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {country.name.common}
            </Typography>
            
            {country.name.official !== country.name.common && (
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {country.name.official}
              </Typography>
            )}
            
            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1">
                    <strong>Population:</strong> {formatNumber(country.population)}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1">
                    <strong>Region:</strong> {country.region || 'N/A'}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1">
                    <strong>Sub Region:</strong> {country.subregion || 'N/A'}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1">
                    <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1">
                    <strong>Languages:</strong> {formatLanguages(country.languages)}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1">
                    <strong>Currencies:</strong> {formatCurrencies(country.currencies)}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1">
                    <strong>Area:</strong> {formatNumber(country.area)} km²
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1">
                    <strong>Timezone:</strong> {country.timezones?.[0] || 'N/A'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            
            {/* Border Countries Section */}
            {borderCountries.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Border Countries:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {borderCountries.map(border => (
                    <Chip
                      key={border.code}
                      label={border.name}
                      onClick={() => navigate(`/countries/${border.code}`)}
                      clickable
                      sx={{ margin: 0.5 }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Grid>
          
          {/* Additional Information Section */}
          <Grid item xs={12}>
            <Divider sx={{ my: 4 }} />
            <Typography variant="h5" gutterBottom>
              Additional Information
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Top Level Domain:</strong>
                  </Typography>
                  <Typography variant="body1">
                    {country.tld?.[0] || 'N/A'}
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Driving Side:</strong>
                  </Typography>
                  <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                    {country.car?.side || 'N/A'}
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>UN Member:</strong>
                  </Typography>
                  <Typography variant="body1">
                    {country.unMember ? 'Yes' : 'No'}
                  </Typography>
                </Paper>
              </Grid>
              
              {country.maps?.googleMaps && (
                <Grid item xs={12}>
                  <Paper sx={{ p: 3, mt: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      <strong>Maps:</strong>
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      href={country.maps.googleMaps} 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Google Maps
                    </Button>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Alert severity="info">No country information available</Alert>
      )}
    </Container>
  );
};

export default CountryDetail; 