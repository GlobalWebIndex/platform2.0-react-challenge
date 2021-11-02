import { all } from 'redux-saga/effects';
import catLoversWatchers from '../../sagas/catLoversWatchers';

/**
 * Root saga of the application.
 * It aggregates multiple sagas to a single entry point for the sagaMiddleware to run.
 *
 * @see https://redux-saga.js.org/docs/advanced/RootSaga.html
 */
export default function* rootSaga() {
  try {
    const watchers = [
      ...catLoversWatchers
    ];

    yield all(watchers);
  } catch (error) {
    // Error handling here
  }
}
