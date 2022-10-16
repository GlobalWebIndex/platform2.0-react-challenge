import { useContext } from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

import FavouriteButton from "../FavouriteButton/FavouriteButton";
import { CatContext } from "../../Context/CatContext";
import { Cat } from "../../types/types";
import { catItemStyles } from "./styles";

type Props = {
  cat: Cat;
};

const CatItem: React.FC<Props> = ({ cat }) => {
  const { setSelectedCat } = useContext(CatContext);

  const onImageClick = () => setSelectedCat(cat);

  const classes = catItemStyles();

  return (
    <Grid container item justifyContent="center" p={3} xs="auto">
      <Grid item xs={12}>
        <Link onClick={onImageClick} to={`/cats/${cat.id}`}>
          <img alt="Cat Photo" className={classes.image} src={cat.url} />
        </Link>
      </Grid>
      <FavouriteButton cat={cat} />
    </Grid>
  );
};

export default CatItem;
