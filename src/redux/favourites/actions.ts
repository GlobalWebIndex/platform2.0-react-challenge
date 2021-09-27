import { API_KEY } from 'constants/api';
import { Dispatch } from 'redux';
import axios from 'services/axios';
import { FavouriteSaveResponseType } from 'types/favourites';
import * as actionTypes from './actionTypes';
import { AddFavouritesActionType, FavouritesActionType } from './types';

const headers = {
  'x-api-key': API_KEY,
};

export const getFavourites = () => (dispatch: Dispatch<FavouritesActionType>) => {
  dispatch({
    type: actionTypes.FAVOURITES_LOADING,
  });

  return axios
    .get('favourites', {
      headers,
    })
    .then((resp) =>
      dispatch({
        type: actionTypes.FAVOURITES_SUCCESS,
        payload: { data: resp.data },
      }),
    )
    .catch((error) =>
      dispatch({
        type: actionTypes.FAVOURITES_FAILURE,
        payload: error,
      }),
    );
};

export const addFavourite = (imageId: string, subId: string) => (dispatch: Dispatch<AddFavouritesActionType>) => {
  dispatch({
    type: actionTypes.ADD_FAVOURITES_LOADING,
  });

  return axios
    .post(
      'favourites',
      {
        image_id: imageId,
        sub_id: subId,
      },
      {
        headers,
      },
    )
    .then((resp) => {
      const favourite = resp.data as FavouriteSaveResponseType;

      return axios
        .get('favourites', {
          params: {
            favourite_id: favourite.id,
          },
          headers,
        })
        .then((favouriteResponse) => {
          dispatch({
            type: actionTypes.ADD_FAVOURITES_SUCCESS,
            payload: { data: resp.data },
          });
        });
    })
    .catch((error) =>
      dispatch({
        type: actionTypes.ADD_FAVOURITES_FAILURE,
        payload: error,
      }),
    );
};
