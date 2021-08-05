import React from "react";
import {Button, CircularProgress, ImageList, ImageListItem} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

/**
 * Component for the Breed Images Tab. It is included to the 3rd view {@link BreedImagesModal}.
 * It contains an image list. Each image has a button in order to be saved as 'favourite'.
 */
const BreedImagesTab = ({
    breedImages,
    isLoading,
    favouriteCat,
    error,
    classes,
    submitFavouriteCat
}) => (
    <React.Fragment>
        {isLoading.breedImages && <div className={classes.loader}><CircularProgress /></div>}
        {favouriteCat.id && <Alert severity="success">Cat saved to Favourites!</Alert>}
        {(error.favouriteCat || error.breedImages) && <Alert severity="error">{error.favouriteCat || error.breedImages}</Alert>}
        <ImageList cols={4}>
            {breedImages.map((breedImage, index) => (
                <div key={index} className={classes.imageItem}>
                    <ImageListItem classes={{imgFullHeight: classes.favImage}}>
                        <img id={breedImage.id}
                             src={breedImage.url}
                             alt={breedImage.url}
                        />
                    </ImageListItem>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => submitFavouriteCat(breedImage.id)}
                    >Favourite
                    </Button>
                </div>
            ))}}
        </ImageList>
    </React.Fragment>
);

export default BreedImagesTab;