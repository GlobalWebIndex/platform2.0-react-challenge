import { put, call } from 'redux-saga/effects';
import { requestData } from '../RestClient/restClient';
import { setBreedByIdAction, clearByBreedIdAction } from '../actions/catLoversActions';
import { blockUIAction, unblockUIAction } from '../widgets/Loader/actions';

/**
 * Saga for requesting by breed id
 * {@link REQUEST_RANDOM_CATS}
 * {@link requestRandomCatsAction}
 */
export default function* (action) {
  yield put(blockUIAction());
  yield put(clearByBreedIdAction());
  const imagesByBreedResponse = yield call(
      requestData,
      `/images/search?breed_id=${action.payload.breedId}`
  );
  yield put(unblockUIAction());
  yield put(setBreedByIdAction(imagesByBreedResponse));
}