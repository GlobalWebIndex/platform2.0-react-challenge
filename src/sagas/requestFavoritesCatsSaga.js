import { put, call } from 'redux-saga/effects';
import { requestData } from '../RestClient/restClient';
import { setFavoritesCatsAction } from '../actions/catLoversActions';
import { blockUIAction, unblockUIAction } from '../widgets/Loader/actions';

/**
 * Saga for requesting favorite cats
 * {@link REQUEST_FAVORITES}
 * {@link requestFavoritesAction}
 */
export default function* () {
  yield put(blockUIAction());
  const favoriteCatsResponse = yield call(
      requestData,
      '/favourites'
  );
  yield put(unblockUIAction());
  yield put(setFavoritesCatsAction(favoriteCatsResponse));
}