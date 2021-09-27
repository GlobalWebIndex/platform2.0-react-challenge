import { Dispatch } from 'redux';
import { BreedsActionType } from './types';
import * as actionTypes from './actionTypes';
import axios from 'services/axios';

export const getBreeds = () => (dispatch: Dispatch<BreedsActionType>) => {
  dispatch({
    type: actionTypes.BREEDS_LOADING,
  });

  return axios
    .get('breeds')
    .then((resp) =>
      dispatch({
        type: actionTypes.BREEDS_SUCCESS,
        payload: { data: resp.data },
      }),
    )
    .catch((error) =>
      dispatch({
        type: actionTypes.BREEDS_FAILURE,
        payload: error,
      }),
    );
};
