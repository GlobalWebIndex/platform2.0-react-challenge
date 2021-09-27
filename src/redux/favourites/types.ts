import { DefaultStateType, ErrorPayload } from 'types/app';
import { FavouriteSaveResponseType, FavouriteType } from 'types/favourites';
import * as actionTypes from './actionTypes';

/************************* Favourites *************************/
export type FavouritesLoadingType = {
  type: typeof actionTypes.FAVOURITES_LOADING;
};

export type FavouritesSuccessType = {
  type: typeof actionTypes.FAVOURITES_SUCCESS;
  payload: {
    data: FavouriteType[];
  };
};

export type FavouritesFailureType = {
  type: typeof actionTypes.FAVOURITES_FAILURE;
  payload: ErrorPayload;
};

export type FavouritesActionType = FavouritesLoadingType | FavouritesSuccessType | FavouritesFailureType;

export type FavouritesStateType = DefaultStateType & {
  list: FavouriteType[];
};

/************************* Save Favourite *************************/
export type AddFavouritesLoadingType = {
  type: typeof actionTypes.ADD_FAVOURITES_LOADING;
};

export type AddFavouritesSuccessType = {
  type: typeof actionTypes.ADD_FAVOURITES_SUCCESS;
  payload: {
    data: FavouriteType;
  };
};

export type AddFavouritesFailureType = {
  type: typeof actionTypes.ADD_FAVOURITES_FAILURE;
  payload: ErrorPayload;
};

export type AddFavouritesActionType = AddFavouritesLoadingType | AddFavouritesSuccessType | AddFavouritesFailureType;

/************************* Delete Favourite *************************/
export type DeleteFavouriteLoadingType = {
  type: typeof actionTypes.DELETE_FAVOURITE_LOADING;
};

export type DeleteFavouriteSuccessType = {
  type: typeof actionTypes.DELETE_FAVOURITE_SUCCESS;
  payload: {
    data: FavouriteType[];
  };
};

export type DeleteFavouriteFailureType = {
  type: typeof actionTypes.DELETE_FAVOURITE_FAILURE;
  payload: ErrorPayload;
};

export type DeleteFavouriteActionType =
  | DeleteFavouriteLoadingType
  | DeleteFavouriteSuccessType
  | DeleteFavouriteFailureType;
