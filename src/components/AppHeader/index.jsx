import React from "react";

import { Link } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";

import "./style.scss";

const AppHeader = () => {
  const items = [
    {
      template: () => (
        <Link to="/">
          <Button
            label="Cats"
            icon="pi pi-fw pi-home"
            className="p-button-secondary p-button-text"
          />
        </Link>
      ),
    },
    {
      template: () => (
        <Link to="/breeds">
          <Button
            label="Breeds"
            icon="pi pi-fw pi-images"
            className="p-button-secondary p-button-text"
          />
        </Link>
      ),
    },
    {
      template: () => (
        <Link to="/favorites">
          <Button
            label="Favorites"
            icon="pi pi-fw pi-user"
            className="p-button-secondary p-button-text"
          />
        </Link>
      ),
    },
  ];

  return (
    <Menubar
      className="gc-header"
      model={items}
      start={
        <Link to="/">
          <div className="p-shadow-24">MEOW</div>
        </Link>
      }
    />
  );
};

export default AppHeader;
