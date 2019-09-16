import React from "react";
import Gallery from "react-photo-gallery";

const handlePhotoClick = handleClick => (event, { photo }) => {
  handleClick(photo);
};

export default function CatGallery({ cats, handleClick }) {
  return <Gallery photos={cats} onClick={handlePhotoClick(handleClick)} />;
}
