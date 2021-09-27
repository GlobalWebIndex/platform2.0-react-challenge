import React from "react";
import { ImageType } from "types/images";
import ImagesListItem from "./ImagesListItem/ImagesListItem";

type Props = {
  images: ImageType[];
};

const ImagesList: React.FC<Props> = ({ images }) => {
  return (
    <div>
      {images.map((image) => {
        return <ImagesListItem source={image.url} alt={image.id} />;
      })}
    </div>
  );
};

export default ImagesList;
