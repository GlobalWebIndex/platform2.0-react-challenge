import { Switch, Route, Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useLocation } from "react-router";
import Home from "./pages/Home";
import Breeds from "./pages/Breeds";
import Favourites from "./pages/Favourites";
import CatModal from "./components/CatModal";
import BreedModal from "./components/BreedModal";
import "semantic-ui-css/semantic.min.css";

const Navigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  a {
    color: black;
  }
  a:hover {
    background: black;
    color: white;
    transition: all 150ms ease;
  }
`;

function App() {
  const location = useLocation();
  const background =
    (location.state && location.state.background) ||
    (location.pathname.includes("images") && "/");

  return (
    <div className="App">
      <Navigation>
        <Link to="/">Home</Link>
        <Link to="/breeds">Breeds</Link>
        <Link to="/favourites">Favourites</Link>
      </Navigation>
      <Switch location={background || location}>
        <Route exact path="/" component={Home} />
        <Route path="/breeds" component={Breeds} />
        <Route path="/favourites" component={Favourites} />
      </Switch>
      {background && <Route path="/images/:id" component={CatModal} />}
      {background && <Route path="/breeds/:name" component={BreedModal} />}
    </div>
  );
}

export default App;
