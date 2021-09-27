import Home from "components/Home/Home";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import styles from "./App.module.scss";

function App() {
  return (
    <Router>
      <div className={styles.content}>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
