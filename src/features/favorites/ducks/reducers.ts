import { combineReducers } from 'redux';
import update from 'immutability-helper';

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
      return update(state, {
        status: { $set: CONSTANTS.RESPONSE_STATUS.PENDING },
      });
    }

    case ActionNames.FETCH_FAVORITES_SUCCEDED: {
      return update(state, {
        data: { $set: action.payload.data },
        status: { $set: CONSTANTS.RESPONSE_STATUS.SUCCESS },
      });
    }

    case ActionNames.FETCH_FAVORITES_FAILED: {
      return update(state, {
        status: { $set: CONSTANTS.RESPONSE_STATUS.FAILURE },
      });
    }

    case ActionNames.DELETE_FAVORITE_REQUESTED: {
      return update(state, {
        delete: { status: { $set: CONSTANTS.RESPONSE_STATUS.PENDING } },
      });
    }

    case ActionNames.DELETE_FAVORITE_SUCCEDED: {
      return update(state, {
        delete: { status: { $set: CONSTANTS.RESPONSE_STATUS.SUCCESS } },
      });
    }

    case ActionNames.DELETE_FAVORITE_FAILED: {
      return update(state, {
        delete: { status: { $set: CONSTANTS.RESPONSE_STATUS.FAILURE } },
      });
    }

    default:
      return state;
  }
}

const FavoritesReducer = combineReducers({
  favorites: FavoritesDataReducer,
});

export default FavoritesReducer;
