import React from "react";
import { useGlobalContext } from "../context";
import { ModalContainer, CloseIcon } from "../CatsModal/CatsModal.styled";
import { ImageWrapper, Modal, Buttons } from "./FavoritesModal.styled";
import { HiOutlineX } from "react-icons/hi";
import { motion } from "framer-motion";

const FavoritesModal = () => {
  const {
    state: { favoriteId, favoritesList },
    handleRemoveFromFavorites,
    handleCloseFavoriteModal,
  } = useGlobalContext();

  const selected = favoritesList.find((item) => item.id === favoriteId);

  return (
    <ModalContainer>
      <Modal
        as={motion.div}
        initial={{ opacity: 0, y: -1000 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ y: -1000 }}
      >
        <CloseIcon onClick={handleCloseFavoriteModal}>
          <HiOutlineX />
        </CloseIcon>
        <Buttons>
          <button onClick={handleRemoveFromFavorites}>Remove</button>
        </Buttons>
        <ImageWrapper>
          <img src={selected?.url} alt="" />
        </ImageWrapper>
      </Modal>
    </ModalContainer>
  );
};

export default FavoritesModal;
