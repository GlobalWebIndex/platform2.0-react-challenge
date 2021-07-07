import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  logo: {
    height: 48,
    borderRadius: "12px 0 12px 0",
    padding: 4
  },
  title: {
    flexGrow: 1
  }
}));

export default function Header() {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Link to="/">
          <img
            alt="Plato's cat"
            src="https://i.imgur.com/XFV8I3d.png"
            className={classes.logo}
          />
        </Link>
      </Toolbar>
    </AppBar>
  );
}
