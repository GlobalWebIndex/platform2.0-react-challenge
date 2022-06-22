import { call, put, takeLatest } from 'redux-saga/effects';

import Services from 'services';
import { composeWithCommons } from 'common/ducks';
import ActionCreators from 'features/favorites/ducks/actionCreators';
import ActionNames from 'features/favorites/ducks/actionNames';

function* FavoritesWatcher() {
  yield takeLatest(
    ActionNames.FETCH_FAVORITES_REQUESTED,
    composeWithCommons(handleBreeds)
  );
  yield takeLatest(
    ActionNames.DELETE_FAVORITE_REQUESTED,
    composeWithCommons(handleBreedCats)
  );
}

function* handleBreeds({ action }: any): any {
  const { payload } = action;

  try {
    const { limit, page } = payload;

    const response = yield call(Services.Api.Data.get, '/favourites', {
      params: {
        page,
        limit,
      },
    });

    yield put(ActionCreators.favoritesSucceeded({ data: response.data }));
  } catch (error) {
    yield put(ActionCreators.favoritesFailed());
  }
}

function* handleBreedCats({ action }: any): any {
  const { payload } = action;

  try {
    const { favoriteId } = payload;

    yield call(Services.Api.Data.get, `/favourites/${favoriteId}`, {});

    yield put(ActionCreators.deleteFavoriteSucceeded());
  } catch (error) {
    yield put(ActionCreators.deleteFavoriteFailed());
  }
}

export default FavoritesWatcher;
