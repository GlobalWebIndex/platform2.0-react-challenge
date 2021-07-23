import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ICatBreed } from "../models/models";

interface IFavoriteProps {
  breed: ICatBreed;
  imageUrl?: string;
}

const GoToBreedButton: React.FC<IFavoriteProps> = ({ breed, imageUrl }) => {
  return (
    <Button variant="light">
      <Link
        to={{
          pathname: `/breedDetail/${breed.id}`,
          state: { breed: breed, imageUrl: imageUrl },
        }}
      >
        GoTo Details
      </Link>
    </Button>
  );
};

export default GoToBreedButton;
