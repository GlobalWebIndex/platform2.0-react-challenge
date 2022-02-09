import React from "react";
import Breeds from "../Breeds/Breeds";
import { useGlobalContext } from "../context";
import BreedsModal from "../BreedsModal/BreedsModal";
import { AnimatePresence } from "framer-motion";

const BreedsView = () => {
  const {
    state: { showBreedsModal },
  } = useGlobalContext();

  return (
    <>
      <Breeds />
      <AnimatePresence>{showBreedsModal && <BreedsModal />}</AnimatePresence>
    </>
  );
};

export default BreedsView;
