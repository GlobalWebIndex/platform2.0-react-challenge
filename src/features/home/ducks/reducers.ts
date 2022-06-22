import { combineReducers } from 'redux';

import CONSTANTS from 'common/constants';
import ActionNames from 'features/home/ducks/actionNames';

const catsReducerInitialState = {
  data: [],
  details: { data: {}, status: '' },
  status: '',
};
function CatsDataReducer(state = catsReducerInitialState, action: any) {
  switch (action.type) {
    case ActionNames.FETCH_HOME_CATS_REQUESTED: {
      return {
        ...state,
        status: CONSTANTS.RESPONSE_STATUS.PENDING,
      };
    }

    case ActionNames.FETCH_HOME_CATS_SUCCEDED: {
      if (action.payload.page > 0) {
        return {
          ...state,
          data: [...state.data, ...action.payload.data],
          status: CONSTANTS.RESPONSE_STATUS.SUCCESS,
        };
      }

      return {
        ...state,
        data: action.payload.data,
        status: CONSTANTS.RESPONSE_STATUS.SUCCESS,
      };
    }

    case ActionNames.FETCH_HOME_CATS_FAILED: {
      return {
        ...state,
        status: CONSTANTS.RESPONSE_STATUS.FAILURE,
      };
    }

    case ActionNames.FETCH_CAT_INFO_REQUESTED: {
      return {
        ...state,
        details: {
          data: {},
          status: CONSTANTS.RESPONSE_STATUS.PENDING,
        },
      };
    }

    case ActionNames.FETCH_CAT_INFO_SUCCEDED: {
      return {
        ...state,
        details: {
          data: action.payload.data,
          status: CONSTANTS.RESPONSE_STATUS.SUCCESS,
        },
      };
    }

    case ActionNames.FETCH_CAT_INFO_FAILED: {
      return {
        ...state,
        details: {
          ...state.details,
          status: CONSTANTS.RESPONSE_STATUS.FAILURE,
        },
      };
    }

    default:
      return state;
  }
}

const CatsReducer = combineReducers({
  cats: CatsDataReducer,
});

export default CatsReducer;
