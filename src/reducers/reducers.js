import { Map } from 'immutable';
import {
    SET_CAT_IMAGES,
    SET_CAT_IMAGE,
    SET_CAT_BREEDS,
    SET_BREED_IMAGES,
    SET_ERROR,
    SET_LOADING,
    SET_FAVOURITE_CAT,
    CLEAR_FAVOURITE_CAT,
    SET_FAVOURITE_IMAGES,
    UPDATE_FAVOURITE_IMAGES
} from "../actions/actions";

export const reducers = (state = Map(), action) => {
    switch(action.type) {
        case SET_CAT_IMAGES:
            return {...state, catImages: state.catImages ? [...state.catImages, ...action.payload] : action.payload };
        case SET_CAT_IMAGE:
            return {...state, catImage: action.payload };
        case SET_CAT_BREEDS:
            return {...state, catBreeds: state.catBreeds ? [...state.catBreeds, ...action.payload] : action.payload};
        case SET_BREED_IMAGES:
            return {...state, breedImages: action.payload};
        case SET_ERROR:
            return {...state, error: action.payload};
        case SET_LOADING:
            return {...state, isLoading: action.payload};
        case SET_FAVOURITE_CAT:
            return {...state, favouriteCat: action.payload};
        case CLEAR_FAVOURITE_CAT:
            delete state['favouriteCat'];
            delete state['error'];
            return state;
        case SET_FAVOURITE_IMAGES:
            return {...state, favouriteImages: state.favouriteImages ? [...state.favouriteImages, ...action.payload] : action.payload};
        case UPDATE_FAVOURITE_IMAGES:
            return {...state, favouriteImages: state.favouriteImages.filter(fav => fav.id !== action.payload)};
        default:
            return state;
    }
};
