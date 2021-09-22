import { Switch, Route, NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import { useLocation } from "react-router";
import Home from "./pages/Home";
import Breeds from "./pages/Breeds";
import Favourites from "./pages/Favourites";
import CatModal from "./components/CatModal";
import BreedModal from "./components/BreedModal";
import { FaCat } from "react-icons/fa";
import mq from "./helpers";
import "semantic-ui-css/semantic.min.css";

const Header = styled.div`
  width: 90%;
  max-width: 1500px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto;
  ${mq({
    flexDirection: ["column", "row"],
  })}
`;

const Navigation = styled.div`
  width: 80%;
  padding: 30px 0 0 0;
  margin: 0 auto 30px auto;
  border-radius: 10px;
  border-bottom: 1px solid lightgrey;
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  a {
    width: 100px;
    font-size: 18px;
    color: black;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${mq({
    marginRight: [0, 50],
    width: [75, 50],
    height: [75, 50],
  })}
`;

const logoIconStyles = {
  width: "100%",
  height: "100%",
};

const activeStyle = {
  paddingBottom: 5,
  borderBottom: "2px solid black",
};

function App() {
  const location = useLocation();
  const background =
    (location.state && location.state.background) ||
    (location.pathname.includes("images") && "/");

  return (
    <div style={{ background: "#eeeeee", minHeight: "100vh" }}>
      <Header>
        <Logo>
          <FaCat style={logoIconStyles} />
        </Logo>
        <Navigation>
          <NavLink exact to="/" activeStyle={activeStyle}>
            Home
          </NavLink>
          <NavLink to="/breeds" activeStyle={activeStyle}>
            Breeds
          </NavLink>
          <NavLink to="/favourites" activeStyle={activeStyle}>
            Favourites
          </NavLink>
        </Navigation>
      </Header>
      <Switch location={background || location}>
        <Route exact path="/" component={Home} />
        <Route path="/breeds" component={Breeds} />
        <Route path="/favourites" component={Favourites} />
      </Switch>
      {background && (
        <>
          <Route
            path="/images/:id"
            component={() => <CatModal background={background} />}
          />
          <Route
            path="/breeds/:name"
            component={() => <BreedModal background={background} />}
          />
        </>
      )}
    </div>
  );
}

export default App;
