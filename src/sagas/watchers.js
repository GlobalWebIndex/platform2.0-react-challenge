import { takeLatest, all } from 'redux-saga/effects'
import {
    GET_CAT_IMAGES,
    GET_CAT_IMAGE,
    SUBMIT_FAVOURITE_CAT,
    GET_CAT_BREEDS,
    GET_BREED_IMAGES,
    GET_FAVOURITE_IMAGES,
    DELETE_FAVOURITE_CAT
} from "../actions/actions";
import getCatImagesSaga from "./getCatImagesSaga";
import getCatImageSaga from "./getCatImageSaga"
import submitFavouriteCatSaga from "./submitFavouriteCatSaga";
import getCatBreedsSaga from "./getCatBreedsSaga";
import getBreedImagesSaga from "./getBreedImagesSaga";
import getFavouriteImagesSaga from "./getFavouriteImagesSaga";
import deleteFavouriteCatSaga from "./deleteFavouriteCatSaga";

function* watchers() {
    yield all([
        takeLatest(GET_CAT_IMAGES, getCatImagesSaga),
        takeLatest(GET_CAT_IMAGE, getCatImageSaga),
        takeLatest(SUBMIT_FAVOURITE_CAT, submitFavouriteCatSaga),
        takeLatest(GET_CAT_BREEDS, getCatBreedsSaga),
        takeLatest(GET_BREED_IMAGES, getBreedImagesSaga),
        takeLatest(GET_FAVOURITE_IMAGES, getFavouriteImagesSaga),
        takeLatest(DELETE_FAVOURITE_CAT, deleteFavouriteCatSaga)
    ]);
}

export default watchers;