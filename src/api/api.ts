import { FetchCatImagesParams } from '../types/theCatApi';
import requestWithErrorHandling from './requestWithErrorHandling';

const fetchCatImages = (params: FetchCatImagesParams) =>
  requestWithErrorHandling({
    method: 'get',
    url: 'images/search',
    params,
  });

const fetchBreedOptions = () =>
  requestWithErrorHandling({
    method: 'get',
    url: 'breeds',
  });

const fetchCategoryOptions = () =>
  requestWithErrorHandling({
    method: 'get',
    url: 'categories',
  });

const fetchBreedInfo = (id: string) =>
  requestWithErrorHandling({
    method: 'get',
    url: `images/search?breed_ids=${id}&limit=10`,
  });

const fetchAllFavourites = () =>
  requestWithErrorHandling({
    method: 'get',
    url: 'favourites',
  });

const fetchFavouriteCat = (favourite_id: string) =>
  requestWithErrorHandling({
    method: 'get',
    url: `favourites/${favourite_id}`,
  });

const saveImageAsFavourite = (image_id: string) =>
  requestWithErrorHandling({
    method: 'post',
    url: 'favourites',
    data: {
      image_id,
    },
  });

const removeImageFromFavourites = (favourite_id: string) =>
  requestWithErrorHandling({
    method: 'delete',
    url: `favourites/${favourite_id}`,
  });

const fetchCatDetails = (image_id: string) =>
  requestWithErrorHandling({
    method: 'get',
    url: `images/${image_id}`,
  });

export {
  fetchCatDetails,
  fetchCatImages,
  fetchBreedOptions,
  fetchCategoryOptions,
  fetchBreedInfo,
  fetchAllFavourites,
  fetchFavouriteCat,
  saveImageAsFavourite,
  removeImageFromFavourites,
};
