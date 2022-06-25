import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { CommonActionCreators } from 'common/ducks';

/**
 * Higher order function to provide common functionality when making
 * API calls. It is called from a saga effect;
 *
 * .i.e
 * ```js
 *  yield takeLatest(ActionNames, composeWithCommons(handler))
 * ```
 *
 * Saga will call the composeWithCommons with the dispatched action
 * ```
 *  composeWithCommons(handler)(action)
 * ```
 *
 * - Dispatches loading actions
 * - Handles 500 errors
 *
 * @param generator
 * @param configuration - ```{ withLoader: boolean }``` An object for configuring the common behavior of the saga
 */
function composeWithCommons(generator: any, { withLoader = true } = {}) {
  return function* (action: any) {
    try {
      if (withLoader) {
        yield put(CommonActionCreators.uiLoadingStarted());
      }

      yield call(generator, { action });
    } catch (error: any) {
      if (error.response?.status === 500) {
        yield call(
          toast.error,
          error?.response?.data?.message ?? 'Something went wrong!'
        );
      }
    } finally {
      if (withLoader) {
        yield put(CommonActionCreators.uiLoadingFinished());
      }
    }
  };
}

export { composeWithCommons };
