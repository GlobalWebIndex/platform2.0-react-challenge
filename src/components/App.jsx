import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Routes as RoutesConfig } from "../constants";
import NavBar from "./common/NavBar";
import Modal from "./common/Modal";
import NotFound from "./common/NotFound";
import Loading from "./common/Loading";
import ListView from "./catsList/ListView";
import { useStyles } from "./App.styles";
import AppErrorBoundary from "./common/AppErrorBoundary";
let BreedsView = lazy(() =>
  import(/* webpackChunkName: "BreedsView" */ "./breeds/BreedsView")
);
let BreedDetails = lazy(() =>
  import(/* webpackChunkName: "BreedDetails" */ "./breedDetails/BreedDetails")
);
const FavouritesView = lazy(() =>
  import(/* webpackChunkName: "FavouritesView" */ "./favourites/FavouritesView")
);
let CatDetails = lazy(() =>
  import(/* webpackChunkName: "CatDetails" */ "./catDetails/CatDetails")
);

function App() {
  const classes = useStyles();
  let location = useLocation();
  let routes = [];

  return (
    <AppErrorBoundary>
      <Suspense fallback={<Loading />}>
        <NavBar />
        <div className={classes.content}>
          <Routes
            location={location?.state?.backgroundLocation || false || location}
          >
            <Route path={RoutesConfig.home} element={<ListView />} />
            <Route path={RoutesConfig.breeds} element={<BreedsView />} />
            <Route
              path={RoutesConfig.breedDetails}
              element={<BreedDetails />}
            />
            <Route
              path={RoutesConfig.favourites}
              element={<FavouritesView />}
            />
            <Route path={RoutesConfig.catDetails} element={<CatDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Show the modal when a background page is set */}
          {/* This is set from the <Link> state object which internally */}
          {/* uses the window history object */}
          {/* https://reactrouter.com/docs/en/v6/getting-started/concepts#locations */}
          {(location?.state?.backgroundLocation || false) && (
            <Routes>
              <Route
                path={RoutesConfig.catDetails}
                element={
                  <Modal>
                    <CatDetails />
                  </Modal>
                }
              />
              <Route
                path={RoutesConfig.breedDetails}
                element={
                  <Modal>
                    <BreedDetails />
                  </Modal>
                }
              />
            </Routes>
          )}
        </div>
      </Suspense>
    </AppErrorBoundary>
  );
}

export default App;
