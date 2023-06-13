import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import AppRoutes from './Routes';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#00BBAA',
            light: '#07ffea',
            dark: '#00a99b',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#0053CC',
            light: '#1673ff',
            dark: '#0043a8',
            contrastText: '#FFFFFF',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: 16,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        h1: {
            fontFamily: 'Archivo, sans-serif',
            fontWeight: 700,
            fontSize: 40,
        },
        h2: {
            fontFamily: 'Archivo, sans-serif',
            fontWeight: 700,
            fontSize: 32,
        },
        h3: {
            fontFamily: 'Archivo, sans-serif',
            fontWeight: 700,
            fontSize: 24,
        },
        h4: {
            fontFamily: 'Archivo, sans-serif',
            fontWeight: 700,
            fontSize: 20,
        },
        h5: {
            fontFamily: 'Archivo, sans-serif',
            fontWeight: 700,
            fontSize: 18,
        },
        h6: {
            fontFamily: 'Archivo, sans-serif',
            fontWeight: 700,
            fontSize: 16,
        },
        body: {
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 400,
            fontSize: 16,
        },
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
