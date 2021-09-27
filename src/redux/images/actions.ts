import { Dispatch } from "redux";
import axios from "services/axios";
import * as actionTypes from "./actionTypes";
import { GetImagesActionType } from "./types";

export const getCats = () => (dispatch: Dispatch<GetImagesActionType>) => {
  dispatch({
    type: actionTypes.IMAGES_LOADING,
  });

  return axios
    .get("images/search", {
      params: {
        limit: 10,
      },
    })
    .then((resp) =>
      dispatch({
        type: actionTypes.IMAGES_SUCCESS,
        payload: { data: resp.data },
      })
    )
    .catch((error) =>
      dispatch({
        type: actionTypes.IMAGES_FAILURE,
        payload: error,
      })
    );
};
