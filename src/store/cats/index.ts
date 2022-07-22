import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { catSliceSaga } from './saga';
import {
  CatSliceState,
  CatImage,
  CatApiErrorType,
  FavouriteCatImage,
  CatApiSuccessType,
} from './types';

const CAT_SLICE_NAME = `cats`;

export const initialState: CatSliceState = {
  catImages: [],
  favouriteCatImages: [],
  loading: false,
  error: null,
  success: null,
  selectedCat: null,
  onlyBreeds: false,
  selectedBreedId: null,
};

const slice = createSlice({
  name: CAT_SLICE_NAME,
  initialState,
  reducers: {
    loadCatImages(state) {
      state.loading = true;
      state.error = null;
      state.catImages = [];
    },
    catImagesLoaded(state, action: PayloadAction<CatImage[]>) {
      state.catImages = action.payload;
      state.loading = false;
    },
    loadFavorites(state) {
      state.loading = true;
      state.error = null;
      state.favouriteCatImages = [];
    },
    favoritesLoaded(state, action: PayloadAction<FavouriteCatImage[]>) {
      state.favouriteCatImages = action.payload;
      state.loading = false;
    },
    loadCatImage(state, _action: PayloadAction<Partial<CatImage>>) {
      state.loading = true;
      state.error = null;
      state.selectedCat = null;
    },
    catImageLoaded(state, action: PayloadAction<CatImage>) {
      state.selectedCat = action.payload;
      state.loading = false;
    },
    setFavoriteCat(state, _action: PayloadAction<Partial<CatImage>>) {
      state.error = null;
      state.success = null;
    },
    favoriteCatLoaded(state, _action: PayloadAction<Partial<CatImage>>) {
      state.error = null;
    },
    deleteFavoriteCat(state, _action: PayloadAction<Partial<CatImage>>) {
      state.error = null;
      state.success = null;
    },
    deleteFavoriteCatLoaded(state, _action: PayloadAction<Partial<CatImage>>) {
      state.error = null;
    },
    selectCatImage(state, action: PayloadAction<CatImage>) {
      state.selectedCat = action.payload;
    },
    selectBreed(state, action: PayloadAction<string | null>) {
      state.selectedBreedId = action.payload;
    },
    setOnlyBreeds(state, action: PayloadAction<boolean>) {
      state.onlyBreeds = action.payload;
    },
    catApiError(state, action: PayloadAction<CatApiErrorType | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    catApiSuccess(state, action: PayloadAction<CatApiSuccessType | null>) {
      state.success = action.payload;
      state.loading = false;
    },
  },
});

export const { actions: catSliceActions, reducer } = slice;

export const useCatSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: catSliceSaga });
  return { actions: slice.actions };
};
