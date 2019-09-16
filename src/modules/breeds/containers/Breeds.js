import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Badge } from "react-bootstrap";

import CatListModal from "../components/CatListModal";
import { fetchBreeds, fetchBreedsIfNeeded, selectBreed } from "../ducks";

function mapStateToProps(state) {
  const breedState = state.breedsReducer;
  const { breeds, error, isLoading, selectedBreedId } = breedState;
  return {
    breeds,
    error,
    isLoading,
    selectedBreed: breeds.find(breed => breed.id === selectedBreedId),
    cats: breedState.cats.map(cat => ({ ...cat, src: cat.url }))
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchBreeds: () => dispatch(fetchBreeds()),
    fetchBreedsIfNeeded: () => dispatch(fetchBreedsIfNeeded()),
    selectBreed: breed => dispatch(selectBreed(breed)),
    unselectBreed: () => {
      dispatch(selectBreed(undefined));
    },
    selectCat: cat => {
      const { history } = ownProps;
      history.push(`/?id=${cat.id}`);
    }
  };
};

function Breeds({
  cats,
  breeds,
  fetchBreeds,
  fetchBreedsIfNeeded,
  selectBreed,
  selectedBreed,
  unselectBreed,
  selectCat,
  isLoading,
  error
}) {
  // eslint-disable-next-line
  useEffect(() => fetchBreedsIfNeeded(), []);

  return (
    <Fragment>
      {isLoading && <div>Loading....</div>}
      {error && (
        <div className="error">
          An error has occured, please refresh the page!
        </div>
      )}
      {breeds.map(breed => (
        <Badge
          key={breed.id}
          className="breed"
          pill
          variant="light"
          onClick={() => selectBreed(breed.id)}
        >
          {breed.name}
        </Badge>
      ))}

      <CatListModal 
        show={selectedBreed !== undefined}
        breed={selectedBreed}
        cats={cats}
        isLoading={isLoading}
        handleClose={unselectBreed}
        handleClick={selectCat}
      />
    </Fragment>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Breeds);
