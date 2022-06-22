import ActionNames from './actionNames';
import { IFavorite } from '../types';

function getFavorites({ page, limit }: { page: number; limit: number }) {
  return {
    type: ActionNames.FETCH_FAVORITES_REQUESTED,
    payload: {
      page,
      limit,
    },
  } as const;
}

function favoritesSucceeded({ data }: { data: IFavorite[] }) {
  return {
    type: ActionNames.FETCH_FAVORITES_SUCCEDED,
    payload: {
      data,
    },
  } as const;
}

function favoritesFailed() {
  return {
    type: ActionNames.FETCH_FAVORITES_FAILED,
    payload: {},
  } as const;
}

function deleteFavorite(id: string) {
  return {
    type: ActionNames.DELETE_FAVORITE_REQUESTED,
    payload: {
      favoriteId: id,
    },
  } as const;
}

function deleteFavoriteSucceeded() {
  return {
    type: ActionNames.DELETE_FAVORITE_SUCCEDED,
    payload: {},
  } as const;
}

function deleteFavoriteFailed() {
  return {
    type: ActionNames.DELETE_FAVORITE_FAILED,
    payload: {},
  } as const;
}

export default {
  getFavorites,
  favoritesSucceeded,
  favoritesFailed,
  deleteFavorite,
  deleteFavoriteSucceeded,
  deleteFavoriteFailed,
};
