import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import Services from 'services';
import { composeWithCommons } from 'common/ducks';
import ActionCreators from 'features/home/ducks/actionCreators';
import ActionNames from 'features/home/ducks/actionNames';
import FavoriteActionCreators from 'features/favorites/ducks/actionCreators';
import Constants from 'common/constants';

function* homeCatsWatcher() {
  yield takeLatest(
    ActionNames.FETCH_HOME_CATS_REQUESTED,
    composeWithCommons(handleHomeCats)
  );
  yield takeLatest(
    ActionNames.FETCH_CAT_INFO_REQUESTED,
    composeWithCommons(handleGetCatInfo, { withLoader: false })
  );
  yield takeLatest(
    ActionNames.MARK_CAT_FAVORITE_REQUESTED,
    composeWithCommons(handleMarkCatFavorite, { withLoader: false })
  );
}

function* handleHomeCats({ action }: any): any {
  const { payload } = action;

  try {
    const { limit, page } = payload;

    const response = yield call(Services.Api.Data.get, '/images/search', {
      params: {
        page,
        limit,
        mime_types: 'jpg,png',
      },
    });

    yield put(ActionCreators.catsSucceeded({ data: response.data, page }));
  } catch (error: any) {
    yield put(ActionCreators.catsFailed());

    yield call(
      toast.error,
      error?.response?.data?.message ?? 'Fetch cats failed!'
    );
  }
}

function* handleGetCatInfo({ action }: any): any {
  const { payload } = action;

  try {
    const { id } = payload;

    const response = yield call(Services.Api.Data.get, `/images/${id}`, {
      params: {
        mime_types: 'jpg,png',
      },
    });

    yield put(ActionCreators.catByIdSucceeded(response.data));
  } catch (error: any) {
    yield put(ActionCreators.catByIdFailed());

    yield call(
      toast.error,
      error?.response?.data?.message ?? 'Get cat info failed!'
    );
  }
}

function* handleMarkCatFavorite({ action }: any): any {
  const { payload } = action;

  try {
    const { imageId } = payload;

    yield call(Services.Api.Data.post, 'favourites', { image_id: imageId }, {});

    yield put(ActionCreators.markCatFavoriteSucceeded());
    yield put(
      FavoriteActionCreators.getFavorites({
        page: Constants.PAGINATION.PAGE,
        limit: Constants.PAGINATION.LIMIT,
      })
    );

    yield call(toast.success, 'Cat added as favorite!');
  } catch (error: any) {
    yield put(ActionCreators.markCatFavoriteFailed());

    yield call(
      toast.error,
      error?.response?.data?.message ?? 'Mark cat as favorite failed!'
    );
  }
}

export default homeCatsWatcher;
