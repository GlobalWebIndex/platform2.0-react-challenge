import React, { useState } from "react";
import shallow from "zustand/shallow";

import { OrderList } from "primereact/orderlist";
import { If } from "components/Logic";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

import { useMount } from "react-use";
import { useStore } from "store";

import "./style.scss";
import CatCard from "../CatCard";

const BreedsContainer = () => {
  const [
    breeds,
    fetchBreeds,
    breedsImages,
    fetchBreedsImages,
    clearBreedsImages,
  ] = useStore(
    (state) => [
      state.breeds,
      state.fetchBreeds,
      state.breedsImages,
      state.fetchBreedsImages,
      state.clearBreedsImages,
    ],
    shallow
  );
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useMount(() => {
    if (!breeds.length) fetchBreeds(40);
  });

  function onClickToggleDialog(e) {
    if (e?.currentTarget?.id) fetchBreedsImages(e?.currentTarget?.id);
    else clearBreedsImages();

    setIsDialogVisible(!isDialogVisible);
  }

  return (
    <div className="gc-container">
      <If show={!!breeds.length}>
        <OrderList
          className=""
          value={breeds}
          header="List of Breeds"
          dataKey="id"
          itemTemplate={(item) => (
            <Button
              id={item.id}
              label={item.name}
              className="p-button-text"
              onClick={onClickToggleDialog}
            />
          )}
        />
      </If>
      <Dialog
        visible={isDialogVisible}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "50vw" }}
        onHide={onClickToggleDialog}
      >
        <If show={!!breedsImages.length}>
          {breedsImages.map((cat) => {
            return <CatCard key={cat.id} cat={cat} />;
          })}
        </If>
      </Dialog>
    </div>
  );
};

export default BreedsContainer;
