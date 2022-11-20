import { config } from "../config";

export async function getRandomImages(page: number, limit = 10) {
  return fetch(`${config.url}/images/search?limit=${limit}&page=${page}`, {
    headers: {
      ...config.headers,
    },
  });
}

export async function getImage(imgId: string) {
  return fetch(`${config.url}/images/${imgId}`, {
    headers: config.headers,
  });
}

export async function getImagesForBreed(breedId: string) {
  return fetch(`${config.url}/images/search?breed_ids=${breedId}&limit=10`, {
    headers: {
      ...config.headers,
    },
  });
}
