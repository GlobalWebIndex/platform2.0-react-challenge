// Selectors for getting the redux state

export const catImagesSelector = state => state.catImages || [];

export const catImageSelector = state => state.catImage || {};

export const catBreedsSelector = state => state.catBreeds || [];

export const errorSelector = state => state.error || {};

export const isLoadingSelector = state => state.isLoading || {};

export const breedImagesSelector = state => state.breedImages || [];

export const favouriteCatSelector = state => state.favouriteCat || {};

export const favouriteImagesSelector = state => state.favouriteImages || [];