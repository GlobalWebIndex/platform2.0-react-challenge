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
  yield takeLatest(
    ActionNames.FETCH_BREED_CATS_REQUESTED,
    composeWithCommons(handleBreedCats)
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

function* handleBreedCats({ action }: any): any {
  const { payload } = action;

  try {
    const { breedName } = payload;

    const response = yield call(Services.Api.Data.get, '/images/search', {
      params: {
        breed_ids: breedName,
        limit: 8,
      },
    });

    yield put(ActionCreators.catsByBreedSucceeded(response.data));
  } catch (error) {
    yield put(ActionCreators.catsByBreedFailed());
  }
}

export default homeBreedsWatcher;
