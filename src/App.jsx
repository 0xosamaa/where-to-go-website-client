import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import AppRoutes from './Routes';
import { createTheme, ThemeProvider } from '@mui/material';

const primary = {};
const secondary = {};

if (localStorage.getItem('token')) {
    primary.main = '#00BBAA';
    primary.light = '#07ffea';
    primary.dark = '#00a99b';
    primary.contrastText = '#FFFFFF';
    secondary.main = '#0053CC';
    secondary.light = '#1673ff';
    secondary.dark = '#0043a8';
    secondary.contrastText = '#FFFFFF';
} else {
    primary.main = '#0053CC';
    primary.light = '#1673ff';
    primary.dark = '#0043a8';
    primary.contrastText = '#FFFFFF';
    secondary.main = '#00BBAA';
    secondary.light = '#07ffea';
    secondary.dark = '#00a99b';
    secondary.contrastText = '#FFFFFF';
}

const theme = createTheme({
    palette: {
        primary: primary,
        secondary: secondary,
        info: {
            main: '#FFFFFF',
            light: '#FFFFFF',
            dark: '#FFFFFF',
            contrastText: '#000000',
        }
    },
    typography: {
        fontFamily: 'Dosis, sans-serif',
        fontSize: 16,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        h1: {
            fontFamily: 'Dosis, sans-serif',
            fontWeight: 700,
            fontSize: 40,
            padding: '20px 0',
        },
        h2: {
            fontFamily: 'Dosis, sans-serif',
            fontWeight: 700,
            fontSize: 32,
            padding: '16px 0',
        },
        h3: {
            fontFamily: 'Dosis, sans-serif',
            fontWeight: 700,
            fontSize: 24,
            padding: '12px 0',
        },
        h4: {
            fontFamily: 'Dosis, sans-serif',
            fontWeight: 700,
            fontSize: 20,
            padding: '10px 0',
        },
        h5: {
            fontFamily: 'Dosis, sans-serif',
            fontWeight: 700,
            fontSize: 18,
        },
        h6: {
            fontFamily: 'Dosis, sans-serif',
            fontWeight: 700,
            fontSize: 16,
        },
        body: {
            fontFamily: 'Dosis, sans-serif',
            fontWeight: 400,
            fontSize: 16,
        },
    },
    shape: {
        borderRadius: 4,
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AppRoutes />
        </ThemeProvider>
    );
}

export default App;
