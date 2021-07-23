import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { fetchFavoriteList } from "../api/requests";
import FavoriteCard from "../components/FavoriteCard";
import Loading from "../components/Loading";
import { IFavorites } from "../models/models";
import { FaRegSadCry } from "react-icons/fa";

const FavoriteList: React.FC = () => {
  const [favorites, setFavorites] = useState<IFavorites[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchFavoriteList().then((resp) => {
      setIsLoading(false);
      setFavorites(resp);
    });
  }, [favorites.length]);

  const removeFav = (id: number) => {
    const _favs = favorites.filter((x) => x.id !== id);
    setFavorites(_favs);
  };

  if (isLoading) {
    return <Loading />;
  }
  if (favorites.length <= 0) {
    return (
      <Row>
        <Col className="text-center" md={{ span: 4, offset: 4 }}>
          <Alert variant="danger">
            <FaRegSadCry size={30} /> You have no favorite cats!!{" "}
            <FaRegSadCry size={30} />
          </Alert>
        </Col>
      </Row>
    );
  }
  return (
    <Row>
      {favorites.map((fav, index) => (
        <FavoriteCard key={index} fav={fav} removeFav={removeFav} />
      ))}
    </Row>
  );
};

export default FavoriteList;
