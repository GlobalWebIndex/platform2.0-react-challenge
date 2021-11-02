import React, { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import { List } from "../common"
import { ImageListItem } from "../images"
import { PageTitle } from "../layout"
import { getStoredItems } from "../../util"
import { useFavouritesListStyles } from "./FavouritesList.styles"

function FavouritesList() {
  const classes = useFavouritesListStyles()
  const [favouriteList, setFavouriteList] = useState({})
  // This reference is used to avoid memory leaks on updating
  // state to unmounted components.
  const isMountedVal = useRef(1);

  // Get the stored items and check whether the image id exists.
  const getFavourites = async () => {
    // Get all the stored favourited items.
    const storedFavs = await getStoredItems('favourites')
    // Collect only the favourited item ids.
    const storedFavKeys = Object.keys(storedFavs)
    // Get all the stored images.
    const storedImages = await getStoredItems('images')
    // From the stored images keep only the ones that are included on /
    // the favourites.
    const favList = Object.values(storedImages).filter(
      img => storedFavKeys.includes(img.id)
    )

    isMountedVal.current && setFavouriteList(favList)
  }

  useEffect(() => {
    isMountedVal.current = 1;
    getFavourites()

    return () => {
      isMountedVal.current = 0
    }
  }, [favouriteList])

  const hasFavItems = Object.values(favouriteList).length > 0

  return (
    <>
      <PageTitle title="Favourites" />
      {!hasFavItems && (
        <div className={classes.emptyState}>
          <span>
            No favourite items yet. Please add some by visiting the <Link to="/" className={classes.emptyLink}>Images</Link> page.
          </span>
        </div>
      )}
      {hasFavItems && (
        <div>
          <List listItems={Object.values(favouriteList)} component={ImageListItem} path="image" />
        </div>
      )}
    </>
  )
}

export default FavouritesList