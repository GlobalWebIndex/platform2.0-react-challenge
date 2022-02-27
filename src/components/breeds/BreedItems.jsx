import React from "react";
import PropTypes from "prop-types";
import CardsWrapper from "../cards/CardsWrapper";

const BreedItems = ({ items = [] }) => {
  if (!items.length) {
    return null;
  }

  return (
    <CardsWrapper
      cardItems={items.map((breed) => {
        return {
          id: breed.id,
          imageSrc: breed?.image?.url,
          imageWidth: breed?.image?.width,
          imageHeight: breed?.image?.height,
          title: breed.name,
          cardLink: `/breed/${breed.id}`,
        };
      })}
    />
  );
};

BreedItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      image: PropTypes.shape({
        url: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
      }),
    })
  ),
};

export default BreedItems;
