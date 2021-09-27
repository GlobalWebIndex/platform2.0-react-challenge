import { combineReducers } from 'redux';
import images from './images/reducers';
import favourites from './favourites/reducers';
import breeds from './breeds/reducers';

const rootReducer = combineReducers({
  images,
  favourites,
  breeds,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;
