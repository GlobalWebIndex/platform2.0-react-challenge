import { CAT_API_KEY, CAT_API_URL } from 'constants/appConfiguration';
import { call, put, takeLatest } from 'redux-saga/effects';
import { CatApiErrorType } from 'store/cats/types';
import { request } from 'utils/requests';

import { catSliceActions as actions } from '.';
import { Breed } from './types';

/**
 * Cat Api Request/Response handler
 */
export function* getBreeds() {
  if (!CAT_API_KEY) {
    yield put(actions.breedsApiError(CatApiErrorType.API_TOKEN_EMPTY));
    return;
  }
  const requestURL = `${CAT_API_URL}/breeds`;

  try {
    const breeds: Breed[] = yield call(request, requestURL, {
      headers: {
        'x-api-key': CAT_API_KEY,
      },
    });
    if (breeds?.length > 0) {
      yield put(actions.breedsLoaded(breeds));
    } else {
      yield put(actions.breedsApiError(CatApiErrorType.EMPTY_RESULTS));
    }
  } catch (err: any) {
    if (err.response?.status === 404) {
      yield put(actions.breedsApiError(CatApiErrorType.NOT_FOUND));
    } else {
      yield put(actions.breedsApiError(CatApiErrorType.RESPONSE_ERROR));
    }
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export function* BreedsSliceSaga() {
  yield takeLatest(actions.loadBreeds.type, getBreeds);
}
