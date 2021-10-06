import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { If } from "components/Logic";

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { DeferredContent } from "primereact/deferredcontent";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { ToggleButton } from "primereact/togglebutton";

import { useStore } from "store";
import shallow from "zustand/shallow";
import { useMount, useUnmount } from "react-use";

import "./style.scss";

const CatCard = ({ cat }) => {
  const [isFavoriteCat, addFavoriteCat] = useStore(
    (state) => [state.isFavoriteCat, state.addFavoriteCat],
    shallow
  );

  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [favoriteCheck, setFavoriteCheck] = useState(false);

  const inputEl = useRef(null);
  const imageEl = useRef(null);

  useMount(() => {
    setFavoriteCheck(isFavoriteCat(cat));
    imageEl.current && console.log(imageEl.current.complete);
  });

  useUnmount(() => {});

  function onClickToggleDialog() {
    setIsDialogVisible(!isDialogVisible);
  }

  function onClickCopyImageUrl() {
    inputEl.current.select();
    document.execCommand("copy");
  }

  function onChangeToggleFavorite(e) {
    setFavoriteCheck(e.value);
    addFavoriteCat(cat);
  }

  return (
    <Card className="gc-cat-card">
      <DeferredContent>
        <Button className="p-button-outlined" onClick={onClickToggleDialog}>
          <img alt="Cat" src={cat.url} width="250" height="250" ref={imageEl} />
        </Button>
      </DeferredContent>
      <Dialog
        visible={isDialogVisible}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "50vw" }}
        onHide={onClickToggleDialog}
        footer={
          <div className="gc-cat-card__modal-footer">
            <div className="p-inputgroup">
              <InputText
                value={`${window.location.host}/${cat.id}`}
                placeholder="Vote"
                ref={inputEl}
              />
              <Button
                icon="pi pi-copy"
                className="p-button-outlined"
                onClick={onClickCopyImageUrl}
              />
              <ToggleButton
                checked={favoriteCheck}
                onChange={onChangeToggleFavorite}
                onIcon="pi pi-heart"
                offIcon="pi pi-heart"
                onLabel={""}
                offLabel={""}
              />
            </div>
            <If show={!!cat.breeds?.length}>
              <Link to="/breeds">
                <Button label="Go to Breeds" className="p-button-text" />
              </Link>
            </If>
          </div>
        }
      >
        <Image src={cat.url} alt="Image" width="250" height="250" />
        <If show={!!cat.breeds?.length}>
          {cat.breeds?.map((breed) => (
            <p key={breed.id}>{breed.description}</p>
          ))}
        </If>
      </Dialog>
    </Card>
  );
};

CatCard.propTypes = {
  cat: PropTypes.shape({
    id: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default CatCard;
