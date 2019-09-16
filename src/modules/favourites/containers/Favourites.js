import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchFavourites, unmarkAsFavorite } from "../ducks";
import CatGallery from "components/CatGallery";

function mapStateToProps(state) {
  const favouriteState = state.favouritesReducer;
  const { favourites, error, isLoading } = favouriteState;
  return {
    error,
    isLoading,
    favourites
  };
}

const mapDispatchToProps = {
  fetchFavourites,
  unmarkAsFavorite
};

function Favourites({
  favourites,
  unmarkAsFavorite,
  fetchFavourites,
  isLoading,
  error
}) {
  // eslint-disable-next-line
  useEffect(() => fetchFavourites(), []);

  return (
    <>
      {isLoading && <div>Loading....</div>}
      {error && (
        <div className="error">
          An error has occured, please refresh the page!
        </div>
      )}
      <CatGallery cats={favourites} handleClick={unmarkAsFavorite} />
    </>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favourites);
