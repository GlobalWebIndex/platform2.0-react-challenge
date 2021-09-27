import { combineReducers } from 'redux';
import { getFailureState, getLoadingState, getSuccessState } from 'utils/redux';
import * as actionTypes from './actionTypes';
import { BreedsActionType, BreeedsStateType } from './types';

const breedsDefaultState: BreeedsStateType = {
  loading: false,
  hasError: false,
  error: '',
  list: [],
};

const all = (state = breedsDefaultState, action: BreedsActionType) => {
  switch (action.type) {
    case actionTypes.BREEDS_LOADING:
      return {
        ...state,
        ...getLoadingState(),
      };
    case actionTypes.BREEDS_SUCCESS:
      return {
        ...state,
        ...getSuccessState(),
        list: action.payload.data,
      };
    case actionTypes.BREEDS_FAILURE:
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
