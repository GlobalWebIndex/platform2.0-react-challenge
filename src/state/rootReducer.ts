import { combineReducers } from 'redux';

import { CommonReducer } from 'common/ducks';
import { CatsReducer } from 'features/home/ducks';
import { BreedsReducer } from 'features/breeds/ducks';
import { FavoritesReducer } from 'features/favorites/ducks';

const rootReducer = combineReducers({
  common: CommonReducer,
  data: combineReducers({
    home: CatsReducer,
    breeds: BreedsReducer,
    favorites: FavoritesReducer,
  }),
});

export default rootReducer;
