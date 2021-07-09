import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { RestfulProvider } from "restful-react";

import BreedList from "./pages/BreedList";
import CatsList from "./pages/CatsList";
import FavouriteList from "./pages/FavouriteList";
import CatModal from "./components/CatModal";

import Header from "./components/Header";

import { API_BASE_URL } from "./constants";
import BreedModal from "./components/BreedModal";
import BreedFetcher from "./components/BreedFetcher";

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#eaeaea"
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00"
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RestfulProvider
        base={API_BASE_URL}
        requestOptions={(url, method, requestBody) => ({
          headers: { "X-API-KEY": localStorage.GIVEN_TOKEN }
        })}
      >
        <Router>
          <Header />
          <Switch>
            <Route
              exact
              path={[
                "/breeds",
                "/breeds/breed/:breedinfoid",
                "/breeds/cats/:breedid"
              ]}
            >
              <BreedModal openOnParams={["breedid"]}>
                <CatsList />
              </BreedModal>
              <BreedModal openOnParams={["breedinfoid"]}>
                <BreedFetcher />
              </BreedModal>
              <BreedList />
            </Route>
            <Route exact path={["/favourites", "/favourites/:id"]}>
              <CatModal pathOnClose="/favourites" />
              <FavouriteList />
            </Route>
            <Route exact path={["/", "/cat/:id"]}>
              <CatsList />
              <CatModal pathOnClose="/" />
            </Route>
          </Switch>
        </Router>
      </RestfulProvider>
    </ThemeProvider>
  );
}

export default App;
