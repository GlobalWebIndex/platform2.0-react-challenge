import { combineReducers } from 'redux';
import update from 'immutability-helper';

import CONSTANTS from 'common/constants';
import ActionNames from 'features/home/ducks/actionNames';

const catsReducerInitialState = {
  data: [],
  details: { data: {}, status: '' },
  favorite: { status: '' },
  status: '',
};
function CatsDataReducer(state = catsReducerInitialState, action: any) {
  switch (action.type) {
    case ActionNames.FETCH_HOME_CATS_REQUESTED: {
      return update(state, {
        status: { $set: CONSTANTS.RESPONSE_STATUS.PENDING },
      });
    }

    case ActionNames.FETCH_HOME_CATS_SUCCEDED: {
      if (action.payload.page > 0) {
        return update(state, {
          data: { $push: action.payload.data },
          status: { $set: CONSTANTS.RESPONSE_STATUS.SUCCESS },
        });
      }

      return update(state, {
        data: { $set: action.payload.data },
        status: { $set: CONSTANTS.RESPONSE_STATUS.SUCCESS },
      });
    }

    case ActionNames.FETCH_HOME_CATS_FAILED: {
      return update(state, {
        status: { $set: CONSTANTS.RESPONSE_STATUS.FAILURE },
      });
    }

    case ActionNames.FETCH_CAT_INFO_REQUESTED: {
      return update(state, {
        details: {
          data: { $set: {} },
          status: { $set: CONSTANTS.RESPONSE_STATUS.PENDING },
        },
      });
    }

    case ActionNames.FETCH_CAT_INFO_SUCCEDED: {
      return update(state, {
        details: {
          data: { $set: action.payload.data },
          status: { $set: CONSTANTS.RESPONSE_STATUS.SUCCESS },
        },
      });
    }

    case ActionNames.FETCH_CAT_INFO_FAILED: {
      return update(state, {
        details: {
          $merge: { status: CONSTANTS.RESPONSE_STATUS.FAILURE },
        },
      });
    }

    case ActionNames.MARK_CAT_FAVORITE_REQUESTED: {
      return update(state, {
        favorite: { status: { $set: CONSTANTS.RESPONSE_STATUS.PENDING } },
      });
    }

    case ActionNames.MARK_CAT_FAVORITE_SUCCEDED: {
      return update(state, {
        favorite: { status: { $set: CONSTANTS.RESPONSE_STATUS.SUCCESS } },
      });
    }

    case ActionNames.MARK_CAT_FAVORITE_FAILED: {
      return update(state, {
        favorite: { status: { $set: CONSTANTS.RESPONSE_STATUS.FAILURE } },
      });
    }

    default:
      return state;
  }
}

const CatsReducer = combineReducers({
  cats: CatsDataReducer,
});

export default CatsReducer;
