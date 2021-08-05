import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import CatImages from './views/CatImages';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga';
import { reducers } from './reducers/reducers'
import watchers from "./sagas/watchers";
import {BrowserRouter, Route} from "react-router-dom";
import CatImageModal from "./views/CatImageModal";
import BreedImagesModal from "./views/BreedImagesModal";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// mount it on the Store
const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

// then run the saga
sagaMiddleware.run(watchers);

// render the application
ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
          <Route path="/" exact component={CatImages} />
          <Route path="/cats/:id" exact component={CatImageModal} />
          <Route path="/breeds/:id" exact component={BreedImagesModal} />
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

