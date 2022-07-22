import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectDomain = (state: RootState) => state.breeds || initialState;

export const selectBreeds = createSelector(
  [selectDomain],
  breedsApiState => breedsApiState.breeds,
);

export const selectBreedsLoading = createSelector(
  [selectDomain],
  breedsApiState => breedsApiState.loading,
);

export const selectBreedsError = createSelector(
  [selectDomain],
  breedsApiState => breedsApiState.error,
);
