import { all } from 'redux-saga/effects';

import { HomeCatsSagas } from 'features/home/ducks';

export default function* rootSagas() {
  yield all([HomeCatsSagas()]);
}
