import { combineReducers } from 'redux';

import { CommonReducer } from 'common/ducks';

const rootReducer = combineReducers({ common: CommonReducer });

export default rootReducer;
