import React from "react"
import { useLoadMoreStyles } from "./LoadMore.style"

function LoadMore({ onClick }) {
  const classes = useLoadMoreStyles()
  const clickHandler = () => onClick()

  return (
    <div className={classes.loadMoreWrapper}>
      <button className={classes.loadMoreButton} onClick={clickHandler}>
        Load More
      </button>
    </div>
  )
}

export default LoadMore