import ActionNames from './actionNames';
import { ICat } from '../types';

function getCats({ page, limit }: { page: number; limit: number }) {
  return {
    type: ActionNames.FETCH_HOME_CATS_REQUESTED,
    payload: {
      page,
      limit,
    },
  } as const;
}

function catsSucceeded({ data, page }: { data: ICat[]; page: number }) {
  return {
    type: ActionNames.FETCH_HOME_CATS_SUCCEDED,
    payload: {
      data,
      page,
    },
  } as const;
}

function catsFailed() {
  return {
    type: ActionNames.FETCH_HOME_CATS_FAILED,
    payload: {},
  } as const;
}

function getCatById(id: number | string) {
  return {
    type: ActionNames.FETCH_CAT_INFO_REQUESTED,
    payload: {
      id,
    },
  } as const;
}

function catByIdSucceeded(data: ICat) {
  return {
    type: ActionNames.FETCH_CAT_INFO_SUCCEDED,
    payload: {
      data,
    },
  } as const;
}

function catByIdFailed() {
  return {
    type: ActionNames.FETCH_CAT_INFO_FAILED,
    payload: {},
  } as const;
}

function markCatFavorite({ imageId }: { imageId: string }) {
  return {
    type: ActionNames.MARK_CAT_FAVORITE_REQUESTED,
    payload: {
      imageId,
    },
  } as const;
}

function markCatFavoriteSucceeded() {
  return {
    type: ActionNames.MARK_CAT_FAVORITE_SUCCEDED,
    payload: {},
  } as const;
}

function markCatFavoriteFailed() {
  return {
    type: ActionNames.MARK_CAT_FAVORITE_FAILED,
    payload: {},
  } as const;
}

export default {
  getCats,
  catsSucceeded,
  catsFailed,

  getCatById,
  catByIdSucceeded,
  catByIdFailed,

  markCatFavorite,
  markCatFavoriteSucceeded,
  markCatFavoriteFailed,
};
