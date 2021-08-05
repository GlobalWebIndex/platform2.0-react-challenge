import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {AppBar, Modal, Tab, Tabs} from '@material-ui/core';
import {useStyles} from "../styles/styles";
import {submitFavouriteCatAction, getCatImageAction, getCatBreedsAction} from "../actions/actions";
import {
    catImageSelector,
    errorSelector,
    favouriteCatSelector,
    isLoadingSelector,
    catBreedsSelector
} from "../selectors/selectors";
import CatImageDetailsTab from "./CatImageDetailsTab";
import CatBreedsTab from "./CatBreedsTab";

/**
 * Component for the 2nd view.
 * It contains a Modal with 2 Tabs {@link CatImageDetailsTab @link CatBreedsTab}
 */
const CatImageModal = ({
   catImage,
   error,
   isLoading,
   favouriteCat,
   getCatImage,
   getCatBreeds,
   catBreeds,
   submitFavouriteCat,
   match
}) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [page, setPage] = useState(0);

     useEffect(() => {
         getCatImage(match.params.id);
         getCatBreeds(0);
     },[match.params.id, getCatImage, getCatBreeds]);

     return (
         <Modal open className={classes.modal}>
            <div className={classes.modalBodyCatImage}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={(e, val) => setValue(val)}>
                        <Tab label="Breed Details"/>
                        <Tab label="Cat Breeds"/>
                    </Tabs>
                </AppBar>
                {value === 0 && <CatImageDetailsTab
                    catImage={catImage}
                    classes={classes}
                    submitFavouriteCat={submitFavouriteCat}
                    match={match}
                    error={error}
                    favouriteCat={favouriteCat}
                    isLoading={isLoading} />}
                {value === 1 && <CatBreedsTab
                    catBreeds={catBreeds}
                    isLoading={isLoading}
                    classes={classes}
                    getCatBreeds={getCatBreeds}
                    setPage={setPage}
                    page={page}
                    error={error} />}
            </div>
         </Modal>
)};

const mapStateToProps = state => ({
    catImage: catImageSelector(state),
    error: errorSelector(state),
    isLoading: isLoadingSelector(state),
    favouriteCat: favouriteCatSelector(state),
    catBreeds: catBreedsSelector(state)
});

const mapDispatchToProps = dispatch => ({
    getCatImage: image_id => dispatch(getCatImageAction(image_id)),
    getCatBreeds: page => dispatch(getCatBreedsAction(page)),
    submitFavouriteCat: image_id => dispatch(submitFavouriteCatAction(image_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CatImageModal);