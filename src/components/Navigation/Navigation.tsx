import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, Switch, Route, useLocation } from "react-router-dom";
import BreedList from "../../pages/BreedList";
import Home from "../../pages/Home";
import NotFound from "../../pages/NotFound";
import BreedModal from "../BreedModal";
import FavoriteList from "../../pages/FavoriteList";
import { CacheKeys } from "../../constants/constants";
import {IoLogoOctocat} from "react-icons/io"
import BreedDetail from "../BreedDetail";

const Navigation: React.FC = () => {
  const location: any = useLocation();
  const background = location.state && location.state.background;

  return (
    <div>
      <Navbar className="mb-3" bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand><IoLogoOctocat/> TheCatApi</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="">
              <Link to="/" className="nav-link">
                Home
              </Link>              
              <Link to="/breedList" className="nav-link">
                Breed List
              </Link>
              <Link to="/favoriteList" className="nav-link">
                Favorite List
              </Link>
              <Nav.Item>
                <Nav.Link><small>SubID: {localStorage.getItem(CacheKeys.SUBS_ID)}</small></Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch location={background || location}>
        <Route exact path="/">
          <Home />
        </Route>        
        <Route exact path="/breedList">
          <BreedList />
        </Route>
        <Route exact path="/favoriteList">
          <FavoriteList />
        </Route>
        <Route exact path="/breedDetail/:id">
          <BreedDetail />
        </Route>        
        <Route path="" children={NotFound} />
      </Switch>
      {background && (
        <Route exact path="/breed/:id">
          <BreedModal />
        </Route>
      )}
    </div>
  );
};

export default Navigation;
