import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Divider
} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import LanguageIcon from '@mui/icons-material/Language';
import FlagIcon from '@mui/icons-material/Flag';
import MapIcon from '@mui/icons-material/Map';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 6,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: 'url(https://source.unsplash.com/featured/?world,globe,map)',
          overflow: 'hidden',
          borderRadius: 0,
        }}
      >
        {/* Background pattern overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.5,
          }}
        />
        {/* Darkening overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.65)',
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 4, md: 8 },
                pr: { md: 0 },
                minHeight: 450,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Box 
                component="span" 
                sx={{ 
                  display: 'inline-block', 
                  color: 'secondary.light', 
                  fontWeight: 600, 
                  mb: 2,
                  fontSize: '1.1rem',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}>
                Explore Our Planet
              </Box>
              <Typography 
                component="h1" 
                variant="h2" 
                color="inherit" 
                gutterBottom
                sx={{ 
                  fontWeight: 800, 
                  letterSpacing: '-1px',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  mb: 3,
                }}
              >
                World<span style={{ color: '#3498db' }}>Explorer</span>
              </Typography>
              <Typography 
                variant="h5" 
                color="inherit" 
                paragraph
                sx={{ 
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  lineHeight: 1.6,
                  mb: 4,
                  opacity: 0.9,
                  maxWidth: '90%',
                }}
              >
                Your comprehensive portal for exploring countries around the globe, their cultures, demographics, and more.
              </Typography>
              <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Button
                  component={RouterLink}
                  to="/countries"
                  variant="contained"
                  size="large"
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    boxShadow: '0 4px 14px rgba(39, 174, 96, 0.4)',
                    fontSize: '1rem',
                    borderRadius: '50px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 10px 20px rgba(39, 174, 96, 0.4)',
                    },
                  }}
                  startIcon={<PublicIcon />}
                >
                  Explore Countries
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item md={6} sx={{ position: 'relative', display: { xs: 'none', md: 'block' } }}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                right: '10%',
                transform: 'translateY(-50%)',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(52,152,219,0.3) 0%, rgba(0,0,0,0) 70%)',
                animation: 'pulse 3s infinite ease-in-out',
                '@keyframes pulse': {
                  '0%': { transform: 'translateY(-50%) scale(1)' },
                  '50%': { transform: 'translateY(-50%) scale(1.05)' },
                  '100%': { transform: 'translateY(-50%) scale(1)' },
                },
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Countries Feature Section */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 700, 
              color: 'primary.dark',
              position: 'relative',
              display: 'inline-block',
              '&:after': {
                content: '""',
                position: 'absolute',
                width: '60px',
                height: '4px',
                bottom: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'secondary.main',
                borderRadius: '2px',
              },
            }}
          >
            Explore Countries of the World
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary" 
            sx={{ 
              maxWidth: 800, 
              mx: 'auto', 
              mt: 4,
              fontSize: '1.1rem',
              lineHeight: 1.7,
            }}
          >
            Discover detailed information about countries around the world. Browse our comprehensive database, search for specific countries, or explore by geographic regions.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <Box sx={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://images.pexels.com/photos/1174094/pexels-photo-1174094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Countries"
                  sx={{
                    transition: 'transform 0.5s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                />
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    width: '100%', 
                    height: '30%', 
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
                  }}
                />
              </Box>
              <CardContent sx={{ flexGrow: 1, pt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PublicIcon sx={{ color: 'primary.main', mr: 1.5, fontSize: 30 }} />
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                    Browse All Countries
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  View a complete list of all countries with essential information like population, capital, and region.
                </Typography>
              </CardContent>
              <Divider />
              <CardActions sx={{ p: 2 }}>
                <Button 
                  component={RouterLink} 
                  to="/countries" 
                  size="large" 
                  color="primary"
                  fullWidth
                  variant="contained"
                  sx={{
                    borderRadius: '50px',
                    py: 1,
                  }}
                >
                  View Countries
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <Box sx={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
                  alt="Search"
                  sx={{
                    transition: 'transform 0.5s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                />
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    width: '100%', 
                    height: '30%', 
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
                  }}
                />
              </Box>
              <CardContent sx={{ flexGrow: 1, pt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SearchIcon sx={{ color: 'primary.main', mr: 1.5, fontSize: 30 }} />
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                    Search Countries
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Search for specific countries by name and discover detailed information about them instantly.
                </Typography>
              </CardContent>
              <Divider />
              <CardActions sx={{ p: 2 }}>
                <Button 
                  component={RouterLink} 
                  to="/countries/search" 
                  size="large" 
                  color="primary"
                  fullWidth
                  variant="contained"
                  sx={{
                    borderRadius: '50px',
                    py: 1,
                  }}
                >
                  Search Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <Box sx={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Regions"
                  sx={{
                    transition: 'transform 0.5s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                />
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    width: '100%', 
                    height: '30%', 
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
                  }}
                />
              </Box>
              <CardContent sx={{ flexGrow: 1, pt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ExploreIcon sx={{ color: 'primary.main', mr: 1.5, fontSize: 30 }} />
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                    Explore by Region
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Explore countries by geographic regions such as Africa, Americas, Asia, Europe, and Oceania.
                </Typography>
              </CardContent>
              <Divider />
              <CardActions sx={{ p: 2 }}>
                <Button 
                  component={RouterLink} 
                  to="/countries/regions" 
                  size="large" 
                  color="primary"
                  fullWidth
                  variant="contained"
                  sx={{
                    borderRadius: '50px',
                    py: 1,
                  }}
                >
                  Explore Regions
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Container sx={{ py: 8, bgcolor: 'background.paper' }} maxWidth="lg">
        <Typography
          component="h2"
          variant="h4"
          align="center"
          gutterBottom
        >
          Discover Our Global Community
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
        >
          WorldExplorer provides comprehensive information about countries worldwide, helping you explore the rich diversity of our planet and connect with global cultures.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', pt: 4 }}>
                <FlagIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography gutterBottom variant="h5" component="h3">
                  Country Flags
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View high-quality images of national flags from around the world and learn about their significance.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', pt: 4 }}>
                <LanguageIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography gutterBottom variant="h5" component="h3">
                  Language & Culture
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Explore the languages, currencies, and cultural aspects of different nations across the globe.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', pt: 4 }}>
                <MapIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography gutterBottom variant="h5" component="h3">
                  Geographic Data
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Access detailed geographic information including borders, regions, capital cities, and population statistics.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 