import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Cats from "./modules/search/containers/Cats";
import Breeds from "./modules/breeds/containers/Breeds";
import Favourites from "./modules/favourites/containers/Favourites";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar bg="light" expand="lg">
            <Link to="/" className="navbar-brand">
              Cat
            </Link>
            <Navbar.Toggle />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link to="/" className="nav-link">
                  Home
                </Link>
                <Link to="/breeds" className="nav-link">
                  Breeds
                </Link>
                <Link to="/favourites" className="nav-link">
                  Favourites
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Route path="/" exact component={Cats} />
          <Route path="/breeds" exact component={Breeds} />
          <Route path="/favourites/" component={Favourites} />
        </div>
      </Router>
    );
  }
}

export default App;
