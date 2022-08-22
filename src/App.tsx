import { ThemeProvider } from '@mui/material/styles';
import { AppProvider } from './context/appContext';
import theme from './styles/theme';
import AppInner from './pages/AppInner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ErrorBoundary from './components/errorboundary/ErrorBoundary.component';

const App = () => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <AppProvider>
                    <ErrorBoundary>
                        <AppInner />
                    </ErrorBoundary>
                </AppProvider>
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    );
};

export default App;
