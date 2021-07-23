import React from "react";
import { Card, Image } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { ICatData } from "../../models/models";
import "./CatCard.css";

interface ICatCardProps {
  catData: ICatData;
}

const CatCard: React.FC<ICatCardProps> = ({ catData }) => {
  const location = useLocation();
  
  return (
    <Card className="card-style">
      <Link
        to={{
          pathname: `/breed/${catData.id}`,
          state: { background: location, catData: catData },
        }}
      >
        <Image className={catData.breeds.length > 0 ? "cat-breed": "cat-breed-but-red"} src={catData.url} rounded fluid />
      </Link>
    </Card>
  );
};

export default CatCard;
