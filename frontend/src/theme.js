import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a5276', // Deep blue - representing oceans and global waters
      light: '#3498db',
      dark: '#0e4062',
      contrastText: '#fff',
    },
    secondary: {
      main: '#27ae60', // Vibrant green - representing land/continents
      light: '#2ecc71',
      dark: '#1e8449',
      contrastText: '#fff',
    },
    background: {
      default: '#f8f9fb', // Light off-white with blue undertone
      paper: '#ffffff',
    },
    error: {
      main: '#e74c3c', // Rich red, brightened slightly
      light: '#f5b7b1',
      dark: '#c0392b',
    },
    warning: {
      main: '#f39c12', // Orange for highlighting
      light: '#fad7a0',
      dark: '#d35400',
    },
    info: {
      main: '#3498db', // Information blue
      light: '#aed6f1',
      dark: '#2980b9',
    },
    success: {
      main: '#2ecc71', // Success green, brightened
      light: '#a9dfbf',
      dark: '#27ae60',
    },
    grey: {
      50: '#f8f9fa',
      100: '#f1f3f5',
      200: '#e9ecef',
      300: '#dee2e6',
      400: '#ced4da',
      500: '#adb5bd',
      600: '#6c757d',
      700: '#495057',
      800: '#343a40',
      900: '#212529',
    },
    // Additional colors for geographic themes
    regions: {
      africa: '#f39c12', // Golden/orange for Africa
      americas: '#8e44ad', // Purple for Americas
      asia: '#d35400', // Terra cotta for Asia
      europe: '#2980b9', // Blue for Europe
      oceania: '#16a085', // Teal for Oceania
    },
    text: {
      primary: '#212529',
      secondary: '#495057',
      disabled: '#adb5bd',
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.25px',
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    subtitle1: {
      fontWeight: 400,
      lineHeight: 1.6,
      fontSize: '1rem',
    },
    subtitle2: {
      fontWeight: 400,
      lineHeight: 1.6,
      fontSize: '0.875rem',
    },
    body1: {
      lineHeight: 1.7,
      fontSize: '1rem',
    },
    body2: {
      lineHeight: 1.7,
      fontSize: '0.875rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
  },
  shape: {
    borderRadius: 10,
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.05),0px 1px 1px 0px rgba(0,0,0,0.03),0px 1px 3px 0px rgba(0,0,0,0.1)',
    '0px 3px 3px -2px rgba(0,0,0,0.06),0px 2px 6px 0px rgba(0,0,0,0.04),0px 1px 8px 0px rgba(0,0,0,0.12)',
    '0px 3px 4px -2px rgba(0,0,0,0.07),0px 3px 8px 0px rgba(0,0,0,0.05),0px 1px 12px 0px rgba(0,0,0,0.13)',
    '0px 4px 5px -2px rgba(0,0,0,0.08),0px 4px 10px 0px rgba(0,0,0,0.06),0px 1px 16px 0px rgba(0,0,0,0.14)',
    '0px 5px 8px -3px rgba(0,0,0,0.09),0px 5px 12px 1px rgba(0,0,0,0.07),0px 3px 16px 2px rgba(0,0,0,0.15)',
    // Customize other shadows as needed
    '0 10px 30px rgba(0,0,0,0.15)', // Custom shadow for elevated elements
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#c1c1c1',
            borderRadius: '5px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#a8a8a8',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.95rem',
          padding: '8px 22px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          transition: 'all 0.2s ease-in-out',
        },
        containedPrimary: {
          background: 'linear-gradient(145deg, #1a5276, #3498db)',
          '&:hover': {
            background: 'linear-gradient(145deg, #0e4062, #2980b9)',
            boxShadow: '0 4px 12px rgba(26, 82, 118, 0.3)',
            transform: 'translateY(-2px)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(145deg, #27ae60, #2ecc71)',
          '&:hover': {
            background: 'linear-gradient(145deg, #1e8449, #27ae60)',
            boxShadow: '0 4px 12px rgba(39, 174, 96, 0.3)',
            transform: 'translateY(-2px)',
          },
        },
        outlinedPrimary: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            backgroundColor: 'rgba(52, 152, 219, 0.04)',
            transform: 'translateY(-2px)',
          },
        },
        outlinedSecondary: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            backgroundColor: 'rgba(46, 204, 113, 0.04)',
            transform: 'translateY(-2px)',
          },
        },
        sizeSmall: {
          padding: '6px 16px',
          fontSize: '0.85rem',
        },
        sizeLarge: {
          padding: '10px 26px',
          fontSize: '1.05rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        },
        elevation1: {
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        },
        elevation2: {
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        },
        elevation3: {
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
        },
        elevation4: {
          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 6px 16px rgba(0,0,0,0.07)',
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 16px 32px rgba(0,0,0,0.14)',
          },
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          transition: 'transform 0.6s ease',
          '&:hover': {
            transform: 'scale(1.08)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          '&:last-child': {
            paddingBottom: '24px',
          },
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            transition: 'box-shadow 0.2s ease-in-out',
            '&.Mui-focused': {
              boxShadow: '0 0 0 4px rgba(52, 152, 219, 0.15)',
            },
            '&:hover': {
              '&:not(.Mui-focused):not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.3)',
              },
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
          backgroundImage: 'linear-gradient(135deg, #1a5276 0%, #2980b9 100%)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          fontWeight: 500,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        filled: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
        filledPrimary: {
          background: 'linear-gradient(145deg, #1a5276, #3498db)',
        },
        filledSecondary: {
          background: 'linear-gradient(145deg, #27ae60, #2ecc71)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '16px 0',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: 'background-color 0.2s ease',
          '&.Mui-selected': {
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(52, 152, 219, 0.15)',
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.03)',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
        },
        root: {
          '& .MuiTab-root.Mui-selected': {
            color: '#1a5276',
            fontWeight: 700,
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.95rem',
          padding: '12px 24px',
          transition: 'color 0.2s ease',
          '&:hover': {
            color: '#3498db',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          position: 'relative',
          '&:hover': {
            '&::after': {
              transform: 'scaleX(1)',
            },
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '100%',
            transform: 'scaleX(0)',
            height: '2px',
            bottom: '-2px',
            left: 0,
            backgroundColor: 'currentColor',
            transformOrigin: 'bottom right',
            transition: 'transform 0.3s ease-out',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'transform 0.2s ease, background-color 0.2s ease',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          boxShadow: '0 24px 38px rgba(0,0,0,0.14), 0 9px 46px rgba(0,0,0,0.12), 0 11px 15px rgba(0,0,0,0.2)',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 8,
          fontSize: '0.85rem',
          padding: '8px 12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
      },
    },
  },
});

export default theme; 