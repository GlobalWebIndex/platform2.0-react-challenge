import React from "react";
import Cats from "../Cats/Cats";
import CatsModal from "../CatsModal/CatsModal";
import { AnimatePresence } from "framer-motion";
import { useGlobalContext } from "../context";

const CatsView = () => {
  const {
    state: { showCatsModal },
  } = useGlobalContext();
  return (
    <>
      <Cats />
      <AnimatePresence>{showCatsModal && <CatsModal />}</AnimatePresence>
    </>
  );
};

export default CatsView;
