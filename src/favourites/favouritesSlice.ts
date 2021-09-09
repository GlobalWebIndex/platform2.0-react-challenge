import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';
import { Favourite } from '../common/models';
import { Client } from '../api';
import { RootState } from '../store';
import { Constants } from '../constants';

interface FavouritesState {
  byImageId: Record<string, Favourite>,
  idsByImageId: Record<string, number>
  loading: boolean,
  error: string|null
}

const initialState: FavouritesState = {
  byImageId: {},
  idsByImageId: {},
  loading: false,
  error: null,
};

const favouriteSchema = new schema.Entity('favourites', undefined, { idAttribute: 'image_id' });

export const fetchFavourites = createAsyncThunk(
  'favourites/load',
  async () => {
    const { data } = await Client
      .get<Favourite[]>({ endpoint: `${Constants.BASE_URL}/favourites?sub_id=${Constants.SUB_ID}` });

    const normalized = normalize<Favourite, { favourites: Record<string, Favourite>}>(data, [favouriteSchema]);

    const favourites = normalized.entities?.favourites ?? {};

    const imageIdsMappedToFavouriteIds = normalized.result
      .reduce((idsMap: Record<string, number>, imageId: string) => {
        const newIdsMap = { ...idsMap };
        newIdsMap[imageId] = favourites[imageId].id;
        return newIdsMap;
      }, {});

    return { favourites, imageIdsMappedToFavouriteIds };
  },
);

export const addFavourite = createAsyncThunk(
  'favourites/add',
  async (imageId: string) => {
    const params = {
      image_id: imageId,
      sub_id: Constants.SUB_ID,
    };

    const response = await Client.post<
        { message: string, id: number },
        { 'image_id': string; 'sub_id': string; }>(`${Constants.BASE_URL}/favourites`, params);

    return { favouriteId: response.id, imageId };
  },
);

export const removeFavourite = createAsyncThunk(
  'favourites/delete',
  async ({ favouriteId, imageId }: {favouriteId: number, imageId: string}) => {
    await Client.del<{ message: string }>(`${Constants.BASE_URL}/favourites/${favouriteId}`);

    return imageId;
  },
);

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavourites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        const { favourites, imageIdsMappedToFavouriteIds } = action.payload;
        state.loading = false;
        state.byImageId = favourites;
        state.idsByImageId = imageIdsMappedToFavouriteIds;
      })
      .addCase(fetchFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unhandled error occurred.';
      })
      .addCase(addFavourite.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFavourite.fulfilled, (state, action) => {
        const { imageId, favouriteId } = action.payload;
        state.idsByImageId[imageId] = favouriteId;
        state.loading = false;
      })
      .addCase(addFavourite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unhandled error occurred.';
      })
      .addCase(removeFavourite.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFavourite.fulfilled, (state, action) => {
        const newFavourites = { ...state.byImageId };
        delete newFavourites[action.payload];
        state.byImageId = newFavourites;

        const newIdsMap = { ...state.idsByImageId };
        delete newIdsMap[action.payload];
        state.idsByImageId = newIdsMap;

        state.loading = false;
      })
      .addCase(removeFavourite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unhandled error occurred.';
      });
  },
});

export const selectAllFavourites = (state: RootState): Favourite[] => Object.values(state.favourites.byImageId);

export const selectAllFavouritesByImageId = (state: RootState): Record<string, Favourite> => state.favourites.byImageId;

export const selectAllFavouriteIdsByImageId = (state: RootState):
    Record<string, number> => state.favourites.idsByImageId;

export const favouritesAreLoading = (state: RootState): boolean => state.favourites.loading;

export default favouritesSlice.reducer;
