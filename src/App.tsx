import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PhotosPageComponent } from './pages/photos/photos.page.component';
import { BreedsPageComponent } from './pages/breeds/breeds.page.component';
import { FavouritesPageComponent } from './pages/favourites/favourites.page.component';
import { CatDetailsComponent } from './pages/photos/cat-details.component'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import NavbarComponent from './common/navbar.component'
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: "#1bb76e",
    },
    secondary: {
      main: '#11cb5f',
    },
    background: {
      paper: "#dfe7f5"
    }
  },
  typography: {
    allVariants: {
      color: 'white'
    }
  }
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ThemeProvider theme={theme}>
          <BrowserRouter >
            <NavbarComponent />
            <Routes>
              <Route path="/" element={<Navigate replace to="/photos" />} />
              <Route path="/photos" element={<PhotosPageComponent />} />
              <Route path="/photos/:id" element={<PhotosPageComponent />} />
              <Route path="/photos/details/:id" element={<CatDetailsComponent />} />
              <Route path="/breeds" element={<BreedsPageComponent />} />
              <Route path="/favourites" element={<FavouritesPageComponent />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </header>
    </div>
  );
}

export default App;