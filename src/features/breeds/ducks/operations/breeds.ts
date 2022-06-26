import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

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
    const { limit, page } = payload;

    const response = yield call(Services.Api.Data.get, '/breeds', {
      params: {
        page,
        limit,
      },
    });

    yield put(ActionCreators.breedsSucceeded({ data: response.data, page }));
  } catch (error: any) {
    yield put(ActionCreators.breedsFailed());

    yield call(
      toast.error,
      error?.response?.data?.message ?? 'Fetch breeds failed!'
    );
  }
}

function* handleBreedCats({ action }: any): any {
  const { payload } = action;

  try {
    const { breedName, page, limit } = payload;

    const response = yield call(Services.Api.Data.get, '/images/search', {
      params: {
        breed_ids: breedName,
        page,
        limit,
      },
    });

    yield put(
      ActionCreators.catsByBreedSucceeded({ data: response.data, page })
    );
  } catch (error: any) {
    yield put(ActionCreators.catsByBreedFailed());

    yield call(
      toast.error,
      error?.response?.data?.message ?? 'Fetch cats by breed failed!'
    );
  }
}

export default homeBreedsWatcher;
