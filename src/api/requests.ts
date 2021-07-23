import {
  BREEDS_URL_PATH,
  CacheKeys,
  FAVORITE_IMAGE_PATH,
  HEADERS,
  IMAGES_URL_PATH,
  X_API_KEY,
} from "../constants/constants";
import { HTTPMethods, ICatBreed, IFavorites } from "../models/models";
import { HttpClient } from "./httpClient";

export const fetchCats = async ({ pageParam = 0 }) => {
  const paginationQuery = `?limit=${10}&page=${pageParam}`;
  const url = IMAGES_URL_PATH;
  const rawData = await HttpClient(url, paginationQuery, {
    method: HTTPMethods.GET,
    headers: { "x-api-key": X_API_KEY },
  });
  const catData = await rawData.json();
  return catData;
};

export const fetchBreed = async (id?: string) => {
  if (id === null || id === undefined) return [];
  const url = BREEDS_URL_PATH;
  const query = `/search?q=${id}`;
  const rawData = await HttpClient(url, query, {
    method: HTTPMethods.GET,
    headers: { "x-api-key": X_API_KEY },
  });
  const breed: ICatBreed[] = await rawData.json();
  return breed;
};

export const fetchBreedList = async () => {
  const url = BREEDS_URL_PATH;
  const rawData = await HttpClient(url, "", {
    method: HTTPMethods.GET,
    headers: { "x-api-key": X_API_KEY },
  });
  const breeds: ICatBreed[] = await rawData.json();
  return breeds;
};

export const addToFavorites = async (imageId?: string) => {
  const data = {
    image_id: imageId,
    sub_id: localStorage.getItem(CacheKeys.SUBS_ID),
  };
  const url = FAVORITE_IMAGE_PATH;
  const reply = await HttpClient(url, "", {
    method: HTTPMethods.POST,
    body: JSON.stringify(data),
    headers: { "content-type": "application/json", "x-api-key": X_API_KEY },
  });

  return reply;
};

export const fetchFavoriteList = async () => {
  const query = `?sub_id=${localStorage.getItem(CacheKeys.SUBS_ID)}`;
  const url = FAVORITE_IMAGE_PATH;
  const rawData = await HttpClient(url, query, {
    method: HTTPMethods.GET,
    headers: HEADERS,
  });

  const data: IFavorites[] = await rawData.json();
  return data;
};

export const deleteFavorite = async (id: number) => {
  const url = `${FAVORITE_IMAGE_PATH}/${id}`;
  const reply = await HttpClient(url, "", {
    method: HTTPMethods.DELETE,
    headers: HEADERS,
  });
  return reply;
};
