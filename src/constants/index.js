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
  ImageSearch: "images/search/",
  Breeds: "breeds/",
  CatDetails: "images/",
  Favourites: "favourites/",
};

export const API_HTTP_METHODS = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete'
}