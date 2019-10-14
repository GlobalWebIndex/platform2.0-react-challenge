import { call, put, takeEvery } from 'redux-saga/effects';
import Cats from '../api';
import * as actions from './actions';

function* fetchCats(action) {
  try {
    const response = yield call(Cats.getCats, action.params);
    if (response && response.status === 200) {
      yield put({ type: actions.FETCH_CATS_SUCCESS, cats: response.data });
    }
  } catch (error) {
    yield put({ type: actions.FETCH_CATS_FAIL, error });
  }
}

function* fetchBreeds() {
  try {
    const response = yield call(Cats.getBreeds);
    if (response && response.status === 200) {
      yield put({ type: actions.FETCH_BREEDS_SUCCESS, breeds: response.data });
    }
  } catch (error) {
    yield put({ type: actions.FETCH_BREEDS_FAIL, error });
  }
}

function* getFavourites() {
  try {
    const response = yield call(Cats.getFavourites);
    if (response && response.status === 200) {
      yield put({
        type: actions.GET_FAVOURITES_SUCCESS,
        favourites: response.data,
      });
    }
  } catch (error) {
    yield put({ type: actions.GET_FAVOURITES_FAIL, error });
  }
}

function* saveFavourite(action) {
  try {
    const response = yield call(Cats.saveFavourite, action.imageId);
    if (response && response.status === 200) {
      const favourite = {
        id: response.data.id,
        image: { id: action.imageId, url: action.imageUrl },
      };
      yield put({
        type: actions.SAVE_FAVOURITE_SUCCESS,
        favourite,
      });
    }
  } catch (error) {
    yield put({ type: actions.SAVE_FAVOURITE_FAIL, error });
  }
}

function* deleteFavourite(action) {
  try {
    const response = yield call(Cats.deleteFavourite, action.favouriteId);
    if (response && response.status === 200) {
      yield put({
        type: actions.DELETE_FAVOURITE_SUCCESS,
        favouriteId: action.favouriteId,
      });
    }
  } catch (error) {
    yield put({ type: actions.DELETE_FAVOURITE_FAIL, error });
  }
}

function* watchFetchCats() {
  yield takeEvery(actions.FETCH_CATS, fetchCats);
}

function* watchFetchBreeds() {
  yield takeEvery(actions.FETCH_BREEDS, fetchBreeds);
}

function* watchGetFavourites() {
  yield takeEvery(actions.GET_FAVOURITES, getFavourites);
}

function* watchSaveFavourite() {
  yield takeEvery(actions.SAVE_FAVOURITE, saveFavourite);
}

function* watchDeleteFavourite() {
  yield takeEvery(actions.DELETE_FAVOURITE, deleteFavourite);
}

export {
  watchFetchCats,
  watchFetchBreeds,
  watchGetFavourites,
  watchSaveFavourite,
  watchDeleteFavourite,
};
