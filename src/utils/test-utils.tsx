import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { AppProvider } from '../context/appContext';
import theme from '../styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
    const queryClient = new QueryClient();
    return (
        <ThemeProvider theme={theme}>
            <AppProvider>
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            </AppProvider>
        </ThemeProvider>
    );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
