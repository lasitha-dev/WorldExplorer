import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PublicIcon from '@mui/icons-material/Public';
import ExploreIcon from '@mui/icons-material/Explore';
import SearchIcon from '@mui/icons-material/Search';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const countryFeatures = [
    {
      title: 'Browse Countries',
      description: 'Explore our comprehensive database of countries',
      icon: <PublicIcon color="primary" />,
      path: '/countries'
    },
    {
      title: 'Search Countries',
      description: 'Find specific countries by name',
      icon: <SearchIcon color="primary" />,
      path: '/countries/search'
    },
    {
      title: 'Explore by Region',
      description: 'Discover countries grouped by geographic region',
      icon: <ExploreIcon color="primary" />,
      path: '/countries/regions'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Welcome to WorldExplorer
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<ExitToAppIcon />}
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              Hello, {user?.name}!
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Your personal dashboard provides quick access to explore countries around the world.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Your Profile
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountCircleIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Full Name
                  </Typography>
                  <Typography variant="body1">
                    {user?.name}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Email Address
                  </Typography>
                  <Typography variant="body1">
                    {user?.email}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarTodayIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Member Since
                  </Typography>
                  <Typography variant="body1">
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Explore WorldExplorer
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <List>
                {countryFeatures.map((feature, index) => (
                  <ListItem 
                    key={index} 
                    button 
                    onClick={() => navigate(feature.path)}
                    sx={{ 
                      mb: 1, 
                      borderRadius: 1,
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                  >
                    <ListItemIcon>
                      {feature.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={feature.title} 
                      secondary={feature.description}
                    />
                  </ListItem>
                ))}
              </List>

              <Box sx={{ mt: 3 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<PublicIcon />}
                  fullWidth
                  onClick={() => navigate('/countries')}
                  size="large"
                >
                  Start Exploring
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 