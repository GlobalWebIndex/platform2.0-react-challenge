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
}

function* handleHomeCats({ action }: any): any {
  const { payload } = action;

  try {
    const { limit, page, order = 'desc' } = payload;

    const response = yield call(Services.Api.Data.get, '/images/search', {
      params: {
        page,
        limit,
        order,
        mime_types: 'jpg,png',
      },
    });

    yield put(ActionCreators.catsSucceeded({ data: response.data, page }));
  } catch (error) {
    yield put(ActionCreators.catsFailed());
  }
}

export default homeCatsWatcher;
