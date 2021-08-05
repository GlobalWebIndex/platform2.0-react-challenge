// the cat api calls used into sagas

export const getInitialCatImagesApi = page => `https://api.thecatapi.com/v1/images/search?limit=10&page=${page}&order=Desc`;
export const getCatImageApi = image_id => `https://api.thecatapi.com/v1/images/${image_id}`;
export const getCatBreedsApi = page => `https://api.thecatapi.com/v1/breeds?limit=10&page=${page}`;
export const submitFavouriteCatApi = () => 'https://api.thecatapi.com/v1/favourites';
export const getBreedImagesApi = breed_id => `https://api.thecatapi.com/v1/images/search?breed_id=${breed_id}`;
export const getFavouriteImagesApi = (page, sub_id) => `https://api.thecatapi.com/v1/favourites?limit=10&page=${page}&sub_id=${sub_id}`;
export const deleteFavouriteCatApi = favouriteCatId => `https://api.thecatapi.com/v1/favourites/${favouriteCatId}`;
