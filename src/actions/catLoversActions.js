import {
  REQUEST_RANDOM_CATS,
  SET_RANDOM_CATS,
  REQUEST_BREEDS,
  SET_BREEDS,
  SET_UI_STATE,
  REQUEST_BY_BREED,
  SET_BREED_BY_ID,
  SUBMIT_IMAGE_AS_FAVORITE,
  DELETE_IMAGE_FROM_FAVORITE,
  REQUEST_FAVORITES, SET_FAVORITES_CATS,
  APPEND_RANDOM_CATS,
  CLEAR_BY_BREED
} from '../common/constants';

/**
 * Action to fetch random cats
 */
export const requestRandomCatsAction = () => ({
  type: REQUEST_RANDOM_CATS,
});

/**
 * Action to set random cats to the state
 * @param randomCats
 * @returns {{type, payload: *}}
 */
export const setRandomCatsAction = randomCats => ({
  type: SET_RANDOM_CATS,
  payload: { randomCats }
});

/**
 * Action to fetch breeds of cats
 */
export const requestBreedsAction = () => ({
  type: REQUEST_BREEDS,
});

/**
 * Action to set breeds to the state
 * @param breeds
 * @returns {{type, payload: *}}
 */
export const setBreedsAction = breeds => ({
  type: SET_BREEDS,
  payload: { breeds }
});

/**
 * Action creator for updating the current UI state.
 * @param attr the attribute to set
 * @param val the value of the attribute
 * @return {{type, payload: {attr: *, val: *}}}
 */
export const setUIState = (attr, val) => ({
  type: SET_UI_STATE,
  payload: { attr, val }
});

/**
 * Action to fetch breeds by id
 * @param breedId
 */
export const requestByBreedIdAction = breedId => ({
  type: REQUEST_BY_BREED,
  payload: { breedId }
});

/**
 * Action to clear breed by id from the state
 */
export const clearByBreedIdAction = () => ({
  type: CLEAR_BY_BREED,
});

/**
 * Action to set a breed by id to the state
 * @param breedById
 * @returns {{type, payload: *}}
 */
export const setBreedByIdAction = breedById => ({
  type: SET_BREED_BY_ID,
  payload: { breedById }
});

/**
 * Action to add an image to favorite cats
 * @param catImgId
 * @returns {{type, payload: *}}
 */
export const addCatImageAsFavoriteAction = catImgId => ({
  type: SUBMIT_IMAGE_AS_FAVORITE,
  payload: { catImgId }
});

/**
 * Action to delete an image from favorite cats
 * @param catImgId
 * @returns {{type, payload: *}}
 */
export const deleteCatImageFromFavoriteAction = catImgId => ({
  type: DELETE_IMAGE_FROM_FAVORITE,
  payload: { catImgId }
});

/**
 * Action to fetch favorite cats
 */
export const requestFavoritesAction = () => ({
  type: REQUEST_FAVORITES,
});

/**
 * Action to set favorite cats to the state
 * @param favoriteCats
 * @returns {{type, payload: *}}
 */
export const setFavoritesCatsAction = favoriteCats => ({
  type: SET_FAVORITES_CATS,
  payload: { favoriteCats }
});

/**
 * Action to append random cats response to the state
 */
export const appendRandomCatsAction = () => ({
  type: APPEND_RANDOM_CATS,
});