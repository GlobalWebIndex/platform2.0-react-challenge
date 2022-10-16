import { useContext } from "react";

import { CircularProgress, Grid } from "@mui/material";
import { styles } from "./styles";
import { CatContext } from "../../Context/CatContext";
import TopBarLink from "./TopBarLink";

const TopBar = () => {
  const context = useContext(CatContext);
  const { loading } = context;

  const classes = styles();

  return (
    <Grid
      className={classes.background}
      container
      item
      justifyContent="space-between"
      xs={12}
    >
      <Grid alignItems="center" container item xs="auto" spacing={5}>
        <TopBarLink
          text={
            <>
              Cat<span className={classes.loverColor}>Lover</span>
            </>
          }
          to="/"
          tooltip="Home"
          variant="h4"
        />
        <TopBarLink text="Breeds" to="/breeds" tooltip="Breeds" variant="h6" />
        <TopBarLink
          text="Favourites"
          to="/favourites"
          tooltip="Favourites Page"
          variant="h6"
        />
      </Grid>
      {loading ? (
        <Grid item xs="auto">
          <CircularProgress color="inherit" />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default TopBar;
