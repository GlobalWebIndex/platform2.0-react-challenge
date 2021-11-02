import React from "react"
import { useImageListItemStyles } from "./ImageListItem.styles"

function ImageListItem({ item }) {
  const classes = useImageListItemStyles()
  return (
    <>
      <img className={classes.image} src={item.url} alt={item.id} />
      {/* The following item, is just for quickly identifying the images with availabe breeds */}
      {item?.breeds?.length > 0 && (
        <span className={classes.breedAvailable} />
      )}
    </>
  )
}

export default ImageListItem