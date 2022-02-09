import { AnimatePresence } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../context";
import ThemesModal from "../ThemesModal/ThemesModal";
import { Nav, Center, Li, Theme } from "./Navbar.styled";

const Navbar = () => {
  let { pathname } = useLocation();

  const {
    state: { showThemesModal },
    handleThemesClick,
  } = useGlobalContext();

  const themesElement = useRef();

  const [position, setPosition] = useState(null);

  useEffect(() => {
    const element = themesElement.current.getBoundingClientRect();

    let left = Math.floor(element.x + element.width / 2 - 80);
    let y = Math.floor(element.y + 30);

    setPosition({ left, y });
  }, [showThemesModal]);

  return (
    <Nav>
      <Center>
        <ul>
          <Li pathname={pathname} name={"/"}>
            <Link to="/">Cats</Link>
          </Li>
          <Li pathname={pathname} name={"/breeds"}>
            <Link to="/breeds">Breeds</Link>
          </Li>
          <Li pathname={pathname} name={"/favorites"}>
            <Link to="/favorites">Favorites</Link>
          </Li>
        </ul>
        <Theme
          ref={themesElement}
          onClick={handleThemesClick}
          open={showThemesModal && "open"}
        >
          Themes
        </Theme>
      </Center>
      <AnimatePresence>
        {showThemesModal && <ThemesModal position={position} />}
      </AnimatePresence>
    </Nav>
  );
};

export default Navbar;
