import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#8b3a3a', 
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#d4af37', 
    },
    background: {
      default: '#faebd7', 
      paper: '#faf0e6', 
    },
    text: {
      primary: '#4e342e', 
      secondary: '#4e342e', 
    }
  },
  typography: {
    fontFamily: '"Playfair Display", "Georgia", "Serif"',
    h4: { 
      fontWeight: 'bold', 
      color: '#faebd7' 
    },
    h5: { 
      fontWeight: 'bold', 
      color: '#faebd7' 
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
         
          border: '2px solid #d4af37', 
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(78, 52, 46, 0.1)', 
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          letterSpacing: '1px',
          textTransform: 'none', 
        }
      }
    }
  },
});