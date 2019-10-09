import React from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { Navbar, Button, Alignment, Classes } from "@blueprintjs/core"

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

/* Components */
import Breeds from "../breeds/Breeds"
import Cats from "../cats/Cats"
import Favorites from '../favorites/Favorites'
import Page404 from '../error-pages/Page404';
import { ScreenClassProvider } from 'react-grid-system';
import { ModalProvider } from 'react-modal-hook';


const App: React.FC = () => {

  return (
    <React.Fragment>
      <BrowserRouter>
        <ModalProvider>
          <ScreenClassProvider>
            <Navbar className="bp3-dark">
              <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>GWI Cats Challenge</Navbar.Heading>
                <Navbar.Divider />
                <Link to="/">
                  <Button className={Classes.MINIMAL} icon="random" text="Browse Images" />
                </Link>
                <Link to="/breeds">
                  <Button className={Classes.MINIMAL} icon="code" text="Breeds" />
                </Link>
                <Link to="/favorites">
                  <Button className={Classes.MINIMAL} icon="heart" text="Favorites" />
                </Link>
              </Navbar.Group>
            </Navbar>
            {/* Routes */}
            <Switch>
              <Route path="/" exact component={Cats} />
              <Route path="/cats/:image_id" component={Cats} />
              <Route path="/breeds" component={Breeds} />
              <Route path="/favorites" component={Favorites} />
              <Route path="/*" component={Page404} status={404} />
            </Switch>
          </ScreenClassProvider>
        </ModalProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
