import { AnimatePresence } from "framer-motion";
import React from "react";
import { useGlobalContext } from "../context";
import Favorites from "../Favorites/Favorites";
import FavoritesModal from "../FavoritesModal/FavoritesModal";

const FavoritesView = () => {
  const {
    state: { showFavoritesModal },
  } = useGlobalContext();

  return (
    <>
      <Favorites />
      <AnimatePresence>
        {showFavoritesModal && <FavoritesModal />}
      </AnimatePresence>
    </>
  );
};

export default FavoritesView;
