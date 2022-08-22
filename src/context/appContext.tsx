import React, { useReducer } from 'react';
import { Cat, Breed, Favorite } from '../utils/models';

type AppState = {
    cats: Cat[];
    selectedCat: Cat | null;
    favorites: Favorite[];
    breeds: Breed[];
    isHomeModalOpen: boolean;
};

const defaultState: AppState = {
    cats: [],
    selectedCat: null,
    favorites: [],
    breeds: [],
    isHomeModalOpen: false,
};

type Action =
    | { type: 'CHANGE_GLOBAL_VAR'; updatedVar: string }
    | { type: 'SET_CAT_LIST'; cats: Cat[] }
    | { type: 'SET_SELECTED_CAT'; cat: Cat }
    | { type: 'ADD_TO_FAVORITES'; favorite: Favorite }
    | { type: 'REMOVE_FROM_FAVORITES'; favoriteId: number }
    | { type: 'SET_BREED_LIST'; breeds: Breed[] }
    | { type: 'SET_FAVORITE_LIST'; favorites: Favorite[] }
    | { type: 'TOGGLE_CAT_MODAL'; catModal: boolean };

const appReducer = (state: AppState, action: Action) => {
    console.log(action);
    switch (action.type) {
        case 'SET_CAT_LIST':
            return { ...state, cats: [...state.cats, ...action.cats] };
        case 'SET_BREED_LIST':
            return { ...state, breeds: action.breeds };
        case 'SET_SELECTED_CAT':
            return { ...state, selectedCat: action.cat };
        case 'ADD_TO_FAVORITES':
            //TODO: Set?
            return { ...state, favorites: [...state.favorites, action.favorite] };
        case 'REMOVE_FROM_FAVORITES':
            const newFavorites = state.favorites.filter((item) => item.id !== action.favoriteId);
            return { ...state, favorites: newFavorites };
        case 'SET_FAVORITE_LIST':
            return { ...state, favorites: action.favorites };
        case 'TOGGLE_CAT_MODAL':
            return { ...state, isHomeModalOpen: action.catModal };
        default:
            return state;
    }
};

type Dispatch = (action: Action) => void;
type AppProviderProps = { children: React.ReactNode };

const AppStateContext = React.createContext<AppState | undefined>(undefined);
const AppDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const AppProvider = ({ children }: AppProviderProps) => {
    const [state, dispatch] = useReducer(appReducer, defaultState);

    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
        </AppStateContext.Provider>
    );
};

const useAppState = () => {
    const context = React.useContext(AppStateContext);
    if (context === undefined) {
        throw new Error('useAppState must be used within a AppProvider');
    }
    return context;
};

const useAppDispatch = () => {
    const context = React.useContext(AppDispatchContext);
    if (context === undefined) {
        throw new Error('useAppDispatch must be used within a AppProvider');
    }
    return context;
};

export { AppProvider, useAppState, useAppDispatch };
