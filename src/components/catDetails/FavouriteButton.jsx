import React from "react";
import PropTypes from "prop-types";
import { useStyles } from "./FavouriteToggler.style";
import noop from "../../util/noop";

const FavouriteButton = ({ children, disabled = false, onClick = noop }) => {
  const classes = useStyles();

  return (
    <div className={classes.favouriteToggler}>
      <button
        className={classes.favouriteButton}
        disabled={disabled}
        onClick={onClick}
        data-testid="favourite-button"
      >
        {children}
      </button>
    </div>
  );
};

FavouriteButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default FavouriteButton;
