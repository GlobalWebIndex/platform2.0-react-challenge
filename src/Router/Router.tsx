import { Route, Routes } from "react-router-dom";

import BreedModal from "../components/BreedModal/BreedModal";
import BreedsPage from "../components/BreedsPage/BreedsPage";
import CatModal from "../components/CatModal/CatModal";
import FavouritesPage from "../components/FavouritesPage/FavouritesPage";
import HomePage from "../components/HomePage/HomePage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/breeds" element={<BreedsPage />} />
      <Route path="/favourites" element={<FavouritesPage />} />
      <Route path="/cats/:catId" element={<CatModal />} />
      <Route path="/breeds/:breedId" element={<BreedModal />} />
    </Routes>
  );
};

export default Router;
