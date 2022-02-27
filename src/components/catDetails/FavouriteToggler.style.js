import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  favouriteToggler: {
    marginTop: 15,
  },
  favouriteButton: {
    backgroundColor: "#8b0000",
    color: "#fff",
    display: "block",
    textAlign: "center",
    textTransform: "uppercase",
    padding: [15, 60],
    margin: [0, "auto"],
    cursor: "pointer",
    outline: "none",
    border: 0,
    minWidth: 300,

    "&:hover": {
      backgroundColor: "#3b0000",
    },
    favouriteIcon: {
      color: "#fff",
    },
  },
});
