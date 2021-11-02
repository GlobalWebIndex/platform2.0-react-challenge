import { put, call, select } from 'redux-saga/effects';
import { requestData } from '../RestClient/restClient';
import { setRandomCatsAction } from '../actions/catLoversActions';
import { catLoversRandomCatsSelector } from '../selectors/catLoversSelectors';
import { blockUIAction, unblockUIAction } from '../widgets/Loader/actions';

/**
 * Saga for appending random cats
 * {@link APPEND_RANDOM_CATS}
 * {@link appendRandomCatsAction}
 */
export default function* () {
  yield put(blockUIAction());
  const randomCatsInState = yield select(catLoversRandomCatsSelector);
  const randomCatsResponse = yield call(
      requestData,
      '/images/search?limit=10'
  );
  yield put(unblockUIAction());
  const appendedRandomCatsArray = randomCatsInState.concat(randomCatsResponse);
  yield put(setRandomCatsAction(appendedRandomCatsArray));
}
