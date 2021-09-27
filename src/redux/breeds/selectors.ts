import { RootStateType } from 'redux/rootReducer';

export const allBreedsSelector = (state: RootStateType) => state.breeds.all.list;
export const breedsLoadingSelector = (state: RootStateType) => state.breeds.all.loading;
