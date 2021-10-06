import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/* Global components */
import AppHeader from "components/AppHeader";
import Loading from "../components/Loading";

import "./style.scss";

/* Pages for routing */
const Cats = lazy(() => import("pages/Cats"));
const Breeds = lazy(() => import("pages/Breeds"));
const Favorites = lazy(() => import("pages/Favorites"));

const App = () => {
  return (
    <Router>
      <AppHeader />
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/">
            <Cats />
          </Route>
          <Route path="/breeds">
            <Breeds />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route path="/:id">
            <Cats />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
