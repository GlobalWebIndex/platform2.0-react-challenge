import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';
import { Breed, CatImage } from '../common/models';
import { Client } from '../api';
import { RootState } from '../store';
import { Constants } from '../constants';

interface BreedsState {
  byPage: Record<string, Breed[]>,
  byId: Record<string, Breed>,
  imagesById: Record<string, CatImage[]>,
  total: number
  loading: boolean,
  error: string|null
}

const initialState: BreedsState = {
  byPage: {},
  byId: {},
  imagesById: {},
  total: 0,
  loading: false,
  error: null,
};

const breedSchema = new schema.Entity('breeds');

export const fetchBreedsForPage = createAsyncThunk(
  'breeds/loadPage',
  async (page: number) => {
    const paginationCount = 'pagination-count';

    const { data: breeds, headers } = await Client
      .get<Breed[]>({
        endpoint: `${Constants.BASE_URL}/breeds?limit=${Constants.BREEDS_REQUEST_LIMIT}&page=${page}`,
        includeHeadersInResponse: [paginationCount],
      });

    const normalized = normalize<Breed, { breeds: Record<string, Breed>}>(breeds, [breedSchema]);

    const breedsById = normalized.entities?.breeds ?? {};

    const total = headers && paginationCount in headers
      ? +headers[paginationCount]
      : 0;

    return {
      page,
      breeds,
      breedsById,
      total,
    };
  },
);

const breedsSlice = createSlice({
  name: 'breeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreedsForPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBreedsForPage.fulfilled, (state, action) => {
        const {
          page,
          breeds,
          breedsById,
          total,
        } = action.payload;

        state.loading = false;
        state.byPage[page] = breeds;
        state.byId = { ...state.byId, ...breedsById };
        state.total = total;
      })
      .addCase(fetchBreedsForPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? 'Error occurred...';
      });
  },
});

export const selectAllBreedsByPage = (state: RootState): Record<string, Breed[]> => state.breeds.byPage;

export const selectAllBreedImagesById = (state: RootState): Record<string, CatImage[]> => state.breeds.imagesById;

export const selectAllById = (state: RootState): Record<string, Breed> => state.breeds.byId;

export const breedsAreLoading = (state: RootState): boolean => state.breeds.loading;

export const selectTotalBreeds = (state: RootState): number => state.breeds.total;

export default breedsSlice.reducer;
