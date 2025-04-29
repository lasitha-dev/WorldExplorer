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
          mb: 4,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: 'url(https://source.unsplash.com/random/?world,map)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.6)',
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
                minHeight: 400,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                WorldExplorer
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Your comprehensive portal for exploring countries around the globe, their cultures, demographics, and more.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  component={RouterLink}
                  to="/countries"
                  variant="contained"
                  size="large"
                  sx={{ mr: 2, mb: { xs: 2, sm: 0 } }}
                  startIcon={<PublicIcon />}
                >
                  Explore Countries
                </Button>
                {!isAuthenticated && (
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="outlined"
                    size="large"
                    sx={{ color: 'white', borderColor: 'white' }}
                  >
                    Join WorldExplorer
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Countries Feature Section */}
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Box sx={{ mb: 5, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Explore Countries of the World
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Discover detailed information about countries around the world. Browse our comprehensive database, search for specific countries, or explore by geographic regions.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image="https://source.unsplash.com/random/?countries"
                alt="Countries"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PublicIcon sx={{ color: 'primary.main', mr: 1, fontSize: 30 }} />
                  <Typography variant="h5" component="h3">
                    Browse All Countries
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  View a list of all countries with essential information like population, capital, and region.
                </Typography>
              </CardContent>
              <Divider />
              <CardActions>
                <Button 
                  component={RouterLink} 
                  to="/countries" 
                  size="small" 
                  color="primary"
                  fullWidth
                >
                  View Countries
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image="https://source.unsplash.com/random/?map"
                alt="Search"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SearchIcon sx={{ color: 'primary.main', mr: 1, fontSize: 30 }} />
                  <Typography variant="h5" component="h3">
                    Search Countries
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Search for specific countries by name and discover detailed information about them.
                </Typography>
              </CardContent>
              <Divider />
              <CardActions>
                <Button 
                  component={RouterLink} 
                  to="/countries/search" 
                  size="small" 
                  color="primary"
                  fullWidth
                >
                  Search Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image="https://source.unsplash.com/random/?continent"
                alt="Regions"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ExploreIcon sx={{ color: 'primary.main', mr: 1, fontSize: 30 }} />
                  <Typography variant="h5" component="h3">
                    Explore by Region
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Explore countries by geographic regions such as Africa, Americas, Asia, Europe, and Oceania.
                </Typography>
              </CardContent>
              <Divider />
              <CardActions>
                <Button 
                  component={RouterLink} 
                  to="/countries/regions" 
                  size="small" 
                  color="primary"
                  fullWidth
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
                  View high-quality images of national flags from around the world.
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
                  Explore the languages, currencies, and cultural aspects of different nations.
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
                  Access detailed geographic information including borders, regions, and capital cities.
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