import { combineReducers } from 'redux';

import { CommonReducer } from 'common/ducks';
import { CatsReducer } from 'features/home/ducks';

const rootReducer = combineReducers({
  common: CommonReducer,
  data: combineReducers({ home: CatsReducer }),
});

export default rootReducer;
