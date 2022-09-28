import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

const CatBreeds = (props) => {
  const location = useLocation();
  let breeds = props.breeds;
  if (!breeds?.length) {
    return null;
  }

  return (
    // Intentionally this is a div. We want a 'block-level' element.
    <div>
      <strong>Breeds: </strong>
      {breeds.map((breed) => (
        <Link
          to={`/breed/${breed.id}`}
          state={{ backgroundLocation: location }}
          key={breed.id}
        >
          {breed.name}
        </Link>
      ))}
    </div>
  );
};

CatBreeds.propTypes = {
  breeds: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

export default CatBreeds;
