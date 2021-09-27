import { RootStateType } from 'redux/rootReducer';

export const allFavouritesSelector = (state: RootStateType) => state.favourites.all.list;

export const favouritesLoadingSelector = (state: RootStateType) => state.favourites.all.loading;
