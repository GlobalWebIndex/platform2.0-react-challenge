import React from "react";
import { Button, Card } from "react-bootstrap";
import { IFavorites } from "../models/models";
import { RiDeleteBin7Line } from "react-icons/ri";
import { deleteFavorite } from "../api/requests";
import useNotification from "../hooks/useNotification";
import { BootstrapVariants } from "../constants/constants";

interface IFavoriteCardProps {
  fav: IFavorites;
  removeFav: (id: number) => void;
}

const FavoriteCard: React.FC<IFavoriteCardProps> = ({ fav, removeFav }) => {
  const { addNotification } = useNotification();
  const deleteFav = async () => {
    var res = await deleteFavorite(fav.id);
    if (res.ok) {
      addNotification({
        message: "Cat image deleted",
        type: BootstrapVariants.SUCCESS,
      });
      removeFav(fav.id);
    } else {
      addNotification({ message: "Something went wront", type: "danger" });
    }
  };
  return (
    <Card className="card-style">
      <Card.Img className="cat-breed" variant="top" src={fav.image.url} />
      <Card.Body className="text-center">
        <Button size="sm" variant="danger" onClick={deleteFav}>
          <RiDeleteBin7Line className="mb-1" />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FavoriteCard;
