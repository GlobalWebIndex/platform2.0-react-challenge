import { put, call } from 'redux-saga/effects';

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
 * - Displays notifications
 * - Handles 500 errors
 *
 * @param generator
 * @param configuration - ```{ withLoader: boolean }``` An object for configuring the common behavior of the saga
 */
function composeWithCommons(
  generator: { context: unknown; fn: (this: unknown, ...args: any[]) => any },
  { withLoader = true } = {}
) {
  return function* (action: any) {
    try {
      if (withLoader) {
        yield put(CommonActionCreators.uiLoadingStarted());
      }

      yield call(generator, { action });
    } catch (error: any) {
      if (error.response?.status === 500) {
        yield put(
          CommonActionCreators.setNotificationMessage(
            error.response?.data,
            'error'
          )
        );
      } else {
        yield put(
          CommonActionCreators.setNotificationMessage(
            error.response?.data,
            'error'
          )
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
