import { useContext } from "react";
import { Grid } from "@mui/material";

import CatsList from "../CatsList/CatsList";
import { CatContext } from "../../Context/CatContext";
import { Favourite } from "../../types/types";
import { styles } from "./styles";

const FavouritesPage = () => {
  const { favourites } = useContext(CatContext);

  const cats = favourites.map((favourite: Favourite) => ({
    id: favourite.image.id,
    url: favourite.image.url,
  }));

  const classes = styles();

  return (
    <Grid alignItems="center" className={classes.background} container item>
      <CatsList cats={cats} />
    </Grid>
  );
};

export default FavouritesPage;
