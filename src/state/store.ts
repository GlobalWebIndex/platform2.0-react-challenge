import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSagas from './rootSagas';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware] as Array<any>;

const Store = configureStore({
  reducer: rootReducer,
  // We need to compose enhancer since createStore can accept only one
  middleware: middlewares,
});

// Initialize Sagas
sagaMiddleware.run(rootSagas);

export default Store;
