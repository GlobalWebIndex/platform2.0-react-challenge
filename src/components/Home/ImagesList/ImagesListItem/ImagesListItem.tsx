import React from "react";
import "./ImagesListItem.modules.css";

type Props = {
  source: string;
  alt: string;
};

const ImagesListItem: React.FC<Props> = ({ source, alt }) => {
  return <img src={source} alt={alt} />;
};

export default ImagesListItem;
