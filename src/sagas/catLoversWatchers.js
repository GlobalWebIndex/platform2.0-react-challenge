import { takeLatest } from 'redux-saga/effects';
import {
    REQUEST_BREEDS,
    REQUEST_BY_BREED,
    REQUEST_RANDOM_CATS,
    SUBMIT_IMAGE_AS_FAVORITE,
    REQUEST_FAVORITES,
    DELETE_IMAGE_FROM_FAVORITE,
    APPEND_RANDOM_CATS
} from '../common/constants';
import requestRandomCatsSaga from './requestRandomCatsSaga';
import {closeModalSaga, openModalSaga} from '../widgets/Modal/modalSaga';
import { CLOSE_MODAL, OPEN_MODAL } from '../widgets/Modal/modalActions';
import requestBreedsSaga from './requestBreedsSaga';
import requestsByBreedSaga from './requestsByBreedSaga';
import addCatImageAsFavoriteSaga from './addCatImageAsFavoriteSaga';
import requestFavoritesCatsSaga from './requestFavoritesCatsSaga';
import deleteCatImageFromFavoriteSaga from './deleteCatImageFromFavoriteSaga';
import appendToRandomCatsSaga from './appendToRandomCatsSaga';

export default [
    takeLatest(REQUEST_RANDOM_CATS, requestRandomCatsSaga),
    takeLatest(OPEN_MODAL, openModalSaga),
    takeLatest(CLOSE_MODAL, closeModalSaga),
    takeLatest(REQUEST_BREEDS, requestBreedsSaga),
    takeLatest(REQUEST_BY_BREED, requestsByBreedSaga),
    takeLatest(SUBMIT_IMAGE_AS_FAVORITE, addCatImageAsFavoriteSaga),
    takeLatest(REQUEST_FAVORITES, requestFavoritesCatsSaga),
    takeLatest(DELETE_IMAGE_FROM_FAVORITE, deleteCatImageFromFavoriteSaga),
    takeLatest(APPEND_RANDOM_CATS, appendToRandomCatsSaga)
]