import { all } from 'redux-saga/effects';

import favoritesWatcher from './favorites';

// Entry point to start all the Sagas
function* rootSaga() {
  yield all([favoritesWatcher()]);
}

export default rootSaga;
