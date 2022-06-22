import { combineReducers } from 'redux';

import CONSTANTS from 'common/constants';
import ActionNames from 'features/favorites/ducks/actionNames';

const favoritesReducerInitialState = {
  data: [],
  status: '',
  delete: { status: '' },
};
function FavoritesDataReducer(
  state = favoritesReducerInitialState,
  action: any
) {
  switch (action.type) {
    case ActionNames.FETCH_FAVORITES_REQUESTED: {
      return {
        ...state,
        status: CONSTANTS.RESPONSE_STATUS.PENDING,
      };
    }

    case ActionNames.FETCH_FAVORITES_SUCCEDED: {
      return {
        ...state,
        data: action.payload.data,
        status: CONSTANTS.RESPONSE_STATUS.SUCCESS,
      };
    }

    case ActionNames.FETCH_FAVORITES_FAILED: {
      return {
        ...state,
        status: CONSTANTS.RESPONSE_STATUS.FAILURE,
      };
    }

    case ActionNames.DELETE_FAVORITE_REQUESTED: {
      return {
        ...state,
        delete: { status: CONSTANTS.RESPONSE_STATUS.PENDING },
      };
    }

    case ActionNames.DELETE_FAVORITE_SUCCEDED: {
      return {
        ...state,
        delete: { status: CONSTANTS.RESPONSE_STATUS.SUCCESS },
      };
    }

    case ActionNames.DELETE_FAVORITE_FAILED: {
      return {
        ...state,
        delete: { status: CONSTANTS.RESPONSE_STATUS.FAILURE },
      };
    }

    default:
      return state;
  }
}

const FavoritesReducer = combineReducers({
  favorites: FavoritesDataReducer,
});

export default FavoritesReducer;
