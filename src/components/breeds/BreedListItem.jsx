import React from "react"
import { useBreedListItemStyles } from "./BreedListItem.styles"

function BreedListItem({ item }) {
  const imageUrl = item?.image?.url || ''
  const classes = useBreedListItemStyles()
  return (
    <div className={classes.listItem}>
      {imageUrl && (
        <img className={classes.image} src={imageUrl} alt={item.name} />
      )}
      <div className={classes.breedName}>{item.name}</div>
    </div>
  )
}

export default BreedListItem