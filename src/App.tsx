import { ThemeProvider } from '@mui/material/styles';
import { AppProvider } from './context/appContext';
import AppInner from './pages/AppInner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ErrorBoundary from './components/errorboundary/ErrorBoundary.component';
import { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { CssBaseline, PaletteMode, Paper } from '@mui/material';

const App = () => {
    const queryClient = new QueryClient();
    const [mode, setMode] = useState<PaletteMode>('dark');

    const theme = createTheme({
        palette: {
            mode: mode,
        },
    });
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppProvider>
                    <ErrorBoundary>
                        <Paper sx={{ minHeight: '100vh' }}>
                            <AppInner
                                mode={mode}
                                setMode={setMode}
                            />
                        </Paper>
                    </ErrorBoundary>
                </AppProvider>
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default App;
