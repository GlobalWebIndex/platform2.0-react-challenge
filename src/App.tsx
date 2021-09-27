import Breeds from 'components/Breeds/Breeds';
import Favourites from 'components/Favourites/Favourites';
import Home from 'components/Home/Home';
import { Routes } from 'constants/routes';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import styles from './App.module.scss';

function App() {
  return (
    <Router>
      <div className={styles.content}>
        <nav>
          <ul>
            <li>
              <Link to={Routes.home.index}>Home</Link>
            </li>
            <li>
              <Link to={Routes.breeds.index}>Breeds</Link>
            </li>
            <li>
              <Link to={Routes.favourites.index}>Favourites</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path={Routes.favourites.index} exact>
            <Favourites />
          </Route>
          <Route path={Routes.breeds.index} exact>
            <Breeds />
          </Route>
          <Route path={Routes.home.index}>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
