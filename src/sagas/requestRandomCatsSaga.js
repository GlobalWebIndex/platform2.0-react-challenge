import { put, call } from 'redux-saga/effects';
import { requestData } from '../RestClient/restClient';
import { setRandomCatsAction } from '../actions/catLoversActions';
import { blockUIAction, unblockUIAction } from '../widgets/Loader/actions';

/**
 * Saga for requesting random cats
 * {@link REQUEST_RANDOM_CATS}
 * {@link requestRandomCatsAction}
 */
export default function* () {
  yield put(blockUIAction());
  const randomCatsResponse = yield call(
      requestData,
      '/images/search?limit=10'
  );
  yield put(unblockUIAction());
  yield put(setRandomCatsAction(randomCatsResponse));
}
