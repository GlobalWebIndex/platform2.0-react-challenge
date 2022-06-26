import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import Services from 'services';
import Constants from 'common/constants';
import { composeWithCommons } from 'common/ducks';
import ActionCreators from 'features/favorites/ducks/actionCreators';
import ActionNames from 'features/favorites/ducks/actionNames';

function* FavoritesWatcher() {
  yield takeLatest(
    ActionNames.FETCH_FAVORITES_REQUESTED,
    composeWithCommons(handleFavorites)
  );
  yield takeLatest(
    ActionNames.DELETE_FAVORITE_REQUESTED,
    composeWithCommons(handleDeleteFavorite)
  );
}

function* handleFavorites({ action }: any): any {
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
  } catch (error: any) {
    yield put(ActionCreators.favoritesFailed());

    yield call(
      toast.error,
      error?.response?.data?.message ?? 'Fetch favorites failed!'
    );
  }
}

function* handleDeleteFavorite({ action }: any): any {
  const { payload } = action;

  try {
    const { favoriteId } = payload;

    yield call(Services.Api.Data.delete, `/favourites/${favoriteId}`, {});

    yield put(ActionCreators.deleteFavoriteSucceeded());
    yield put(
      ActionCreators.getFavorites({
        page: Constants.PAGINATION.PAGE,
        limit: Constants.PAGINATION.LIMIT,
      })
    );

    yield call(toast.success, 'Favorite cat deleted successfully!');
  } catch (error: any) {
    yield put(ActionCreators.deleteFavoriteFailed());

    yield call(
      toast.error,
      error?.response?.data?.message ?? 'Delete favorite failed!'
    );
  }
}

export default FavoritesWatcher;
