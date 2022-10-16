import { requestSettings } from "../constants/api";

export const addFavourite = async (imageId: string) => {
  const rawBody = JSON.stringify({
    image_id: imageId,
    sub_id: "user-123", //decided to use a user id because without it the favourites were not saved after refreshing
  });

  const response = await fetch("https://api.thecatapi.com/v1/favourites/", {
    method: "POST",
    ...requestSettings,
    body: rawBody,
  });

  const data = await response.json();
  return data;
};

export const deleteFavourite = async (favouriteId: string) => {
  const response = await fetch(
    `https://api.thecatapi.com/v1/favourites/${favouriteId}`,
    {
      method: "DELETE",
      ...requestSettings,
    }
  );
  const data = await response.json();
  return data;
};

export const getBreedsList = async () => {
  const response = await fetch(
    `https://api.thecatapi.com/v1/breeds`,
    requestSettings
  );
  const data = await response.json();
  return data;
};

export const getCatById = async (id: string) => {
  const response = await fetch(
    `https://api.thecatapi.com/v1/images/${id}`,
    requestSettings
  );
  const data = await response.json();
  return data;
};

export const getCatsByBreed = async (breedId: string) => {
  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=3`,
    requestSettings
  );
  const data = await response.json();
  return data;
};

export const getFavoriteCats = async () => {
  const response = await fetch(
    `https://api.thecatapi.com/v1/favourites?limit=100&sub_id=user-123`,
    requestSettings
  );
  const data = await response.json();
  return data;
};

export const getRandomCats = async (page: number) => {
  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=10&page=${page}`,
    requestSettings
  );
  const data = await response.json();
  return data;
};
