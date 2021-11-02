import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import RandomCats from './views/RandomCats/randomCats';
import Breeds from './views/Breeds/breeds';
import Favorites from './views/Favorites/favorites';
import rootReducer from './AppCore/reducers/rootReducer';
import rootSaga from './AppCore/sagas/rootSaga';
import { Provider } from 'react-redux';
import './AppCore/css/index.css';
import App from './AppCore/App';
import * as PATHS from './AppCore/common/constants';
import { API_KEY } from './AppCore/common/constants';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

localStorage.setItem(API_KEY, 'd6326d68-7c07-4a5f-bc3e-e480bd1823fd');

sagaMiddleware.run(rootSaga);

/**
 * Entry point of the Cat Lovers application.
 * Performs all the necessary actions and starts the application.
 */
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={'/cat-lovers/#'}>
      <App>
        <Switch>
          <Route path={PATHS.RANDOM_CATS} component={RandomCats} />
          <Route path={PATHS.BREEDS} component={Breeds} />
          <Route path={PATHS.FAVORITES} component={Favorites} />
          <Redirect to={PATHS.RANDOM_CATS} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

