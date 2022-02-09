import { Routes, Route } from "react-router-dom";
import CatsView from "./Views/CatsView";
import BreedsView from "./Views/BreedsView";
import FavoritesView from "./Views/FavoritesView";
import NotFound from "./NotFound/NotFound";
import Navbar from "./Navbar/Navbar";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./globalstyle";
import { useGlobalContext } from "./context";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router";

function App() {
  const {
    state: { theme },
  } = useGlobalContext();

  let location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<CatsView />} />
          <Route path="/breeds" element={<BreedsView />} />
          <Route path="/favorites" element={<FavoritesView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
