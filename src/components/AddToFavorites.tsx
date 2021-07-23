import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { RiStarLine } from "react-icons/ri";
import { addToFavorites } from "../api/requests";
import {
  BootstrapVariants,
  DEFAULT_ERROR_MESSAGE,
} from "../constants/constants";
import useNotification from "../hooks/useNotification";
import { extractImageFromUrl } from "../utilities/utils";

interface IAddToFavoritesProps {
  imageUrl?: string;
}

const AddToFavorites: React.FC<IAddToFavoritesProps> = ({ imageUrl }) => {
  const { addNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const add = async () => {
    setIsLoading(true);
    const idToAdd = extractImageFromUrl(imageUrl);
    const reply = await addToFavorites(idToAdd);
    if (reply.ok) {
      addNotification({
        message: "Cat added to favorites",
        type: BootstrapVariants.SUCCESS,
      });
      setIsLoading(false);
    } else {
      addNotification({
        message: DEFAULT_ERROR_MESSAGE,
        type: BootstrapVariants.SUCCESS,
      });
    }
  };

  return (
    <React.Fragment>
      <Button
        disabled={isLoading}
        onClick={add}
        variant="warning"
        className="me-2"
      >
        <RiStarLine className="mb-1" />
      </Button>
    </React.Fragment>
  );
};

export default AddToFavorites;
