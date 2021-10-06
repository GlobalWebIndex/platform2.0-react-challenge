import React from "react";

import { Helmet } from "react-helmet";

import FavoriteContainer from "components/FavoritesContainer";

import "./style.scss";

const Favorites = () => {
  return (
    <section className="gc-page">
      <Helmet>
        <meta name="description" content="Favorites" />
      </Helmet>
      <FavoriteContainer />
    </section>
  );
};

export default Favorites;
