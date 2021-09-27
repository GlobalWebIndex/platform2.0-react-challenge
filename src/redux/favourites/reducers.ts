import { combineReducers } from 'redux';
import { getFailureState, getLoadingState, getSuccessState } from 'utils/redux';
import * as actionTypes from './actionTypes';
import { AddFavouritesActionType, FavouritesActionType, FavouritesStateType } from './types';

const favouritesDefaultState: FavouritesStateType = {
  loading: false,
  error: '',
  hasError: false,
  list: [],
};

const all = (
  state = favouritesDefaultState,
  action: FavouritesActionType | AddFavouritesActionType,
): FavouritesStateType => {
  switch (action.type) {
    case actionTypes.FAVOURITES_LOADING:
    case actionTypes.ADD_FAVOURITES_LOADING:
      return {
        ...state,
        ...getLoadingState(),
      };
    case actionTypes.FAVOURITES_SUCCESS:
      return {
        ...state,
        ...getSuccessState(),
        list: action.payload.data,
      };
    case actionTypes.ADD_FAVOURITES_SUCCESS:
      return {
        ...state,
        ...getSuccessState(),
        list: [...state.list, action.payload.data],
      };
    case actionTypes.FAVOURITES_FAILURE:
    case actionTypes.ADD_FAVOURITES_FAILURE:
      return {
        ...state,
        ...getFailureState(action.payload.error),
      };
    default:
      return state;
  }
};

export default combineReducers({
  all,
});
