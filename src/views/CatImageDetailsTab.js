import React from "react";
import {Button, CircularProgress} from "@material-ui/core";
import {Alert, Rating} from "@material-ui/lab";

/**
 * Component for the Cat Image Details Tab. It is included to the 2nd view {@link CatImageModal}.
 * It contains an image with a button in order to be saved as 'favourite'.
 * Also the breed details are displayed if these are available.
 */
const CatImageDetailsTab = ({
    catImage,
    classes,
    submitFavouriteCat,
    match,
    error,
    favouriteCat,
    isLoading
}) => (
    <React.Fragment>
        {isLoading.catImage && <div className={classes.loader}><CircularProgress /></div>}
        <img id={catImage.id}
             src={catImage.url}
             alt={catImage.url}
             height={250}
             width={300}
             className={classes.marginImg}
        /><br/>
        <Button variant="contained"
                color="primary"
                className={classes.btnLoadCats}
                onClick={() => submitFavouriteCat(match.params.id)}>
            FAVOURITE
        </Button>
        {favouriteCat.id && <Alert severity="success">Cat saved to Favourites!</Alert>}
        {(error.favouriteCat || error.catImage) && <Alert severity="error">{error.favouriteCat || error.catImage}</Alert>}
        {catImage.breeds && catImage.breeds.map(breed =>
            <p key={breed.id}>
                <b>Name: </b>{breed.name}<br/>
                <b>Origin: </b>{breed.origin}<br/>
                <b>Country code: </b>{breed.country_code}<br/>
                <b>Description: </b>{breed.description}<br/>
                <b>Temperament: </b>{breed.temperament}<br/>
                <b>Weight: </b>{breed.weight && breed.weight.imperial}<br/>
                <b>Metric: </b>{breed.weight && breed.weight.metric}<br/>
                <b>Life span: </b>{breed.life_span}<br/>
                <b>Cfa: </b> <a href={breed.cfa_url} target="_blank" rel="noreferrer">{breed.cfa_url}</a><br/>
                <b>Vet street: </b><a href={breed.vetstreet_url} target="_blank" rel="noreferrer">{breed.vetstreet_url}</a><br/>
                <b>Vca hospitals: </b><a href={breed.vcahospitals_url} target="_blank" rel="noreferrer">{breed.vcahospitals_url}</a><br/>
                <b>Wikipedia: </b><a href={breed.vcahospitals_url} target="_blank" rel="noreferrer">{breed.wikipedia_url}</a><br/>
                <div className={classes.rating}><b>Adaptability: </b><Rating value={breed.adaptability} size="small"/></div>
                <div className={classes.rating}><b>Dog Friendly: </b><Rating value={breed.dog_friendly} size="small"/></div>
                <div className={classes.rating}><b>Energy Level: </b><Rating value={breed.energy_level} size="small"/></div><br/>
                <a href={`/breeds/${breed.id}`} target="_blank" rel="noreferrer">Show {breed.name} images</a>
            </p>
        )}
    </React.Fragment>
);

export default CatImageDetailsTab;