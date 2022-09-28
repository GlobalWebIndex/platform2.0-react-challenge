import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useStyles } from "./Card.style";
import CardContents from "./CardContents";
import PropTypes from "prop-types";

const Card = ({ cardLink, isInGrid = false, ...restProps }) => {
  let classes = useStyles({ isInGrid });
  const location = useLocation();

  return cardLink ? (
    <Link
      className={classes.cardItem}
      to={cardLink}
      state={{ backgroundLocation: location }}
    >
      <CardContents {...restProps} />
    </Link>
  ) : (
    <div className={classes.cardItem}>
      <CardContents {...restProps} />
    </div>
  );
};

Card.propTypes = {
  imageSrc: PropTypes.string,
  imageHeight: PropTypes.number,
  imageWidth: PropTypes.number,
  id: PropTypes.string,
  title: PropTypes.string,
};

export default Card;
