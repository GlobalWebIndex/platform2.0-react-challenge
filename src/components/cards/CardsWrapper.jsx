import React from "react";
import PropTypes from "prop-types";
import { useStyles } from "./CardsWrapper.style";
import Card from "./Card";

function CardsWrapper({ cardItems }) {
  const classes = useStyles();
  return (
    <section className={classes.gridContainer}>
      {cardItems.map((item) => (
        <Card
          key={item.id}
          imageSrc={item?.imageSrc || null}
          imageWidth={item?.imageWidth || null}
          imageHeight={item?.imageHeight || null}
          id={item.id}
          title={item.title}
          cardLink={item.cardLink}
          isInGrid={true}
        />
      ))}
    </section>
  );
}

CardsWrapper.propTypes = {
  cardItems: PropTypes.array,
};

export default CardsWrapper;
