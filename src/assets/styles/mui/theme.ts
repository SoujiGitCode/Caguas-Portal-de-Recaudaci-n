import { createTheme } from '@mui/material/styles';
import { orange, blue } from '@mui/material/colors';

const borderColor = "#c4c4c4";
const borderHover = "#dd6039";

const placeholderColor = "rgba(51, 51, 51, 0.4)";
const filledInputBg = '#EAEAEA';

const disabledColorPrimary = "#f09a3e";

const theme = createTheme({
  palette: {
    primary: {
      main: '#dd6039',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#3A3A3C ',
      contrastText: '#ffffff'
    },
    error: {
      main: '#D81919',
    },
    warning: {
      main: '#f09a3e',
      contrastText: '#ffffff'
    },
    success: {
      main: '#dd6039',
    },
    text: {
      primary: '#333333',
    },
    background: {
      // default: '#f2f2f2',
      default: '#ffffff',
      paper: '#f2f2f2',
    },
  },
  typography: {
    fontFamily: [
      'Lato',
      'Montserrat-Medium',
      // 'Montserrat-Black',
      // Si Montserrat-Medium y Montserrat-Black no están disponibles,
      // el navegador usará la siguiente fuente disponible en la lista.
    ].join(','),
    // Definir variantes de Typography
    h1: {
      fontFamily: 'Lato',
      fontWeight: 'bolder',
      fontSize: '2rem',
    },
    h2: {
      fontFamily: 'Lato',
      fontWeight: 'bold',
      fontSize: '1.5rem',
    },
    h3: {
      fontFamily: 'Lato',
      fontWeight: 'bolder',
      fontSize: '1.4rem',
    },
    h4: {
      fontFamily: 'Lato',
      fontWeight: 'bolder',
      fontSize: '1.3rem',
    },
    h5: {
      fontFamily: 'Lato',
      fontWeight: 'bolder',
      fontSize: '1.2rem',
    },
    h6: {
      fontFamily: 'Lato',
      fontWeight: 'bolder',
      fontSize: '1.1rem',
    },
    body1: {
      fontFamily: 'Lato',
      fontWeight: 'normal',
      fontSize: '1rem',
    },
    body2: {
      fontFamily: 'Lato',
      fontWeight: 'normal',
      fontSize: '0.8rem',
      color: '#000',
    },
    subtitle1: {
      fontFamily: 'Lato',
      fontWeight: 'bolder',
      fontSize: '1.2rem',
    },
    subtitle2: {
      fontFamily: 'Lato',
      fontWeight: 'normal',
      fontSize: '0.8rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          //font-weight para todos los botones a pedido de Pier
          fontFamily: 'Lato',
          fontWeight: 'bold',
        },
        containedPrimary: {
          '&:disabled': {
            backgroundColor: disabledColorPrimary, // Background Color when disabled for contained buttons
            color: '#ffffff'
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontFamily: 'Montserrat-Medium',
          fontWeight: 'normal',
          fontSize: '0.8rem',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              height: '48px',
              borderColor: borderColor,
              borderRadius: '32px', // Borde redondeado completo
              border: `1px solid ${borderColor}`,
              padding: '8px 16px', // Padding personalizado
            },
            '&:hover fieldset': {
              borderColor: borderHover,
            },
            '&.Mui-focused fieldset': {
              borderColor: borderHover,
            },
            '& input:-webkit-autofill': {
              borderRadius: '32px',
              WebkitBoxShadow: '0 0 0 100px #ffffff inset', // Evita el fondo azul de autofill
              // WebkitTextFillColor: '#000', // Color de texto
            },
          },
          '& .MuiInputLabel-outlined': {
            fontSize: "1rem",
            color: placeholderColor,
          },
          '& .MuiInputLabel-outlined.Mui-focused': {
            color: borderColor,
          },
          '& .MuiOutlinedInput-input': {
            padding: "0.7rem",
            fontSize: '0.8rem'
          },

          // Estilos para variant="filled"
          '& .MuiFilledInput-root': {
            backgroundColor: filledInputBg, // Fondo gris para el input 'filled'
            borderRadius: '4px 4px 0px 0px',
            border: `2px solid ${borderColor}`,
            '&:before': {
              borderBottomColor: borderColor, // Línea inferior cuando no está enfocado
            },
            '&:hover:before': {
              borderBottomColor: borderColor, // Línea inferior al pasar el ratón por encima
            },
            '&.Mui-focused': {
              backgroundColor: filledInputBg, // Fondo gris cuando está enfocado
              '&:after': {
                borderBottomColor: borderColor, // Línea inferior cuando está enfocado
              },
            },
            // Ajuste del padding si es necesario
            '& .MuiInputBase-input': {
              padding: "0.7rem",
            },
          },

          // Estilos para la etiqueta (label) de variant="filled"
          '& .MuiInputLabel-filled': {
            color: placeholderColor,
            '&.Mui-focused': {
              color: borderColor,
            },
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: '0.8rem !important',
          marginLeft: '0px',

        },
      },
    },

  },
});

export default theme;