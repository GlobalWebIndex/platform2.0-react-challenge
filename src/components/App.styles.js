import { createUseStyles } from "react-jss";

export let useStyles = createUseStyles({
  content: {
    padding: 20,
    margin: 20,
    backgroundColor: "#fff",
    boxShadow: "0px 0px 10px 0px #b2b2b2",
    borderRadius: 10,
  },

  contentLink: {
    color: "#8b0000",
    textDecoration: "none",

    "&:hover": {
      color: "#fff",
      backgroundColor: "#8b0000",
      padding: [0, 2],
    },
  },
});
