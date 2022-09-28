import React from "react";
import Header from "../common/Header";
import BreedsList from "./BreedsList";

const BreedsView = () => {
  return (
    <>
      <Header title="All different 🐈 breeds..." />
      <BreedsList />
    </>
  );
};

export default BreedsView;
