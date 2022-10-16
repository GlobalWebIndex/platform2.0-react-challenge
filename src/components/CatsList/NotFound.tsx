import { useContext } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

import { CatContext } from "../../Context/CatContext";
import { sharedTextStyle } from "./styles";

const NotFound = () => {
  const { loading } = useContext(CatContext);

  const classes = sharedTextStyle();

  return !loading ? (
    <Grid item xs>
      <Link className={classes.link} to="/">
        <Typography className={classes.title} textAlign="center" variant="h2">
          Cat<span className={classes.loverColor}>Lover</span>
        </Typography>
      </Link>
      <Typography className={classes.textColor} textAlign="center" variant="h6">
        Unfortunately there are no cats to show
      </Typography>
    </Grid>
  ) : null;
};

export default NotFound;
