import { Dispatch } from 'redux';
import { RootStateType } from 'redux/rootReducer';
import axios from 'services/axios';
import { FavouriteSaveResponseType } from 'types/favourites';
import * as actionTypes from './actionTypes';
import { allFavouritesSelector } from './selectors';
import { AddFavouritesActionType, DeleteFavouriteActionType, FavouritesActionType } from './types';

/************************* Favourites *************************/
export const getFavourites = () => (dispatch: Dispatch<FavouritesActionType>) => {
  dispatch({
    type: actionTypes.FAVOURITES_LOADING,
  });

  return axios
    .get('favourites')
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

/************************* Save favourite *************************/
export const addFavourite = (imageId: string, subId: string) => (dispatch: Dispatch<AddFavouritesActionType>) => {
  dispatch({
    type: actionTypes.ADD_FAVOURITES_LOADING,
  });

  return axios
    .post('favourites', {
      image_id: imageId,
      sub_id: subId,
    })
    .then((resp) => {
      const favourite = resp.data as FavouriteSaveResponseType;

      return axios.get(`favourites/${favourite.id}`).then((favouriteResponse) => {
        dispatch({
          type: actionTypes.ADD_FAVOURITES_SUCCESS,
          payload: { data: favouriteResponse.data },
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

/************************* Delete Favourite *************************/
export const deleteFavourite =
  (favouriteId: string) => (dispatch: Dispatch<DeleteFavouriteActionType>, getState: () => RootStateType) => {
    dispatch({
      type: actionTypes.DELETE_FAVOURITE_LOADING,
    });

    return axios
      .delete(`favourites/${favouriteId}`)
      .then((resp) => {
        const favourites = allFavouritesSelector(getState());
        const favouritesFiltered = favourites.filter((favourite) => favourite.id !== favouriteId);

        return dispatch({
          type: actionTypes.DELETE_FAVOURITE_SUCCESS,
          payload: { data: favouritesFiltered },
        });
      })
      .catch((error) =>
        dispatch({
          type: actionTypes.DELETE_FAVOURITE_FAILURE,
          payload: error,
        }),
      );
  };
