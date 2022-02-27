export const Routes = {
  home: "/",
  breeds: "/breeds",
  favourites: "/favourites",
  catDetails: "/cat/:catId",
  breedDetails: "/breed/:breedId",
};

export const CatsToFetchLimit = 10;
export const ImagesByBreedLimit = 8;

export const Endpoints = {
  API: "https://api.thecatapi.com/v1/",
  ImageSearch: "images/search/",
  Breeds: "breeds/",
  CatDetails: "images/",
  Favourites: "favourites/",
};

export const ApiHttpMethods = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete'
}