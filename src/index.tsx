import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import yellow from '@material-ui/core/colors/yellow';

import AppRouter from './router';

import './styles/index.scss';
import reportWebVitals from './reportWebVitals';

// const primaryColor = deepOrange[600];
// const accentColor = deepOrange.A200;
// const darkColor = deepOrange.A700;

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      light: grey[500],
      main: grey[800],
      dark: grey[900],
      contrastText: '#fff',
    },
    secondary: {
      light: yellow[500],
      main: yellow.A400,
      dark: yellow.A700,
      contrastText: '#000',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ThemeProvider theme={theme}>
    <HashRouter>
      <AppRouter />
    </HashRouter>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
