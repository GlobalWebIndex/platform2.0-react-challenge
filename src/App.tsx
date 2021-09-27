import Breeds from 'components/Breeds/Breeds';
import Header from 'components/common/Header/Header';
import Favourites from 'components/Favourites/Favourites';
import Home from 'components/Home/Home';
import { Routes } from 'constants/routes';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './App.module.scss';

function App() {
  return (
    <Router>
      <div className={styles.content}>
        <Header />
        <Switch>
          <Route path={Routes.favourites.index} exact>
            <Favourites />
          </Route>
          <Route path={Routes.breeds.index} exact>
            <Breeds />
          </Route>
          <Route path={`${Routes.home.index}:id?`}>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
