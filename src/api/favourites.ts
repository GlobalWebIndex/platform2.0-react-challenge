import { config } from "~/config";

export function getFavourite(favouriteId: string) {
  return fetch(`${config.url}/favourites?${favouriteId}`, {
    headers: {
      ...config.headers,
    },
  });
}

export function getFavourites(page = 0) {
  return fetch(`${config.url}/favourites?sub_id=marek0017&order=DESC`, {
    headers: {
      ...config.headers,
    },
  });
}

export function addFavourite(imgId: string) {
  return fetch(`${config.url}/favourites`, {
    method: "POST",
    body: JSON.stringify({
      image_id: imgId,
      sub_id: "marek0017",
    }),
    headers: {
      ...config.headers,
      "Content-Type": "application/json",
    },
  });
}

export function deleteFavourite(favoriteId: string) {
  return fetch(`${config.url}/favourites/${favoriteId}`, {
    method: "DELETE",
    headers: {
      ...config.headers,
    },
  });
}
