import { combineReducers } from 'redux';
import { GetImagesActionType, ImagesDefaultState } from './types';
import * as actionTypes from './actionTypes';
import { getFailureState, getLoadingState, getSuccessState } from 'utils/redux';
import { PAGINATION_DEFAULT_PAGE } from 'constants/app';

const imagesDefaultState: ImagesDefaultState = {
  loading: false,
  error: '',
  hasError: false,
  page: PAGINATION_DEFAULT_PAGE,
  list: [],
};

const all = (state = imagesDefaultState, action: GetImagesActionType) => {
  switch (action.type) {
    case actionTypes.IMAGES_LOADING:
      return {
        ...state,
        ...getLoadingState(),
      };
    case actionTypes.IMAGES_SUCCESS:
      return {
        list: [...state.list, ...action.payload.data],
        page: state.page + 1,
        ...getSuccessState(),
      };
    case actionTypes.IMAGES_FAILURE:
      return {
        ...state,
        ...getFailureState(action.payload.error),
      };
    case actionTypes.IMAGES_CLEAR:
      return imagesDefaultState;
    default:
      return state;
  }
};

export default combineReducers({
  all,
});
