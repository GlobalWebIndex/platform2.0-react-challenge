import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  nav: {
    width: "100%",
    backgroundColor: "#fafafa",
    color: "#000",
    display: "flex",
    fontWeight: "bold",
    boxShadow: "0px 1px 5px 0px #b2b2b2",
  },

  navHeader: {
    display: "flex",
    flexGrow: 1,
  },

  navTitle: {
    display: "flex",
    fontSize: 22,
    padding: 10,
    alignItems: "center",
  },

  navTitleText: {
    marginLeft: 10,
    textDecoration: "none",
    color: "#000",
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
  },

  navLinkItem: {
    padding: [20, 10],
    textDecoration: "none",
    color: "#000",

    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  },

  navLinkItemActive: {
    composes: "$navLinkItem",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
});
