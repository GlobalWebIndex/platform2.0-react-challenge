import { combineReducers } from 'redux';

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
      return {
        ...state,
        status: CONSTANTS.RESPONSE_STATUS.PENDING,
      };
    }

    case ActionNames.FETCH_BREEDS_SUCCEDED: {
      return {
        ...state,
        data: action.payload.data,
        status: CONSTANTS.RESPONSE_STATUS.SUCCESS,
      };
    }

    case ActionNames.FETCH_BREEDS_FAILED: {
      return {
        ...state,
        status: CONSTANTS.RESPONSE_STATUS.FAILURE,
      };
    }

    case ActionNames.FETCH_BREED_CATS_REQUESTED: {
      return {
        ...state,
        cats: [],
        status: CONSTANTS.RESPONSE_STATUS.PENDING,
      };
    }

    case ActionNames.FETCH_BREED_CATS_SUCCEDED: {
      return {
        ...state,
        cats: action.payload.data,
        status: CONSTANTS.RESPONSE_STATUS.SUCCESS,
      };
    }

    case ActionNames.FETCH_BREED_CATS_FAILED: {
      return {
        ...state,
        status: CONSTANTS.RESPONSE_STATUS.FAILURE,
      };
    }

    default:
      return state;
  }
}

const BreedsReducer = combineReducers({
  breeds: BreedsDataReducer,
});

export default BreedsReducer;
