import React, { useEffect, useState } from "react";
import Router from "./Router/Router";
import { Grid } from "@mui/material";

import { CatContext } from "./Context/CatContext";
import TopBar from "./components/TopBar/TopBar";
import { Breed, Cat, Favourite } from "./types/types";
import { getBreedsList, getFavoriteCats, getRandomCats } from "./api/api";
import "./App.css";

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [randomCats, setRandomCats] = useState<Cat[]>([]);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);

  useEffect(() => {
    const getInitData = async () => {
      setLoading(true);

      const breeds = await getBreedsList();
      const favourites = await getFavoriteCats();
      const cats = await getRandomCats(1);

      setRandomCats(cats);
      setBreeds(breeds);
      setFavourites(favourites);

      setLoading(false);
    };

    getInitData();
  }, []);

  return (
    <CatContext.Provider
      value={{
        breeds,
        favourites,
        loading,
        randomCats,
        selectedBreed,
        selectedCat,
        setFavourites,
        setLoading,
        setRandomCats,
        setSelectedBreed,
        setSelectedCat,
      }}
    >
      <Grid container p={3}>
        <TopBar />
        <Grid
          alignItems="center"
          container
          item
          justifyContent="center"
          mt={3}
          sx={{ height: "80vh" }}
          xs={12}
        >
          <Router />
        </Grid>
      </Grid>
    </CatContext.Provider>
  );
};

export default App;
