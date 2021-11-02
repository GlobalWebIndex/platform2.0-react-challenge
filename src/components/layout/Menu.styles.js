import { createUseStyles } from "react-jss"

export const useMenuStyles = createUseStyles({
  menu: {
    margin: 0,
    padding: 0,
    listStyle: "none",
    display: "flex",
    gridTemplateColumns: "repeat(6, 1fr)",
    position: "relative",
  },
  menuItem: {
    textAlign: "right",
    margin: [0, 20, 0, 0],
    padding: 0,
    display: "inline-flex",
  },
  menuItemLink: {
    font: "700 15px/20px Helvetica",
    textDecoration: "none",
    color: "#000",
    display: "block",
    width: "100%",
    letterSpacing: "0.5px",

    "&:hover": {
      color: "#e2b71c",
    },
  },
})
