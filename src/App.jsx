import React from 'react';
import {
  Gallery,
  Breeds,
  Favourites,
  Modal,
} from './components';
import './App.css';

const App = () => (
  <div className="app-container">
    <Modal />
    <div data-testid="cats-list-container" id="cats-list-container">
      <Gallery />
    </div>
    <div data-testid="breeds-container" id="breeds-container">
      <Breeds />
    </div>
    <div data-testid="favourites-container" id="favourites-container">
      <Favourites />
    </div>
  </div>
);

export default App;
