import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  cardItem: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flexFlow: "column",
    borderRadius: 3,
    boxShadow: "0px 0 3px 1px #8b8b8b",
    background: "#444",
    color: "#fff",

    "&:hover": {
      transform: (options) => (options?.isInGrid ? "scale(1.1)" : "none"),
      boxShadow: (options) =>
        options?.isInGrid ? "0px 0 9px 2px #000" : "none",
    },

    "& a": {
      color: "#fff",
    },
  },
  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  cardTitle: {
    padding: 15,
  },
  cardChildren: {
    margin: [10, 0],
  },
});
