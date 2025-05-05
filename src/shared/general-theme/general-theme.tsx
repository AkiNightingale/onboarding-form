import { createTheme, responsiveFontSizes } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          borderRadius: '0.75rem !important',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          whiteSpace: 'nowrap',
          fontWeight: 500,
          height: 'fit-content',
          minWidth: '5rem',
          borderRadius: '0.75rem',

          '&.Mui-disabled': {
            borderColor: '#CFD9E0',
          },

          '&.MuiButton-text': {
            '&.MuiButton-colorInherit': {
              color: 'text.primary',
            },
          },
        },
        outlined: {
          backgroundColor: 'background.paper'
        }
      }
    }
  }
});

export const generalTheme = responsiveFontSizes(theme);