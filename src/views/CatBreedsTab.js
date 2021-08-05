import React from "react";
import {Button, CircularProgress, ImageList, ImageListItem} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Alert} from "@material-ui/lab";

/**
 * Component for the Cat Breeds Tab. It is included to the 2nd view {@link CatImageModal}.
 * It contains an image list with a button for loading more breeds images
 */
const CatBreedsTab = ({
  catBreeds,
  isLoading,
  classes,
  getCatBreeds,
  setPage,
  page,
  error
}) => (
    <React.Fragment>
        <ImageList cols={3}>
            {catBreeds.map((catBreed, index) => catBreed.image ?
                <ImageListItem key={index}>
                    <Link to={`/breeds/${catBreed.id}`} target="_blank">
                        <img src={catBreed.image.url} alt={catBreed.image.url} className={classes.image} />
                    </Link>
                </ImageListItem> : null
            )}
        </ImageList>
        <Button disabled={isLoading.catBreeds}
                variant="contained"
                color="primary"
                className={classes.btnLoadCats}
                onClick={() => {
                    getCatBreeds(page+1);
                    setPage(page + 1)
                }}>
            Load More 10 Cats
        </Button>
        {error.catBreeds && <Alert severity="error">{error.catBreeds}</Alert>}
        {isLoading.catBreeds && <CircularProgress />}
    </React.Fragment>
);

export default CatBreedsTab;