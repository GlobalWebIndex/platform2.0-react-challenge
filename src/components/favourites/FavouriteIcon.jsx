import React, { useCallback, useState, useEffect } from "react"
import { useFavouriteStyles } from "./FavouriteIcon.styles"
import { favouritesRequests, getStoredItems } from "../../util"
import favouriteEmpty from "./assets/favourite-empty.png"
import favourite from "./assets/favourite.png"

function FavouriteIcon({ imageId }) {
  const classes = useFavouriteStyles()
  const [error, setError] = useState(false)
  const [isFavItem, setIsFavItem] = useState(false)

  // Get the stored items and check whether the image id exists.
  const checkFavsForItem = async () => {
    const storedFavs = await getStoredItems('favourites')
    setIsFavItem(!!storedFavs[imageId])
  }

  useEffect(() => {
    checkFavsForItem()
  }, [imageId])

  const favouriteItem = useCallback(async () => {
    const {
      isFavourited,
      errorThrown
    } = await favouritesRequests(imageId)

    setError(errorThrown)
    setIsFavItem(isFavourited)
  },[imageId])

  const favouriteText = `${isFavItem ? 'Remove from' : 'Add to'} Favourites`

  return (
    <div className={classes.favouritesWrapper}>
      {error && (
        <div>Something went wrong</div>
      )}
      <button 
        className={classes.button} 
        onClick={favouriteItem}
      >
        <img 
          src={isFavItem ? favourite : favouriteEmpty } 
          alt={favouriteText} 
          className={classes.favIcon}
        />
      </button>
      <span>{favouriteText}</span>
    </div>
  )
}

export default FavouriteIcon