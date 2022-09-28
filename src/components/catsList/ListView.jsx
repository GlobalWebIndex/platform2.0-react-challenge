import React from "react";
import Header from "../common/Header";
import List from "./List";

const ListView = () => {
  return (
    <>
      <Header title="Some random 🐈 pics..." />
      <List />
    </>
  );
};

ListView.propTypes = {};

export default ListView;
