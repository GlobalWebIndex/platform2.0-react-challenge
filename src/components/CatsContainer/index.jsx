import React from "react";
import shallow from "zustand/shallow";

import { useParams } from "react-router-dom";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import CatCard from "components/CatCard";
import { If } from "components/Logic";

import { useMount } from "react-use";
import { useStore } from "store";

import "./style.scss";

const CatContainer = () => {
  let { id } = useParams();

  const [cats, fetchCats, fetchCat, loading] = useStore(
    (state) => [state.cats, state.fetchCats, state.fetchCat, state.loading],
    shallow
  );

  useMount(() => {
    if (id) fetchCat(id);
    else if (!cats.length) fetchCats(10);
  });

  async function onClickFetchMoreCats() {
    await fetchCats(10);
  }

  return (
    <div className="gc-container">
      <Toolbar
        left={
          <Button
            label="Load more"
            className="p-mr-2"
            onClick={onClickFetchMoreCats}
            loading={loading}
          />
        }
        className="gc-container__toolbar"
      />
      <div className="gc-container__cat-cards">
        <If show={!!cats.length}>
          {cats.map((cat) => {
            return <CatCard key={cat.id} cat={cat} />;
          })}
        </If>
      </div>
    </div>
  );
};

export default CatContainer;
