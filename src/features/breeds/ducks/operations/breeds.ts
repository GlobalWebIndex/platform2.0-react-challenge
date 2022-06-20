import { call, put, takeLatest } from 'redux-saga/effects';

import Services from 'services';
import { composeWithCommons } from 'common/ducks';
import ActionCreators from 'features/breeds/ducks/actionCreators';
import ActionNames from 'features/breeds/ducks/actionNames';

function* homeBreedsWatcher() {
  yield takeLatest(
    ActionNames.FETCH_BREEDS_REQUESTED,
    composeWithCommons(handleBreeds)
  );
}

function* handleBreeds({ action }: any): any {
  const { payload } = action;

  try {
    const { limit, page, order = 'desc' } = payload;

    const response = yield call(Services.Api.Data.get, '/breeds', {
      params: {
        page,
        limit,
        order,
      },
    });

    yield put(ActionCreators.breedsSucceeded({ data: response.data }));
  } catch (error) {
    yield put(ActionCreators.breedsFailed());
  }
}

export default homeBreedsWatcher;
