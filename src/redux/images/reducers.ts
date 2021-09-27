import { combineReducers } from "redux";
import { GetImagesActionType, ImagesDefaultState } from "./types";
import * as actionTypes from "./actionTypes";
import { getFailureState, getLoadingState, getSuccessState } from "utils/redux";

const imagesDefaultState: ImagesDefaultState = {
  loading: false,
  error: "",
  hasError: false,
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
        ...getSuccessState(),
      };
    case actionTypes.IMAGES_FAILURE:
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
