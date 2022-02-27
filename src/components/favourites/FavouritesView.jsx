import React from "react";
import Header from "../common/Header";
import FavouritesList from "./FavouritesList";

const FavouritesView = () => {
  return (
    <>
      <Header title="Your favourite 🐈 images..." />
      <FavouritesList />
    </>
  );
};

export default FavouritesView;
