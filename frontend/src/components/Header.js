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
  MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PublicIcon from '@mui/icons-material/Public';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';

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
          <PublicIcon 
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              mr: 1.5, 
              fontSize: 32,
              animation: 'rotate 20s linear infinite',
              '@keyframes rotate': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' }
              }
            }} 
          />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 3,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Poppins, sans-serif',
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
              sx={{ 
                '&:hover': { 
                  background: 'rgba(255,255,255,0.1)',
                } 
              }}
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
                '& .MuiPaper-root': { 
                  borderRadius: 2,
                  mt: 1.5,
                },
              }}
            >
              <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/'); }}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              
              {/* Countries Menu Items for Mobile */}
              <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/countries'); }}>
                <Typography textAlign="center">All Countries</Typography>
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
          
          <PublicIcon 
            sx={{ 
              display: { xs: 'flex', md: 'none' }, 
              mr: 1,
              fontSize: 28,
              animation: 'rotate 20s linear infinite',
              '@keyframes rotate': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' }
              }
            }} 
          />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              letterSpacing: '.05rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            WorldExplorer
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={() => navigate('/')}
              sx={{ 
                my: 2, 
                mx: 0.5,
                color: 'white', 
                display: 'block',
                fontSize: '1rem',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  width: '0%',
                  height: '3px',
                  bottom: '6px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'white',
                  transition: 'width 0.3s ease',
                  borderRadius: '3px',
                },
                '&:hover:after': {
                  width: '60%',
                },
              }}
            >
              Home
            </Button>
            
            {/* Countries Dropdown for Desktop */}
            <Button
              onClick={handleOpenCountriesMenu}
              sx={{ 
                my: 2, 
                mx: 0.5, 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center',
                fontSize: '1rem',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  width: '0%',
                  height: '3px',
                  bottom: '6px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'white',
                  transition: 'width 0.3s ease',
                  borderRadius: '3px',
                },
                '&:hover:after': {
                  width: '60%',
                },
              }}
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
              sx={{
                '& .MuiPaper-root': { 
                  borderRadius: 2,
                  mt: 1.5,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                },
              }}
            >
              <MenuItem 
                onClick={() => { handleCloseCountriesMenu(); navigate('/countries'); }}
                sx={{
                  borderRadius: 1,
                  mx: 0.5,
                  my: 0.5,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(26, 82, 118, 0.08)',
                    transform: 'translateX(5px)',
                  }
                }}
              >
                <PublicIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                <Typography>All Countries</Typography>
              </MenuItem>
              <MenuItem 
                onClick={() => { handleCloseCountriesMenu(); navigate('/countries/search'); }}
                sx={{
                  borderRadius: 1,
                  mx: 0.5,
                  my: 0.5,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(26, 82, 118, 0.08)',
                    transform: 'translateX(5px)',
                  }
                }}
              >
                <SearchIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                <Typography>Search Countries</Typography>
              </MenuItem>
              <MenuItem 
                onClick={() => { handleCloseCountriesMenu(); navigate('/countries/regions'); }}
                sx={{
                  borderRadius: 1,
                  mx: 0.5,
                  my: 0.5,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(26, 82, 118, 0.08)',
                    transform: 'translateX(5px)',
                  }
                }}
              >
                <ExploreIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                <Typography>Explore by Region</Typography>
              </MenuItem>
            </Menu>
            
            {isAuthenticated && (
              <Button
                onClick={() => navigate('/dashboard')}
                sx={{ 
                  my: 2, 
                  mx: 0.5, 
                  color: 'white', 
                  display: 'block',
                  fontSize: '1rem',
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    width: '0%',
                    height: '3px',
                    bottom: '6px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'white',
                    transition: 'width 0.3s ease',
                    borderRadius: '3px',
                  },
                  '&:hover:after': {
                    width: '60%',
                  },
                }}
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
                    <Avatar alt={user?.name || 'User'} src="/static/images/avatar/default.jpg" />
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
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  component={RouterLink} 
                  to="/login" 
                  sx={{ 
                    color: 'white', 
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)'
                    }
                  }}
                >
                  Login
                </Button>
                <Button 
                  component={RouterLink} 
                  to="/register" 
                  variant="contained"
                  color="secondary"
                  sx={{ 
                    borderRadius: '20px',
                    px: 2.5,
                    py: 0.7,
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    }
                  }}
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