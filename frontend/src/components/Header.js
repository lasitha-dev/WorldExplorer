import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Link
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PublicIcon from '@mui/icons-material/Public';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElCountries, setAnchorElCountries] = useState(null);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleOpenCountriesMenu = (event) => {
    setAnchorElCountries(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const handleCloseCountriesMenu = () => {
    setAnchorElCountries(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PublicIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            WorldExplorer
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/'); }}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              
              {/* Countries Menu Items for Mobile */}
              <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/countries'); }}>
                <Typography textAlign="center">Countries</Typography>
              </MenuItem>
              <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/countries/search'); }}>
                <Typography textAlign="center">Search Countries</Typography>
              </MenuItem>
              <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/countries/regions'); }}>
                <Typography textAlign="center">Explore Regions</Typography>
              </MenuItem>
              
              {isAuthenticated && (
                <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/dashboard'); }}>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          
          <PublicIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            WorldExplorer
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={() => navigate('/')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Home
            </Button>
            
            {/* Countries Dropdown for Desktop */}
            <Button
              onClick={handleOpenCountriesMenu}
              sx={{ my: 2, color: 'white', display: 'flex', alignItems: 'center' }}
              startIcon={<PublicIcon />}
            >
              Countries
            </Button>
            <Menu
              id="countries-menu"
              anchorEl={anchorElCountries}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElCountries)}
              onClose={handleCloseCountriesMenu}
            >
              <MenuItem onClick={() => { handleCloseCountriesMenu(); navigate('/countries'); }}>
                <PublicIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography>All Countries</Typography>
              </MenuItem>
              <MenuItem onClick={() => { handleCloseCountriesMenu(); navigate('/countries/search'); }}>
                <SearchIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography>Search Countries</Typography>
              </MenuItem>
              <MenuItem onClick={() => { handleCloseCountriesMenu(); navigate('/countries/regions'); }}>
                <ExploreIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography>Explore by Region</Typography>
              </MenuItem>
            </Menu>
            
            {isAuthenticated && (
              <Button
                onClick={() => navigate('/dashboard')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Dashboard
              </Button>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user?.name} src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/dashboard'); }}>
                    <Typography textAlign="center">Dashboard</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex' }}>
                <Button
                  component={RouterLink}
                  to="/login"
                  sx={{ color: 'white', display: 'block', mr: 1 }}
                >
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  color="secondary"
                >
                  Register
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 