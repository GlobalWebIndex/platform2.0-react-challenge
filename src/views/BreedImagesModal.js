import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {useStyles} from "../styles/styles";
import {Modal, AppBar, Tab, Tabs} from "@material-ui/core";
import {
    breedImagesSelector,
    errorSelector,
    favouriteCatSelector,
    favouriteImagesSelector,
    isLoadingSelector
} from "../selectors/selectors";
import {
    deleteFavouriteCatAction,
    getBreedImagesAction,
    getFavouriteImagesAction,
    submitFavouriteCatAction
} from "../actions/actions";
import BreedImagesTab from "./BreedImagesTab";
import FavouriteImagesTab from "./FavouriteImagesTab";

/**
 * Component for the 3rd view.
 * It contains a Modal with 2 Tabs {@link BreedImagesTab @link FavouriteImagesTab}
 */
const BreedImagesModal = ({
  favouriteCat,
  error,
  getBreedImages,
  getFavouriteImages,
  submitFavouriteCat,
  favouriteImages,
  isLoading,
  deleteFavouriteCat,
  breedImages,
  match }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [page, setPage] = useState(0);

    useEffect(() => {
        getBreedImages(match.params.id);
        getFavouriteImages(0);
    },[match.params.id, getBreedImages, getFavouriteImages]);

    return (
        <Modal open className={classes.modal}>
            <div className={classes.modalBodyBreedImage}>
                <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(e, val) => setValue(val)}>
                    <Tab label="Breed Images"/>
                    <Tab label="My Favourite Images"/>
                </Tabs>
                </AppBar>
                {value === 0 && <BreedImagesTab
                    breedImages={breedImages}
                    isLoading={isLoading}
                    favouriteCat={favouriteCat}
                    error={error}
                    classes={classes}
                    submitFavouriteCat={submitFavouriteCat} />}
                {value === 1 && <FavouriteImagesTab
                    favouriteImages={favouriteImages}
                    classes={classes}
                    isLoading={isLoading}
                    submitFavouriteCat={submitFavouriteCat}
                    setPage={setPage}
                    page={page}
                    getFavouriteImages={getFavouriteImages}
                    error={error}
                    deleteFavouriteCat={deleteFavouriteCat}/>}
            </div>
        </Modal>
)};

const mapStateToProps = state => ({
    breedImages: breedImagesSelector(state),
    error: errorSelector(state),
    isLoading: isLoadingSelector(state),
    favouriteCat: favouriteCatSelector(state),
    favouriteImages: favouriteImagesSelector(state)
});

const mapDispatchToProps = dispatch => ({
    getBreedImages: breed_id => dispatch(getBreedImagesAction(breed_id)),
    getFavouriteImages: page => dispatch(getFavouriteImagesAction(page)),
    submitFavouriteCat: image_id => dispatch(submitFavouriteCatAction(image_id)),
    deleteFavouriteCat: favourite_id => dispatch(deleteFavouriteCatAction(favourite_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(BreedImagesModal);