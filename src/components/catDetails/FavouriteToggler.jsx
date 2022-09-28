import React, { useEffect, useState, useCallback } from "react";
import { HeartOutlined, HeartFilled, LoadingOutlined } from "@ant-design/icons";
import { addFavourite, fetchFavourites, removeFavourite } from "../../util/api";
import FavouriteButton from "./FavouriteButton";
import { useStyles } from "./FavouriteToggler.style";

const FavouriteToggler = ({ imageId = "" }) => {
  const classes = useStyles();
  const [favourite, setFavourite] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAsyncFavourite = useCallback(async () => {
    setIsLoading(true);
    const response = await fetchFavourites();

    if (response?.length) {
      const foundFavourite =
        response.find((favourite) => favourite.image_id === imageId) || null;
      setFavourite(foundFavourite);
    }
    setIsLoading(false);
  }, [imageId]);

  const onToggleFavourite = useCallback(async () => {
    setIsLoading(true);

    // TODO: Error handling could be definitely improved here!
    if (favourite) {
      await removeFavourite(favourite.id);
      setFavourite(null);
    } else {
      const response = await addFavourite(imageId);
      setFavourite(response);
    }

    setIsLoading(false);
  }, [imageId, favourite]);

  useEffect(() => {
    fetchAsyncFavourite();
  }, [fetchAsyncFavourite]);

  if (!imageId) {
    return null;
  }

  if (isLoading) {
    return (
      <FavouriteButton disabled>
        <LoadingOutlined />
      </FavouriteButton>
    );
  }

  if (favourite) {
    return (
      <FavouriteButton onClick={onToggleFavourite}>
        <HeartFilled className={classes.favouriteIcon} /> Remove from favourites
      </FavouriteButton>
    );
  }

  return (
    <FavouriteButton onClick={onToggleFavourite}>
      <HeartOutlined className={classes.favouriteIcon} /> Add as a favourite!
    </FavouriteButton>
  );
};

FavouriteToggler.propTypes = {};

export default FavouriteToggler;
