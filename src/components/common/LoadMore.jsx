import React from "react";
import PropTypes from "prop-types";
import { useStyles } from "./LoadMore.style";
import noop from "../../util/noop";

function LoadMore({ onClick = noop, isLoadingMore = false }) {
  const classes = useStyles();

  return (
    <div className={classes.loadMoreWrapper}>
      <button
        disabled={isLoadingMore}
        className={classes.loadMoreButton}
        onClick={onClick}
        data-testid="load-more"
      >
        {isLoadingMore ? `Loading...` : `Load More`}
      </button>
    </div>
  );
}

LoadMore.propTypes = {
  onClick: PropTypes.func,
  isLoadingMore: PropTypes.bool,
};

export default LoadMore;
