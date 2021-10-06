import React from "react";

import { ProgressSpinner } from "primereact/progressspinner";

import "./style.scss";

const Loading = () => {
  return (
    <div className="gc-loading">
      <ProgressSpinner />
    </div>
  );
};

export default Loading;
