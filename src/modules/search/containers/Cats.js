import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import CatGallery from "components/CatGallery";
import Modal from "../components/CatModal";
import {
  fetchCats,
  fetchCatsIfNeeded,
  selectCat,
  selectCatById,
  markAsFavorite
} from "../ducks";

function mapStateToProps(state) {
  const searchState = state.searchReducer;
  return {
    cats: searchState.cats,
    error: searchState.error,
    isLoading: searchState.isLoading,
    selectedCat: searchState.selectedCat
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchCats: () => dispatch(fetchCats()),
    fetchCatsIfNeeded: () => dispatch(fetchCatsIfNeeded()),
    selectCat: cat => {
      const { history } = ownProps;
      history.push({
        search: `?id=${cat.id}`
      });
      dispatch(selectCat(cat));
    },
    selectCatById: id => {
      dispatch(selectCatById(id));
    },
    markAsFavorite: id => {
      dispatch(markAsFavorite(id));
    },
    unselectCat: () => {
      const { history } = ownProps;
      history.push({ search: "" });
      dispatch(selectCat(undefined));
    }
  };
};

function Cats({
  cats,
  fetchCats,
  fetchCatsIfNeeded,
  selectCat,
  selectedCat,
  selectCatById,
  unselectCat,
  isLoading,
  markAsFavorite,
  error,
  location
}) {
  // eslint-disable-next-line
  useEffect(() => fetchCatsIfNeeded(), []);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    if (id) {
      selectCatById(id);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && (
        <div className="error">
          An error has occured, please refresh the page!
        </div>
      )}
      <CatGallery cats={cats} handleClick={selectCat} />
      <Button onClick={fetchCats} className="button">
        More
      </Button>

      <Modal
        show={selectedCat !== undefined}
        cat={selectedCat}
        handleClose={unselectCat}
        markAsFavorite={markAsFavorite}
      />
    </>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cats);
