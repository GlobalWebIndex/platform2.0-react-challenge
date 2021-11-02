import { put, call } from 'redux-saga/effects';
import { requestData } from '../RestClient/restClient';
import { setBreedsAction } from '../actions/catLoversActions';
import { blockUIAction, unblockUIAction } from '../widgets/Loader/actions';

/**
 * Saga for requesting breeds
 * {@link REQUEST_BREEDS}
 * {@link requestBreedsAction}
 */
export default function* () {
  yield put(blockUIAction());
  const breedsResponse = yield call(
      requestData,
      '/breeds'
  );
  yield put(unblockUIAction());
  yield put(setBreedsAction(breedsResponse));
}
