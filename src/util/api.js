import axios from "axios";
import {
  Endpoints,
  CatsToFetchLimit,
  ImagesByBreedLimit,
  API_HTTP_METHODS,
} from "../constants";

/**
 * Setting the API client - using axios.create instance
 */
const APIClient = axios.create({
  baseURL: "https://api.thecatapi.com/v1/",
  headers: {
    common: {
      "x-api-key": process.env.REACT_APP_CAT_API_KEY,
    },
  },
});

/**
 * Utility function to perform the API requests.
 *
 * @param {string} source
 *    URL to be requested
 * @param {*} params
 *    Required params
 * @param {*} method
 *    get/post/delete
 * @returns response data
 */
const fetchAPI = async (source, params = {}, method = API_HTTP_METHODS.GET) => {
  const response = await APIClient[method](source, { ...params });
  return response.data || [];
};

/**
 * Fetch random cats based on the page number given as an arg.
 * API link: https://docs.thecatapi.com/api-reference/images/images-search
 * @param {Number} page
 * @returns
 */
export function fetchCatsList(page = 1) {
  return fetchAPI(Endpoints.ImageSearch, {
    params: {
      page,
      limit: CatsToFetchLimit,
      size: "small",
    },
  });
}

/**
 * Returns the available breeds
 * API link: https://docs.thecatapi.com/api-reference/breeds/breeds-list
 * @returns
 */
export function fetchBreeds() {
  return fetchAPI(Endpoints.Breeds);
}

/**
 * Fetch details for a cat
 * API link: https://docs.thecatapi.com/api-reference/images/images-get
 * @param {*} imageId
 * @returns
 */
export function fetchCatDetails(imageId) {
  return fetchAPI(`${Endpoints.CatDetails}${imageId}`);
}

/**
 * Fetch favourites list
 * API link: https://docs.thecatapi.com/api-reference/favourites/favourites-list
 * @returns
 */
export function fetchFavourites() {
  return fetchAPI(Endpoints.Favourites);
}

/**
 * Fetch Cat images by breed
 * API link: https://docs.thecatapi.com/api-reference/images/images-search
 * @returns
 */
export function fetchImagesByBreed(breedId) {
  return fetchAPI(Endpoints.ImageSearch, {
    params: {
      size: "small",
      breed_ids: breedId,
      limit: ImagesByBreedLimit,
    },
  });
}

/**
 * Submit a favourite cat to the API.
 * API link: https://docs.thecatapi.com/api-reference/favourites/favourites-post
 * @param {*} imageId
 * @returns
 */
export function addFavourite(imageId) {
  return fetchAPI(
    Endpoints.Favourites,
    {
      image_id: imageId,
      // Assuming that sub_id is not used for this app YET.
      // Probably we could have different user account ids in the future
      // OR even send a uuid to simulate random users but wouldn't make sense for now.
      // More Info: https://docs.thecatapi.com/sub_id
    },
    API_HTTP_METHODS.POST
  );
}

/**
 * Remove a favourite that was already submitted
 * API link: https://docs.thecatapi.com/api-reference/favourites/favourites-delete
 * @param {*} favouriteId
 * @returns
 */
export async function removeFavourite(favouriteId) {
  return fetchAPI(
    `${Endpoints.Favourites}${favouriteId}`,
    {},
    API_HTTP_METHODS.DELETE
  );
}
