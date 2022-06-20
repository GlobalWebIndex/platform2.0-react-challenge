import { all } from 'redux-saga/effects';

import { HomeCatsSagas } from 'features/home/ducks';
import { BreedsSagas } from 'features/breeds/ducks';

export default function* rootSagas() {
  yield all([HomeCatsSagas(), BreedsSagas()]);
}
