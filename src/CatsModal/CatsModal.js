import React, { useRef } from "react";
import { useGlobalContext } from "../context";
import { HiClipboardCopy, HiOutlineStar, HiOutlineX } from "react-icons/hi";
import {
  ModalContainer,
  Modal,
  ImageWrapper,
  Content,
  BreedsContainer,
  ButtonsContainer,
  CloseIcon,
  InfoItem,
  InfoDiv,
} from "./CatsModal.styled";
import { motion } from "framer-motion";

const CatsModal = () => {
  const {
    state: { selected, suggestedList },

    handleCloseCatsModal,
    handleAddingToFavorites,
    handleBreedClickFromModal,
    handleRefreshSuggestions,
  } = useGlobalContext();

  const urlButton = useRef();
  const favoritesButton = useRef();

  const copy = async (text) => {
    await navigator.clipboard.writeText(text);
    urlButton.current.textContent = "Copied to clipboard";
  };

  return (
    <ModalContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Modal
        as={motion.div}
        initial={{ opacity: 0, y: -1000 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ y: -1000 }}
      >
        <CloseIcon onClick={handleCloseCatsModal}>
          <HiOutlineX />
        </CloseIcon>
        <ImageWrapper>
          <img src={selected.url} alt="" />
        </ImageWrapper>
        <Content>
          <InfoDiv>
            {selected.breeds.length > 0 ? (
              <div>
                <h5>{selected.breeds[0].name}</h5>
                {Object.entries(selected.breeds[0])
                  .filter((item) => {
                    return (
                      item[0] === "adaptability" ||
                      item[0] === "intelligence" ||
                      item[0] === "energy_level" ||
                      item[0] === "dog_friendly"
                    );
                  })
                  .map((item, index) => (
                    <InfoItem key={index}>
                      <span>{item[0].replace("_", " ")}</span>
                      <span>{item[1]}</span>
                    </InfoItem>
                  ))}
              </div>
            ) : (
              <h5>Sorry, no info available for this one</h5>
            )}
          </InfoDiv>
          <BreedsContainer>
            <p>You might also want to check the breeds below</p>
            <div>
              {suggestedList.map((item, index) => {
                return (
                  <span
                    key={index}
                    onClick={() => handleBreedClickFromModal(item.id)}
                  >
                    {item.name}
                  </span>
                );
              })}
            </div>
            <button onClick={handleRefreshSuggestions}>
              refresh suggestions
            </button>
          </BreedsContainer>
          <ButtonsContainer>
            <button onClick={() => copy(selected.url)} ref={urlButton}>
              Copy URL
              <span>
                <HiClipboardCopy />
              </span>
            </button>
            <button
              onClick={() => handleAddingToFavorites(favoritesButton)}
              ref={favoritesButton}
            >
              Add to favorites
              <span>
                <HiOutlineStar />
              </span>
            </button>
          </ButtonsContainer>
        </Content>
      </Modal>
    </ModalContainer>
  );
};

export default CatsModal;
