import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';


import { IFavouritePhoto, ICatPhoto, favouriteImage, getFavourites, unfavouriteImage, getImages } from "../../services/image.storage"

export interface IPhotosState {
    favourites: IFavouritePhoto[];
    photos: ICatPhoto[];
    breedId?: string;
    allPhotosRetrieved: boolean;
}

const initialState: IPhotosState = {
    favourites: [],
    photos: [],
    allPhotosRetrieved: false
}

export const getPhotosAsync = createAsyncThunk(
    "photos/fetch",
    async (breedId?: string) => {
        return await getImages(breedId)
    }
)

export const addFavouriteAsync = createAsyncThunk(
    "favourites/add",
    async (id: string) => {
        await favouriteImage(id)
        return await getFavourites()
    }
)

export const removeFavouriteAsync = createAsyncThunk(
    "favourites/remove",
    async (id: string) => {
        await unfavouriteImage(id)
        return await getFavourites()
    }
)

export const getFavouritesAsync = createAsyncThunk(
    "favourites/get",
    async () => {
        return await getFavourites()
    }
)

export const photosSlice = createSlice({
    name: "favourites",
    initialState,
    reducers: {
        reset: (state) => {
            state.photos = []
        }
    },
    extraReducers(builder) {
        builder.addCase(addFavouriteAsync.fulfilled, (state: IPhotosState, action) => {
            state.favourites = action.payload;
            syncFavoritesWithPhotos(state);
        }).addCase(removeFavouriteAsync.fulfilled, (state: IPhotosState, action) => {
            state.favourites = action.payload;
            syncFavoritesWithPhotos(state);
        }).addCase(getFavouritesAsync.fulfilled, (state: IPhotosState, action) => {
            state.favourites = action.payload;
        }).addCase(getPhotosAsync.fulfilled, (state: IPhotosState, action) => {
            if (action.meta.arg != state.breedId) {
                state.breedId = action.meta.arg;
                state.photos = action.payload;
                state.allPhotosRetrieved = false;
                return
            }
            const previousPhotosCount = state.photos.length;

            state.photos = [...state.photos, ...action.payload].filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i)
            if (previousPhotosCount == state.photos.length) {
                state.allPhotosRetrieved = true;
            }
        })

    },
})

const syncFavoritesWithPhotos = (state: IPhotosState) => {
    state.photos = state.photos.map(x => { return { ...x, favourite: x.favourite = state.favourites.map(favourite => favourite.image_id).includes(x.id) } })
}
export const selectFavourites = (state: RootState) => state.counter.favourites;
export const selectPhotos = (state: RootState) => state.counter.photos;
export const selectAllPhotosRetrieved = (state: RootState) => state.counter.allPhotosRetrieved;


export default photosSlice.reducer;