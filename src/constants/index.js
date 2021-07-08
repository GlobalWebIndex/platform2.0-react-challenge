import { stringify } from "qs";

export const API_BASE_URL = "https://api.thecatapi.com/v1";

export const NA_TEXT = "N/A";
export const PAGE_SIZE_INITIAL = 10;
export const COOL_PROMPTS = [
  "Isn't it cute?",
  "Look at this one!",
  "Isn't this cutie adorable",
  "Can you get your eyes away",
  "Oooooh adopt meeee",
  "Mew",
  "Oh a catieee"
];
/**
 * The API handling could be done better.
 * The idea below is to pass parameters to the useData.
 * I would do more if I had more time, the API was a bit more consistent
 * (less random) and returned some metadata like
 * OKEY, FAVOURITES, 1 PAGE, HOW MANY PAGES ARE THERE
 *
 */
export const ENDPOINTS = {
  GET_ONE_IMAGE: ({ image_id: id }) => `/images/${id}`,
  GET_IMAGE_SEARCH: ({
    size,
    mime_types: mimeTypes,
    order,
    limit,
    page,
    category_ids: categIds,
    format,
    breed_id: breedId
  } = {}) =>
    `/images/search?${stringify({
      size,
      mime_types: mimeTypes,
      order,
      limit,
      page,
      category_ids: categIds,
      format,
      breed_id: breedId
    })}`,
  GET_FAVOURITES: ({ sub_id: subId, limit, page } = {}) =>
    `/favourites?${stringify({ sub_id: subId, limit, page })}`,
  GET_ONE_FAVOURITE: ({ favourite_id: favouriteId } = {}) =>
    `/favourites/${favouriteId}`,
  DELETE_ONE_FAVOURITE: ({ favourite_id: favouriteId } = {}) =>
    `/favourites/${favouriteId}`,
  POST_ONE_FAVOURITE: ({ image_id: imageId, sub_id: subId } = {}) =>
    `/favourites`,
  GET_BREEDS: ({ attach_breed: attachBreed, page, limit } = {}) =>
    `/breeds?${stringify({ attach_breed: attachBreed, page, limit })}`
};
