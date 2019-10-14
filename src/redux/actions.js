export const FETCH_CATS = 'FETCH_CATS';
export const FETCH_CATS_SUCCESS = 'FETCH_CATS_SUCCESS';
export const FETCH_CATS_FAIL = 'FETCH_CATS_FAIL';
export const fetchCatsAction = (params) => ({ type: FETCH_CATS, params });

export const CLEAR_CATS = 'CLEAR_CATS';
export const clearCatsAction = () => ({ type: CLEAR_CATS });

export const FETCH_BREEDS = 'FETCH_BREEDS';
export const FETCH_BREEDS_SUCCESS = 'FETCH_BREEDS_SUCCESS';
export const FETCH_BREEDS_FAIL = 'FETCH_BREEDS_FAIL';
export const fetchBreedsAction = () => ({ type: FETCH_BREEDS });

export const GET_FAVOURITES = 'GET_FAVOURITES';
export const GET_FAVOURITES_SUCCESS = 'GET_FAVOURITES_SUCCESS';
export const GET_FAVOURITES_FAIL = 'GET_FAVOURITES_FAIL';
export const getFavouritesAction = () => ({ type: GET_FAVOURITES });

export const SAVE_FAVOURITE = 'SAVE_FAVOURITE';
export const SAVE_FAVOURITE_SUCCESS = 'SAVE_FAVOURITE_SUCCESS';
export const SAVE_FAVOURITE_FAIL = 'SAVE_FAVOURITE_FAIL';
export const saveFavouriteAction = (imageId, imageUrl) => ({ type: SAVE_FAVOURITE, imageId, imageUrl });

export const DELETE_FAVOURITE = 'DELETE_FAVOURITE';
export const DELETE_FAVOURITE_SUCCESS = 'DELETE_FAVOURITE_SUCCESS';
export const DELETE_FAVOURITE_FAIL = 'DELETE_FAVOURITE_FAIL';
export const deleteFavouriteAction = (favouriteId) => ({ type: DELETE_FAVOURITE, favouriteId });

export const UPDATE_MODAL_PROPS = 'UPDATE_MODAL_PROPS';
export const updateModalPropsAction = (modalProps) => ({ type: UPDATE_MODAL_PROPS, modalProps });

export const UPDATE_SEARCH_PARAMS = 'UPDATE_SEARCH_PARAMS';
export const updateSearchParamsAction = (params) => ({ type: UPDATE_SEARCH_PARAMS, params });
