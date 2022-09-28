import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "../App.styles";
import { Routes as RoutesConfig } from "../../constants";
import Header from "../common/Header";

const NotFound = () => {
  const classes = useStyles();
  return (
    <>
      <Header title="Whoa! This page does not exist!" />
      <div>
        Not sure how you ended up here but if you really love cats 🐈 and want
        to see more just{" "}
        <Link to={RoutesConfig.home} className={classes.contentLink}>
          go back to the homepage
        </Link>
      </div>
    </>
  );
};

export default NotFound;
