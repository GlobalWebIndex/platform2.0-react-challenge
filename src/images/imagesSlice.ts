import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';
import { CatImage } from '../common/models';
import { Client } from '../api';
import { RootState } from '../store';
import { Constants } from '../constants';

interface ImagesState {
  byId: Record<string, CatImage>,
  loading: boolean,
  error: string|null
}

const initialState: ImagesState = {
  byId: {},
  loading: false,
  error: null,
};

const imageSchema = new schema.Entity('images');

export const fetchImages = createAsyncThunk(
  'images/load',
  async () => {
    const { data } = await Client
      .get<CatImage[]>({ endpoint: `${Constants.BASE_URL}/images/search?&limit=10` });

    const normalized = normalize<CatImage, { images: Record<string, CatImage>}>(data, [imageSchema]);

    return normalized.entities?.images ?? {};
  },
);

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.loading = false;
        state.byId = { ...state.byId, ...action.payload };
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? 'Error occurred...';
      });
  },
});

export const selectAllImages = (state: RootState): CatImage[] => Object.values(state.images.byId);

export const selectAllImagesById = (state: RootState): Record<string, CatImage> => state.images.byId;

export const imagesAreLoading = (state: RootState): boolean => state.images.loading;

export default imagesSlice.reducer;
