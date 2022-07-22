import { PayloadAction } from '@reduxjs/toolkit';
import { CatApiErrorType } from 'store/cats/types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { BreedsSliceSaga } from './saga';
import { BreedsSliceState, Breed } from './types';

const BREEDS_SLICE_NAME = `breeds`;

export const initialState: BreedsSliceState = {
  breeds: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: BREEDS_SLICE_NAME,
  initialState,
  reducers: {
    loadBreeds(state) {
      state.loading = true;
      state.error = null;
      state.breeds = [];
    },
    breedsLoaded(state, action: PayloadAction<Breed[]>) {
      state.breeds = action.payload;
      state.loading = false;
    },
    breedsApiError(state, action: PayloadAction<CatApiErrorType | null>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions: catSliceActions, reducer } = slice;

export const useBreedSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: BreedsSliceSaga });
  return { actions: slice.actions };
};
