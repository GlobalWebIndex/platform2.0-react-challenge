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
  // Should handle errors here! let's hope they don't happen 🤞🏽
  const [unfLoading, , unfavourite] = useUnfavourite({
    favourite_id: favouriteId
  });
  const [favLoading, , favourite] = useFavourite({
    image_id: catId,
    sub_id: localStorage.SUB_ID
  });

  const [isLoading, setIsLoading] = useState(
    loading || favLoading || unfLoading
  );

  // 200ms is snappier for this interaction
  useEffect(() => {
    const nowLoading = loading || favLoading || unfLoading;
    if (nowLoading) setIsLoading(true);
    const timeout = setTimeout(() => {
      isLoading !== nowLoading && setIsLoading(nowLoading);
    }, 200);
    return () => clearTimeout(timeout);
  }, [loading, favLoading, unfLoading, setIsLoading, isLoading]);

  if (isLoading) return <Progress small />;
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
