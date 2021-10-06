import React from "react";

import { Helmet } from "react-helmet";

import BreedsContainer from "components/BreedsContainer";

import "./style.scss";

const Breeds = () => {
  return (
    <section className="gc-page">
      <Helmet>
        <meta name="description" content="Breeds" />
      </Helmet>
      <BreedsContainer />
    </section>
  );
};

export default Breeds;
