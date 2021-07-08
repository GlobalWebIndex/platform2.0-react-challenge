import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { RestfulProvider } from "restful-react";

import BreedList from "./pages/BreedList";
import CatsList from "./pages/CatsList";
import CatModal from "./components/CatModal";

import Header from "./components/Header";

import { API_BASE_URL } from "./constants";

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
            <Route path="/breeds">
              <BreedList />
              {/* Fill with a lot of breeds */}
            </Route>
            <Route path="/catlady">{/* That's me. Show what I love */}</Route>
            <Route path="/breed/:id">{/** Is this one breed? */}</Route>
            <Route exact path={["/", "/cat/:id"]}>
              <CatsList />
              <CatModal />
            </Route>
          </Switch>
        </Router>
      </RestfulProvider>
    </ThemeProvider>
  );
}

export default App;
