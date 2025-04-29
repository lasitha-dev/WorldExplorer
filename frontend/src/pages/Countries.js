import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Box,
  CircularProgress,
  Alert,
  InputAdornment,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Divider,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// REST Countries API base URL
const API_URL = 'https://restcountries.com/v3.1';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  
  // Fetch all countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await axios.get(`${API_URL}/all`);
        const sortedCountries = response.data.sort((a, b) => 
          a.name.common.localeCompare(b.name.common)
        );
        
        setCountries(sortedCountries);
        setFilteredCountries(sortedCountries);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch countries. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchCountries();
  }, []);
  
  // Filter countries based on search term and selected region
  useEffect(() => {
    let result = countries;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(country => 
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by region
    if (selectedRegion) {
      result = result.filter(country => 
        country.region === selectedRegion
      );
    }
    
    setFilteredCountries(result);
  }, [searchTerm, selectedRegion, countries]);
  
  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  // Handle region selection change
  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };
  
  // Navigate to country detail page
  const handleCountryClick = (countryCode) => {
    navigate(`/countries/${countryCode}`);
  };
  
  // Extract unique regions from countries for filter dropdown
  const regions = [...new Set(countries.map(country => country.region))].filter(Boolean).sort();
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Countries of the World
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {/* Search and Filter Section */}
      <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <TextField
          label="Search for a country"
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
        
        <FormControl sx={{ minWidth: { xs: '100%', sm: 200 } }}>
          <InputLabel id="region-select-label">Filter by Region</InputLabel>
          <Select
            labelId="region-select-label"
            id="region-select"
            value={selectedRegion}
            label="Filter by Region"
            onChange={handleRegionChange}
          >
            <MenuItem value="">
              <em>All Regions</em>
            </MenuItem>
            {regions.map(region => (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      {/* Countries Grid */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="subtitle1" gutterBottom>
            {filteredCountries.length} countries found
          </Typography>
          
          <Grid container spacing={3}>
            {filteredCountries.map(country => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={country.cca3}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
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
          
          {filteredCountries.length === 0 && !loading && (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="h6">No countries found matching your criteria</Typography>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default Countries; 