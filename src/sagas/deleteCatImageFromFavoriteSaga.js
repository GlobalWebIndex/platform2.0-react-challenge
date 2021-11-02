import { put, call } from 'redux-saga/effects';
import submitCommand from '../RestClient/restClient';
import {requestFavoritesAction } from '../actions/catLoversActions';
import {HTTP_METHODS} from "../RestClient/httpConstants";

/**
 * Saga for deleting an image as favorite
 * {@link DELETE_IMAGE_FROM_FAVORITE}
 * {@link deleteCatImageFromFavoriteAction}
 */
export default function* (action) {
  yield call(submitCommand, `/favourites/${action.payload.catImgId}`, {}, HTTP_METHODS.DELETE);
  yield put(requestFavoritesAction());
}
