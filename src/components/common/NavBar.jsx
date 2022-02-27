import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Routes as RoutesConfig } from "../../constants";
import { useStyles } from "./NavBar.styles";

const NavBar = () => {
  const classes = useStyles();
  const getLinkItemClassName = (props) =>
    props.isActive ? classes.navLinkItemActive : classes.navLinkItem;

  return (
    <div className={classes.nav}>
      <div className={classes.navHeader}>
        <div className={classes.navTitle}>
          <img src="/logo.png" height="25" width="32" alt="logo" />
          <Link className={classes.navTitleText} to={RoutesConfig.home}>
            Cat lover
          </Link>
        </div>
      </div>

      <div className={classes.navLinks}>
        <NavLink className={getLinkItemClassName} to={RoutesConfig.home}>
          Home
        </NavLink>
        <NavLink className={getLinkItemClassName} to={RoutesConfig.breeds}>
          Breeds
        </NavLink>
        <NavLink className={getLinkItemClassName} to={RoutesConfig.favourites}>
          Favourites
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
