import React from "react";
import PropTypes from "prop-types";
import { useStyles } from "./Card.style";

const CardContents = ({
  imageSrc,
  imageWidth,
  imageHeight,
  id,
  title,
  children,
}) => {
  const classes = useStyles();
  return (
    <>
      {imageSrc && (
        <img
          className={classes.cardImage}
          src={imageSrc}
          alt={`id ${id}`}
          width={imageWidth}
          height={imageHeight}
          loading="lazy"
          data-testid="card-image"
        />
      )}
      {title && (
        <div data-testid="card-title" className={classes.cardTitle}>
          {title}
        </div>
      )}
      {children && <div className={classes.cardChildren}>{children}</div>}
    </>
  );
};

CardContents.propTypes = {
  imageSrc: PropTypes.string,
  imageHeight: PropTypes.number,
  imageWidth: PropTypes.number,
  id: PropTypes.string,
  title: PropTypes.string,
};

export default CardContents;
