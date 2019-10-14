import * as actions from './actions';
import { formatFavourites, updateCatsFavouriteId } from './helpers';

const initialState = {
  catsQuery: { size: 'thumb', order: 'asc', limit: 10 },
  cats: [],
  breeds: [],
  modalProps: {},
  favourites: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_CATS_SUCCESS:
      return {
        ...state,
        cats: [
          ...state.cats,
          ...updateCatsFavouriteId(action.cats, state.favourites),
        ],
      };
    case actions.FETCH_CATS_FAIL:
      return state;
    case actions.CLEAR_CATS:
      return { ...state, cats: [] };
    case actions.FETCH_BREEDS_SUCCESS:
      return { ...state, breeds: action.breeds };
    case actions.GET_FAVOURITES_SUCCESS: {
      const formattedFavourites = formatFavourites(action.favourites);
      return {
        ...state,
        favourites: formattedFavourites,
        cats: updateCatsFavouriteId(state.cats, formattedFavourites),
      };
    }
    case actions.SAVE_FAVOURITE_SUCCESS:
      return {
        ...state,
        favourites: [...state.favourites, action.favourite],
        modalProps: { ...state.modalProps, favouriteId: action.favourite.id },
        cats: updateCatsFavouriteId(state.cats, [action.favourite]),
      };
    case actions.DELETE_FAVOURITE_SUCCESS: {
      const updatedFavourites = state.favourites
        .filter((favourite) => favourite.id !== action.favouriteId);
      return {
        ...state,
        favourites: updatedFavourites,
        modalProps: { ...state.modalProps, favouriteId: undefined },
        cats: updateCatsFavouriteId(state.cats, updatedFavourites),
      };
    }
    case actions.FETCH_BREEDS_FAIL:
      return state;
    case actions.UPDATE_SEARCH_PARAMS:
      return {
        ...state,
        catsQuery: { ...state.catsQuery, ...action.params },
      };
    case actions.UPDATE_MODAL_PROPS:
      return { ...state, modalProps: action.modalProps };
    default:
      return state;
  }
};
