import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,Navigate,
  Link,useLocation
} from "react-router-dom";
import { Container } from "semantic-ui-react";
import MenuBar from "./components/MenuBar";
import Favorites from "./pages/Favorites";
import Breeds from "./pages/Breeds";
import Home from "./pages/Home";
import SingleBreed from "./components/SingleBreed";
import NotFound from "./pages/NotFound";
import SingleImage from "./components/SingleImage";
import Error from "./pages/Error"
import './App.css';

export default function App() {
  let location = useLocation();
  let background = location.state && location.state.background;
  return (
    <>
        <Container>
          <MenuBar />
          <Routes location={background || location}>
            <Route path="/" element={<Home/>} />
            <Route path="/breeds" element={<Breeds/>} />
            <Route path="/breeds/:id" element={<SingleBreed/>} />
            <Route path="/favorite" element={<Favorites/>} />
            <Route path="not-found" element={<NotFound/>}/>
            <Route path="error" element={<Error/>}/>
            <Route path="/images/:id" element={<Home />}/>
             {background && <Route path="/images/:id" element={<SingleImage />}/>} 
            <Route path="*" element={<Navigate to="not-found"/>} />
          </Routes>
        </Container>
  </>
  );
}

