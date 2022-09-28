import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  loadMoreWrapper: {
    marginTop: 30,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  loadMoreButton: {
    backgroundColor: "#8b0000",
    color: "#fff",
    display: "block",
    textAlign: "center",
    textTransform: "uppercase",
    padding: [15, 60],
    margin: [0, "auto"],
    cursor: "pointer",
    outline: "none",

    "&:hover": {
      backgroundColor: "#3b0000",
    },

    "&:disabled": {
      opacity: "0.5",
      "&:hover": {
        backgroundColor: "#8b0000",
      },
    },
  },
});
