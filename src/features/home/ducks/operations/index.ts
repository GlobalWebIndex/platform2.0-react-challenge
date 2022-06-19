import { all } from 'redux-saga/effects';

import homeCatsWatcher from './homeCats';

// Entry point to start all the Sagas
function* rootSaga() {
  yield all([homeCatsWatcher()]);
}

export default rootSaga;
