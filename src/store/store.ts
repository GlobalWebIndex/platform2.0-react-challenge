import { configureStore } from '@reduxjs/toolkit';

import imagesReducer from '../images/imagesSlice';
import favouritesReducer from '../favourites/favouritesSlice';
import breedsReducer from '../breeds/breedsSlice';

export const store = configureStore({
  reducer: {
    images: imagesReducer,
    favourites: favouritesReducer,
    breeds: breedsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
