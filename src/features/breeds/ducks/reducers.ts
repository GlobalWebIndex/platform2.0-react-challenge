import { combineReducers } from 'redux';
import update from 'immutability-helper';

import CONSTANTS from 'common/constants';
import ActionNames from 'features/breeds/ducks/actionNames';

const breedsReducerInitialState = {
  data: [],
  status: '',
  cats: [],
};
function BreedsDataReducer(state = breedsReducerInitialState, action: any) {
  switch (action.type) {
    case ActionNames.FETCH_BREEDS_REQUESTED: {
      return update(state, {
        status: { $set: CONSTANTS.RESPONSE_STATUS.PENDING },
      });
    }

    case ActionNames.FETCH_BREEDS_SUCCEDED: {
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

    case ActionNames.FETCH_BREEDS_FAILED: {
      return update(state, {
        status: { $set: CONSTANTS.RESPONSE_STATUS.FAILURE },
      });
    }

    case ActionNames.FETCH_BREED_CATS_REQUESTED: {
      return update(state, {
        cats: { $set: [] },
        status: { $set: CONSTANTS.RESPONSE_STATUS.PENDING },
      });
    }

    case ActionNames.FETCH_BREED_CATS_SUCCEDED: {
      return update(state, {
        cats: { $set: action.payload.data },
        status: { $set: CONSTANTS.RESPONSE_STATUS.SUCCESS },
      });
    }

    case ActionNames.FETCH_BREED_CATS_FAILED: {
      return update(state, {
        status: { $set: CONSTANTS.RESPONSE_STATUS.FAILURE },
      });
    }

    default:
      return state;
  }
}

const BreedsReducer = combineReducers({
  breeds: BreedsDataReducer,
});

export default BreedsReducer;
