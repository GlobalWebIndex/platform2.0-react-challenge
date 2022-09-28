import React from "react";
import PropTypes from "prop-types";

const Header = ({ title }) => {
  return !title ? null : (
    <header data-testid="header" className="title">
      <h1>{title}</h1>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
