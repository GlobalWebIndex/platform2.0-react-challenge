import { createUseStyles } from "react-jss"

export const useLoadMoreStyles = createUseStyles({
  loadMoreWrapper: {
    marginTop: "30px"
  },
  loadMoreButton: {
    background: "#e2b71c",
    display: "block",
    textAlign: "center",
    font: "600 16px/25px Arial",
    border: "none",
    textTransform: "uppercase",
    color: "#fff",
    padding: [15],
    margin: [0, 'auto'],
    cursor: "pointer",
    outline: "none",

    "&:hover": {
      opacity: 0.8,
    },
  }
})