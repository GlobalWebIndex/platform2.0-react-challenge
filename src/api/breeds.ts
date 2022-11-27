import { config } from "../config";

export async function getBreeds() {
  return fetch(`${config.url}/breeds`, {
    headers: config.headers,
  });
}

export async function getBreed(breedId: string) {
  return fetch(`${config.url}/breeds/${breedId}`, {
    headers: config.headers,
  });
}
