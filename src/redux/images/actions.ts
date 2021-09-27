import { Dispatch } from 'redux';
import { RootStateType } from 'redux/rootReducer';
import axios from 'services/axios';
import { ImageRequestType } from 'types/images';
import * as actionTypes from './actionTypes';
import { GetImagesActionType } from './types';

const imagesDefaultRequest: ImageRequestType = {
  order: 'RANDOM',
  limit: 10,
  page: 1,
};

export const getImages =
  (request: ImageRequestType = {}) =>
  (dispatch: Dispatch<GetImagesActionType>, getState: () => RootStateType) => {
    dispatch({
      type: actionTypes.IMAGES_LOADING,
    });

    const currentPage = getState().images.all.page;

    return axios
      .get('images/search', {
        params: {
          ...imagesDefaultRequest,
          page: currentPage + 1,
          ...request,
        },
      })
      .then((resp) =>
        dispatch({
          type: actionTypes.IMAGES_SUCCESS,
          payload: { data: resp.data },
        }),
      )
      .catch((error) =>
        dispatch({
          type: actionTypes.IMAGES_FAILURE,
          payload: error,
        }),
      );
  };

export const clearImages = () => ({
  type: actionTypes.IMAGES_CLEAR,
});
