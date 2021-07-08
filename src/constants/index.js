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
export const ENDPOINTS = {
  COMPANY_ENDPOINT_GET_MANY: (id) => ``,
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
  GET_ONE_FAVOURITE: ({ favourite_id: favoutireId } = {}) =>
    `/favourites/${favoutireId}`,
  DELETE_ONE_FAVOURITE: ({ favourite_id: favoutireId } = {}) =>
    `/favourites/${favoutireId}`,
  POST_ONE_FAVOURITE: ({ image_id: imageId, sub_id: subId } = {}) =>
    `/favourites/?${stringify({ image_id: imageId, sub_id: subId })}`,
  GET_BREEDS: ({ attach_breed: attachBreed, page, limit } = {}) =>
    `/breeds?${stringify({ attach_breed: attachBreed, page, limit })}`
};
