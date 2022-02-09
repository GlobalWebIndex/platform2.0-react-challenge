import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { ModalContainer, Modal, CloseIcon } from "./BreedsModal.styled";
import { HiOutlineX } from "react-icons/hi";
import { motion } from "framer-motion";
import Img from "react-cool-img";
import loadingImage from "../assets/images/loading.gif";
import errorImage from "../assets/images/error.gif";

const BreedsModal = () => {
  const {
    state: { breedId },
    handleBreedImageClick,
    handleBreedModalClose,
  } = useGlobalContext();

  const apiKey = "263165c6-7725-4722-a2ed-b4ab05df4364";
  const url = `https://api.thecatapi.com/v1/images/search/?breed_id=${breedId}&limit=10`;

  const [breedItems, setBreedItems] = useState([]);

  useEffect(() => {
    fetch(url, {
      headers: {
        "x-api-key": apiKey,
      },
    })
      .then((res) => res.json())
      .then((data) => setBreedItems(data));
  }, [breedId, url]);

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
        <CloseIcon onClick={handleBreedModalClose}>
          <HiOutlineX />
        </CloseIcon>
        <h5>{breedItems && breedItems[0]?.breeds[0]?.name}</h5>
        <section>
          {breedItems &&
            breedItems.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleBreedImageClick(item)}
                  initial={{ x: "-100vw" }}
                  animate={{ x: 0 }}
                  transition={{
                    delay: 0.3 * index,
                  }}
                  as={motion.div}
                >
                  <Img
                    src={item.url}
                    alt=""
                    placeholder={loadingImage}
                    error={errorImage}
                  />
                </div>
              );
            })}
        </section>
      </Modal>
    </ModalContainer>
  );
};

export default BreedsModal;
