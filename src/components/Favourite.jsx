import { useEffect, useState } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Fab } from "@material-ui/core";

import { ENDPOINTS } from "../constants";

import { useAPI, useFavourite, useUnfavourite } from "../hooks/useData";
import Error from "./Error";
import Progress from "./Progress";

export default function Favourite({ catId }) {
  // WHY CAN'T I TEST AN IMAGE IN FAVOURITES
  const [loading, favourites, error, refetch] = useAPI(
    ENDPOINTS.GET_FAVOURITES({
      sub_id: localStorage.SUB_ID
    })
  );
  const favouriteId = favourites?.find(
    ({ image_id: fId }) => fId === catId
  )?.id;
  console.log(favourites, favouriteId);
  // Should handle errors here!
  const [unfLoading, unfError, unfavourite] = useUnfavourite({
    favourite_id: favouriteId
  });
  const [favLoading, favError, favourite] = useFavourite({
    image_id: catId,
    sub_id: localStorage.SUB_ID
  });

  const [isLoading, setIsLoading] = useState(loading);

  // 700ms is about a full circle and much more satisfying if you ask me
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(loading);
    }, 700);
    return () => clearTimeout(timeout);
  }, [loading]);

  if (isLoading) return <Progress />;
  if (error) return <Error />;

  if (favouriteId)
    return (
      <Fab
        onClick={() => unfavourite().then(refetch)}
        color="primary"
        aria-label="more"
        variant="extended"
      >
        <FavoriteIcon style={{ fill: "red" }} />
      </Fab>
    );
  return (
    <Fab
      onClick={() => favourite().then(refetch)}
      color="primary"
      aria-label="more"
      variant="extended"
    >
      <FavoriteBorderIcon style={{ fill: "darkgrey", marginRight: 4 }} />
      Give love
    </Fab>
  );
}
