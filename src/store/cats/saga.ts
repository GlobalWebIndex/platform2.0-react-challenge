import { PayloadAction } from '@reduxjs/toolkit';
import { CAT_API_KEY, CAT_API_URL } from 'constants/appConfiguration';
import { all, fork, call, put, takeLatest, select } from 'redux-saga/effects';
import { jsonToQueryParameters, request } from 'utils/requests';

import { catSliceActions as actions } from '.';
import { selectBreedId, selectOnlyBreeds } from './selectors';
import {
  CatApiErrorType,
  CatApiOrder,
  CatApiParameters,
  CatApiSize,
  CatApiSuccessType,
  CatImage,
  FavouriteCatImage,
  MarkFavoriteResponse,
} from './types';

/**
 * Cat Api Request/Response handler
 */
export function* getCatImages() {
  if (!CAT_API_KEY) {
    yield put(actions.catApiError(CatApiErrorType.API_TOKEN_EMPTY));
    return;
  }
  const onlyBreeds: boolean = yield select(selectOnlyBreeds);
  const breedId: string = yield select(selectBreedId);

  const queryParameters: CatApiParameters = {
    limit: 10,
    order: CatApiOrder.RANDOM,
    size: CatApiSize.SMALL,
    page: 0,
  };

  if (onlyBreeds && !breedId) {
    queryParameters.has_breeds = 1;
  }

  if (breedId) {
    queryParameters.breed_ids = breedId;
  }

  const requestURL = `${CAT_API_URL}/images/search?${jsonToQueryParameters(
    queryParameters,
  )}`;

  try {
    const catImages: CatImage[] = yield call(request, requestURL, {
      headers: {
        'x-api-key': CAT_API_KEY,
      },
    });
    if (catImages?.length > 0) {
      yield put(actions.catImagesLoaded(catImages));
    } else {
      yield put(actions.catApiError(CatApiErrorType.EMPTY_RESULTS));
    }
  } catch (err: any) {
    if (err.response?.status === 404) {
      yield put(actions.catApiError(CatApiErrorType.NOT_FOUND));
    } else {
      yield put(actions.catApiError(CatApiErrorType.RESPONSE_ERROR));
    }
  }
}

/**
 * Cat Api Request/Response handler
 */
export function* loadFavorites() {
  if (!CAT_API_KEY) {
    yield put(actions.catApiError(CatApiErrorType.API_TOKEN_EMPTY));
    return;
  }

  const requestURL = `${CAT_API_URL}/favourites`;

  try {
    const catImages: FavouriteCatImage[] = yield call(request, requestURL, {
      headers: {
        'x-api-key': CAT_API_KEY,
      },
    });
    if (catImages?.length > 0) {
      yield put(actions.favoritesLoaded(catImages));
    } else {
      yield put(actions.favoritesLoaded([]));
      yield put(actions.catApiError(CatApiErrorType.EMPTY_RESULTS));
    }
  } catch (err: any) {
    if (err.response?.status === 404) {
      yield put(actions.catApiError(CatApiErrorType.NOT_FOUND));
    } else {
      yield put(actions.catApiError(CatApiErrorType.RESPONSE_ERROR));
    }
  }
}

/**
 * Cat Api Request/Response handler
 */
export function* getCatImage(action: PayloadAction<Partial<CatImage>>) {
  if (!CAT_API_KEY) {
    yield put(actions.catApiError(CatApiErrorType.API_TOKEN_EMPTY));
    return;
  }

  const requestURL = `${CAT_API_URL}/images/${action.payload.id}`;

  try {
    const catImage: CatImage = yield call(request, requestURL, {
      headers: {
        'x-api-key': CAT_API_KEY,
      },
    });
    if (catImage) {
      yield put(actions.selectCatImage(catImage));
    } else {
      yield put(actions.catApiError(CatApiErrorType.EMPTY_RESULTS));
    }
  } catch (err: any) {
    if (err.response?.status === 404) {
      yield put(actions.catApiError(CatApiErrorType.NOT_FOUND));
    } else {
      yield put(actions.catApiError(CatApiErrorType.RESPONSE_ERROR));
    }
  }
}

/**
 * Cat Api Request/Response handler
 */
export function* setFavorite(action: PayloadAction<Partial<CatImage>>) {
  if (!CAT_API_KEY) {
    yield put(actions.catApiError(CatApiErrorType.API_TOKEN_EMPTY));
    return;
  }

  const requestURL = `${CAT_API_URL}/favourites`;

  try {
    const apiResponse: MarkFavoriteResponse = yield call(request, requestURL, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CAT_API_KEY,
      },
      method: 'POST',
      body: JSON.stringify({ image_id: action.payload.id }),
    });

    if (apiResponse.message === 'SUCCESS') {
      yield put(actions.catApiSuccess(CatApiSuccessType.CAT_ADDED));
    } else {
      yield put(actions.catApiError(CatApiErrorType.RESPONSE_ERROR));
    }
  } catch (err: any) {
    if (err.response?.status === 404) {
      yield put(actions.catApiError(CatApiErrorType.NOT_FOUND));
    } else {
      yield put(actions.catApiError(CatApiErrorType.RESPONSE_ERROR));
    }
  }
}

/**
 * Cat Api Request/Response handler
 */
export function* deleteFavorite(action: PayloadAction<Partial<CatImage>>) {
  if (!CAT_API_KEY) {
    yield put(actions.catApiError(CatApiErrorType.API_TOKEN_EMPTY));
    return;
  }

  const requestURL = `${CAT_API_URL}/favourites/${action.payload.id}`;

  try {
    const apiResponse: MarkFavoriteResponse = yield call(request, requestURL, {
      headers: {
        'x-api-key': CAT_API_KEY,
      },
      method: 'DELETE',
    });
    if (apiResponse.message === 'SUCCESS') {
      yield put(actions.catApiSuccess(CatApiSuccessType.CAT_REMOVED));
      yield call(loadFavorites);
    } else {
      yield put(actions.catApiError(CatApiErrorType.RESPONSE_ERROR));
    }
  } catch (err: any) {
    if (err.response?.status === 404) {
      yield put(actions.catApiError(CatApiErrorType.NOT_FOUND));
    } else {
      yield put(actions.catApiError(CatApiErrorType.RESPONSE_ERROR));
    }
  }
}

export function* loadImagesSaga() {
  yield takeLatest(actions.loadCatImages.type, getCatImages);
}

export function* loadImageSaga() {
  yield takeLatest(actions.loadCatImage.type, getCatImage);
}

export function* setFavoriteSaga() {
  yield takeLatest(actions.setFavoriteCat.type, setFavorite);
}

export function* deleteFavoriteSaga() {
  yield takeLatest(actions.deleteFavoriteCat.type, deleteFavorite);
}

export function* loadFavoritesSaga() {
  yield takeLatest(actions.loadFavorites.type, loadFavorites);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* catSliceSaga() {
  yield all([
    fork(loadImageSaga),
    fork(loadImagesSaga),
    fork(loadFavoritesSaga),
    fork(setFavoriteSaga),
    fork(deleteFavoriteSaga),
  ]);
}
