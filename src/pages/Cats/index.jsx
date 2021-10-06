import React from "react";

import { Helmet } from "react-helmet";

import CatContainer from "components/CatsContainer";

import "./style.scss";

const Cats = () => {
  return (
    <section className="gc-page">
      <Helmet>
        <meta name="description" content="Cats random images" />
      </Helmet>
      <CatContainer />
    </section>
  );
};

export default Cats;
