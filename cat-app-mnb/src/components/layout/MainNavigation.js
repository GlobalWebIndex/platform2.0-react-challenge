import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Cat-Challenge</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink
              to="/cats"
              className={(navData) => (navData.isActive ? classes.active : "")}
            >
              All Cats
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/breeds"
              className={(navData) => (navData.isActive ? classes.active : "")}
            >
              Breeds
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorites"
              className={(navData) => (navData.isActive ? classes.active : "")}
            >
              Favorites
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
