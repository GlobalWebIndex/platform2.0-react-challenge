import React from "react";
import {Button, CircularProgress, ImageList, ImageListItem} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

/**
 * Component for the Favourite Images Tab. It is included to the 3rd view {@link BreedImagesModal}.
 * It contains an image list. Each image has a delete button in order to be removed from the list.
 */
const FavouriteImagesTab = ({
    favouriteImages,
    classes,
    isLoading,
    setPage,
    page,
    getFavouriteImages,
    error,
    deleteFavouriteCat
}) => (
    <React.Fragment>
        {(error.deleteFavouriteCat || error.favouriteImages) && <Alert severity="error">{error.deleteFavouriteCat || error.favouriteImages}</Alert>}
        <ImageList cols={4}>
            {favouriteImages.map((favouriteImage, index) => (
                Object.keys(favouriteImage.image).length ?
                    <div key={index} className={classes.imageItem}>
                    <ImageListItem classes={{imgFullHeight: classes.favImage}}>
                        <img id={favouriteImage.image.id}
                             src={favouriteImage.image.url}
                             alt={favouriteImage.image.url}
                        />
                    </ImageListItem>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => deleteFavouriteCat(favouriteImage.id)}
                    >Delete
                    </Button>
                </div> : null
            ))}}
        </ImageList>
        <Button disabled={isLoading.favouriteImages}
                variant="contained"
                color="primary"
                className={classes.btnLoadCats}
                onClick={() => {
                    getFavouriteImages(page + 1);
                    setPage(page + 1);
                }}>
            Load More 10 Cats
        </Button>
        {isLoading.favouriteImages && <CircularProgress />}
    </React.Fragment>
);

export default FavouriteImagesTab;