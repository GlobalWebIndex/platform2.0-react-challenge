import { all } from 'redux-saga/effects';

import breedsWatcher from './breeds';

// Entry point to start all the Sagas
function* rootSaga() {
  yield all([breedsWatcher()]);
}

export default rootSaga;
