import { call, put, takeLatest } from 'redux-saga/effects';

import Services from 'services';
import { composeWithCommons } from 'common/ducks';
import ActionCreators from 'features/home/ducks/actionCreators';
import ActionNames from 'features/home/ducks/actionNames';

function* homeCatsWatcher() {
  yield takeLatest(
    ActionNames.FETCH_HOME_CATS_REQUESTED,
    composeWithCommons(handleHomeCats)
  );
  yield takeLatest(
    ActionNames.FETCH_CAT_INFO_REQUESTED,
    composeWithCommons(handleGetCatInfo, { withLoader: false })
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
  } catch (error) {
    yield put(ActionCreators.catsFailed());
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
  } catch (error) {
    yield put(ActionCreators.catByIdFailed());
  }
}

export default homeCatsWatcher;
