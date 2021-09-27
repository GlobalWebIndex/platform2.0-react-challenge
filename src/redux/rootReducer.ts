import { combineReducers } from 'redux';
import images from './images/reducers';
import favourites from './favourites/reducers';

const rootReducer = combineReducers({
  images,
  favourites,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;
