import React, { FC } from "react";
import { Outlet } from "react-router";
import Header from "../../components/Header/Header";

const menuItems = [
  {
    menuTitle: "Home",
    pageURL: "/",
  },
  {
    menuTitle: "Cat Breeds",
    pageURL: "/breeds",
  },
  {
    menuTitle: "Favourite Cats",
    pageURL: "/favouritecats",
  },
];

const Layout: FC = () => {
  return (
    <>
      <Header menuItems={menuItems} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
