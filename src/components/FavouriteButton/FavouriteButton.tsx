import { useContext } from "react";
import { Grid, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { CatContext } from "../../Context/CatContext";
import { addFavourite, deleteFavourite } from "../../api/api";
import { Cat, Favourite } from "../../types/types";

type Props = {
  cat: Cat;
};

const FavouriteButton: React.FC<Props> = ({ cat }) => {
  const { favourites, loading, setFavourites, setLoading } =
    useContext(CatContext);

  const onFavoriteClick = async () => {
    setLoading(true);

    const favourite = favourites.find(
      (favourite) => favourite.image.id === cat.id
    );

    const response = favourite
      ? await deleteFavourite(favourite.id)
      : await addFavourite(cat.id);

    if (response.message === "SUCCESS") {
      let newFavourites: Favourite[] = [];

      if (favourite)
        newFavourites = favourites.filter(
          (favourite) => favourite.image.id !== cat.id
        );
      else {
        const favourite: Favourite = {
          id: response.id,
          image: {
            id: cat.id,
            url: cat.url,
          },
        };
        newFavourites = [...favourites, favourite];
      }
      setFavourites(newFavourites);
    }

    setLoading(false);
  };

  return (
    <Grid item xs="auto">
      <IconButton disabled={loading} onClick={onFavoriteClick}>
        {favourites.map((favourite) => favourite.image.id).includes(cat.id) ? (
          <FavoriteIcon color="error" fontSize="large" />
        ) : (
          <FavoriteBorderIcon fontSize="large" />
        )}
      </IconButton>
    </Grid>
  );
};

export default FavouriteButton;
