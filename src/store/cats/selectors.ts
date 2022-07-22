import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectDomain = (state: RootState) => state.cats || initialState;

export const selectCatImages = createSelector(
  [selectDomain],
  catApiState => catApiState.catImages,
);

export const selectFavouriteCatImages = createSelector(
  [selectDomain],
  catApiState => catApiState.favouriteCatImages,
);

export const selectCat = createSelector(
  [selectDomain],
  catApiState => catApiState.selectedCat,
);

export const selectCatsLoading = createSelector(
  [selectDomain],
  catApiState => catApiState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  catApiState => catApiState.error,
);

export const selectSuccess = createSelector(
  [selectDomain],
  catApiState => catApiState.success,
);

export const selectOnlyBreeds = createSelector(
  [selectDomain],
  catApiState => catApiState.onlyBreeds,
);

export const selectBreedId = createSelector(
  [selectDomain],
  catApiState => catApiState.selectedBreedId,
);
