import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import photosSlice from '../slices/photosSlice';

export const store = configureStore({
  reducer: {
    counter: photosSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
