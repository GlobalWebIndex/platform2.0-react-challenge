// Action types that indicate the user actions
export const GET_CAT_IMAGES = 'GET_CAT_IMAGES';
export const SET_CAT_IMAGES = 'SET_CAT_IMAGES';
export const GET_CAT_IMAGE = 'GET_CAT_IMAGE';
export const SET_CAT_IMAGE = 'SET_CAT_IMAGE';
export const SET_ERROR = 'SET_ERROR';
export const SET_LOADING = 'SET_LOADING';
export const SUBMIT_FAVOURITE_CAT = 'SUBMIT_FAVOURITE_CAT';
export const CLEAR_FAVOURITE_CAT = 'CLEAR_FAVOURITE_CAT';
export const SET_FAVOURITE_CAT = 'SET_FAVOURITE_CAT';
export const GET_CAT_BREEDS = 'GET_CAT_BREEDS';
export const SET_CAT_BREEDS = 'SET_CAT_BREEDS';
export const GET_BREED_IMAGES = 'GET_BREED_IMAGES';
export const SET_BREED_IMAGES = 'SET_BREED_IMAGES';
export const GET_FAVOURITE_IMAGES = 'GET_FAVOURITE_IMAGES';
export const SET_FAVOURITE_IMAGES = 'SET_FAVOURITE_IMAGES';
export const DELETE_FAVOURITE_CAT = 'DELETE_FAVOURITE_CAT';
export const UPDATE_FAVOURITE_IMAGES = 'UPDATE_FAVOURITE_IMAGES';

/**
 * Action to get the cat images {@link CatImages}
 * @param page
 */
export const getCatImagesAction = page => ({
    type: GET_CAT_IMAGES,
    payload: page
});

/**
 * Action to set the cat images in redux state
 * @param catImages
 */
export const setCatImagesAction = catImages => ({
    type: SET_CAT_IMAGES,
    payload: catImages
});

/**
 * Action to get the cat image {@link CatImageModal}
 * @param image_id
 */
export const getCatImageAction = image_id => ({
    type: GET_CAT_IMAGE,
    payload: image_id
});

/**
 * Action to set the cat image in redux state
 * @param catImage
 */
export const setCatImageAction = catImage => ({
    type: SET_CAT_IMAGE,
    payload: catImage
});

/**
 * Action to set the errors in redux state
 * @param error
 */
export const setErrorAction = error => ({
    type: SET_ERROR,
    payload: error
});

/**
 * Action to set the loading indicator in redux state
 * @param isLoading
 */
export const setLoadingAction = isLoading => ({
    type: SET_LOADING,
    payload: isLoading
});

/**
 * Action to submit the favourite cat {@link CatImageModal @link BreedImagesModal}
 * @param image_id
 */
export const submitFavouriteCatAction = image_id => ({
    type: SUBMIT_FAVOURITE_CAT,
    payload: image_id
});

/**
 * Action to clear the favourite cat in redux state
 */
export const clearFavouriteCatAction = () => ({
    type: CLEAR_FAVOURITE_CAT
});

/**
 * Action to set the favourite cat in redux state
 * @param favouriteCat
 */
export const setFavouriteCatAction = favouriteCat => ({
    type: SET_FAVOURITE_CAT,
    payload: favouriteCat
});

/**
 * Action to get the cat breeds {@link CatImageModal}
 * @param page
 */
export const getCatBreedsAction = page => ({
    type: GET_CAT_BREEDS,
    payload: page
});

/**
 * Action to set the cat breeds in redux state
 * @param catBreeds
 */
export const setCatBreedsAction = catBreeds => ({
    type: SET_CAT_BREEDS,
    payload: catBreeds
});

/**
 * Action to get the breed images {@link BreedImagesModal}
 * @param breed_id
 */
export const getBreedImagesAction = breed_id => ({
    type: GET_BREED_IMAGES,
    payload: breed_id
});

/**
 * Action to set the breed images in redux state
 * @param breedImages
 */
export const setBreedImagesAction = breedImages => ({
    type: SET_BREED_IMAGES,
    payload: breedImages
});

/**
 * Action to get the favourite images {@link BreedImagesModal}
 * @param page
 */
export const getFavouriteImagesAction = page => ({
    type: GET_FAVOURITE_IMAGES,
    payload: page
});

/**
 * Action to set the favourite images in redux state
 * @param favouriteImages
 */
export const setFavouriteImagesAction = favouriteImages => ({
    type: SET_FAVOURITE_IMAGES,
    payload: favouriteImages
});

/**
 * Action to delete the favourite cat {@link BreedImagesModal}
 * @param favourite_id
 */
export const deleteFavouriteCatAction = favourite_id => ({
    type: DELETE_FAVOURITE_CAT,
    payload: favourite_id
});

/**
 * Action to update the favourite images in redux state after delete a favourite cat
 * @param favourite_id
 */
export const updateFavouriteImagesAction = favourite_id => ({
    type: UPDATE_FAVOURITE_IMAGES,
    payload: favourite_id
});