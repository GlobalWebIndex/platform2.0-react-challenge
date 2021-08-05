import React, { useState, useEffect } from "react";
import {connect} from 'react-redux';
import {ImageList, ImageListItem, Button, CircularProgress} from '@material-ui/core';
import {catImagesSelector, isLoadingSelector, errorSelector} from "../selectors/selectors";
import {getCatImagesAction} from "../actions/actions";
import {useStyles} from "../styles/styles";
import {Link} from "react-router-dom";
import {Alert} from "@material-ui/lab";

/**
 * Component for the 1st view.
 * It contains an image list with a button for loading more cat images
 */
const CatImages = ({ catImages, isLoading, getCatImages, error }) => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    useEffect(() => getCatImages(0),[getCatImages]);
    return (
        <React.Fragment>
            <ImageList rowHeight={250} cols={5}>
                {catImages.map((catImage, index) => (
                    <ImageListItem key={index}>
                        <Link to={`/cats/${catImage.id}`} target="_blank">
                            <img src={catImage.url} alt={catImage.url} className={classes.image} />
                        </Link>
                    </ImageListItem>
                ))}
            </ImageList>
            <Button disabled={isLoading.catImages}
                    variant="contained"
                    color="primary"
                    className={classes.btnLoadCats}
                    onClick={() => {
                        getCatImages(page+1);
                        setPage(page + 1)
                    }}>
                Load More 10 Cats
            </Button>
            {error.catImages && <Alert severity="error">{error.catImages}</Alert>}
            {isLoading.catImages && <CircularProgress />}
        </React.Fragment>
    )};

const mapStateToProps = state => ({
    catImages: catImagesSelector(state),
    isLoading: isLoadingSelector(state),
    error: errorSelector(state)
});

const mapDispatchToProps = dispatch => ({
    getCatImages: page => dispatch(getCatImagesAction(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(CatImages);
