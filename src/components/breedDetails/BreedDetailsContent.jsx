import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { useStyles } from "./BreedDetailsContent.style";

const BreedDetailsContent = ({ data = [] }) => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <div className={classes.breedDetailsWrapper}>
      <h2 className={classes.breedDetailsHeading}>
        {data[0]?.breeds[0]?.name || ""}
      </h2>
      <div className={classes.breedDetailsImgGrid}>
        {data.map((breedImage) => (
          <Link
            to={`/cat/${breedImage.id}`}
            state={{ backgroundLocation: location }}
            key={breedImage.id}
          >
            <img
              className={classes.breedDetailsImg}
              src={breedImage.url}
              alt={`Breed id: ${breedImage.id}`}
            />
          </Link>
        ))}
      </div>
      <div className={classes.breedDetailsDescription}>
        {data[0]?.breeds[0]?.description}
      </div>
    </div>
  );
};

BreedDetailsContent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      url: PropTypes.string,
      breeds: PropTypes.arrayOf(
        PropTypes.shape({
          description: PropTypes.string,
        })
      ),
    })
  ),
};

export default BreedDetailsContent;
