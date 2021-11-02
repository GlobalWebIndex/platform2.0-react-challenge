import { createUseStyles } from "react-jss"

export const useFavouritesListStyles = createUseStyles({
  emptyState: {
    font: "15px/18px Helvetica",
    color: "#8a6d3b",
    background: "#fcf8e3",
    border: "1px solid #faebcc",
    padding: [15],
    borderRadius: "4px"
  },
  emptyLink: {
    textDecoration: "none",
    color: "#8a6d3b",
    fontWeight: "bold",
    fontStyle: "italic",

    '&:hover': {
      textDecoration: "underline"
    }
  }
})