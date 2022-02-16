import React, { useState, FC } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Breeds from "./pages/Breeds/Breeds";
import FavouriteCats from "./pages/FavouriteCats/FavouriteCats";
import NoFoundPage from "./pages/NoFoundPage/NoFoundPage";

const App: FC = () => {
  const [favouriteCatsList, setFavouriteCatsList] = useState([]);

  return (
    <div className="App" data-testid="app-section">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <Home
                  favouriteCatsList={favouriteCatsList}
                  setFavouriteCatsList={setFavouriteCatsList}
                />
              }
            />
            <Route
              path="breeds"
              element={
                <Breeds
                  favouriteCatsList={favouriteCatsList}
                  setFavouriteCatsList={setFavouriteCatsList}
                />
              }
            />
            <Route
              path="favouritecats"
              element={
                <FavouriteCats
                  favouriteCatsList={favouriteCatsList}
                  setFavouriteCatsList={setFavouriteCatsList}
                />
              }
            />
            <Route path="*" element={<NoFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
