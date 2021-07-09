import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    flexGrow: 1,
    dispay: "flex",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    alignItems: "center"
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
  const history = useHistory();
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
      <Button onClick={() => history.push("/")}>Cats</Button>
      <Button onClick={() => history.push("/breeds")}>Breeds</Button>
      <Button onClick={() => history.push("/favourites")}>My Favs</Button>
    </AppBar>
  );
}
