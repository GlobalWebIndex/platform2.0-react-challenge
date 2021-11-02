import { createUseStyles } from "react-jss"

export const useFavouriteStyles = createUseStyles({
  favouritesWrapper: {
    margin: [10, 0, 0],
  },
  button: {
    width: "20px",
    height: "20px",
    background: "none",
    border: "none",
    padding: 0,
    margin: [0, 5, 0, 0]
  },
  favIcon: {
    width: "20px",
    height: "20px",
    position: "relative",
    top: "3px",
    cursor: "pointer"
  }
})