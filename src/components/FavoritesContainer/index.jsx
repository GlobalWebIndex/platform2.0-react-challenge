import React from "react";
import shallow from "zustand/shallow";

import CatCard from "components/CatCard";
import { If } from "components/Logic";

import { useStore } from "store";

import "./style.scss";

const FavoriteContainer = () => {
  const [favoriteCats] = useStore((state) => [state.favoriteCats], shallow);

  return (
    <div className="gc-container">
      <div className="gc-container__cat-cards">
        <If show={!!favoriteCats.length}>
          {favoriteCats.map((cat) => {
            return <CatCard key={cat.id} cat={cat} />;
          })}
        </If>
      </div>
    </div>
  );
};

export default FavoriteContainer;
