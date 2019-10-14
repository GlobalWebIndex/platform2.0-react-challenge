import mockResponses from './mockResponses';

const mock = {
  getCats: () => Promise.resolve(mockResponses.getCatsResponse),
  getBreeds: () => Promise.resolve(mockResponses.getBreedsResponse),
  getFavourites: () => Promise.resolve(mockResponses.getFavouritesResponse),
  saveFavourite: () => Promise.resolve(mockResponses.saveFavouriteResponse),
  deleteFavourite: () => Promise.resolve(mockResponses.deleteFavouriteResponse),
};

export default mock;
