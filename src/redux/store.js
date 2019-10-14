import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import {
  watchFetchCats,
  watchFetchBreeds,
  watchGetFavourites,
  watchSaveFavourite,
  watchDeleteFavourite,
} from './saga';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createReduxStore = (state) => {
  const store = createStore(
    reducer,
    state,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );
  sagaMiddleware.run(watchFetchCats);
  sagaMiddleware.run(watchFetchBreeds);
  sagaMiddleware.run(watchGetFavourites);
  sagaMiddleware.run(watchSaveFavourite);
  sagaMiddleware.run(watchDeleteFavourite);

  return store;
};

export default createReduxStore;
