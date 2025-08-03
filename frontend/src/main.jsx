import { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { lightTheme, darkTheme } from './theme';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom'; 
import { Toaster } from 'react-hot-toast';
import "./index.css"

const Root = () => {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>
          <AuthProvider>
            <App toggleTheme={() => setMode(mode === 'light' ? 'dark' : 'light')} mode={mode} />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  padding: '12px 16px',
                  fontSize: '14px',
                },
              }}
            />
          </AuthProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
