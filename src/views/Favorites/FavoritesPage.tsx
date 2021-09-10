import { FC, useEffect, useState } from 'react'
import CatsApi from '../../api/cats.api'
import CatImages from '../../components/CatImages'
import { FavoriteType } from '../../types/Favorite.type'
import { ImageType } from '../../types/Image.type'

const FavoritesPage: FC = () => {
  const [favorites, setFavorites] = useState<FavoriteType[]>([])
  const [images, setImages] = useState<ImageType[]>([])

  function removeFavorite(favoriteId: number) {
    CatsApi.deleteFavoriteById(favoriteId, favoriteResponse => {
      if (favoriteResponse.message === 'SUCCESS') {
        const filteredFavorites = favorites.filter(it => it.id !== favoriteId)
        addFavoritesToState(filteredFavorites)
      }
    })
  }

  function addFavoritesToState(favoritesToAdd: FavoriteType[]) {
    setFavorites(favoritesToAdd)
    setImages(favoritesToAdd.map(favorite => favorite.image))
  }

  /**
   * This effect is responsible to load breeds via API
   */
  useEffect(() => {
    CatsApi.getFavorites(favoritesResponse => {
      const favoritesArray = [...favorites, ...favoritesResponse]
      addFavoritesToState(favoritesArray)
    })

    // clean up. Like we do with componentDidUpdate
    return () => {}
  }, [])

  return (
    <>
      {images.length ? (
        <CatImages
          images={images}
          onClickImage={imageId => {
            const favoriteId = favorites.find(it => it.image.id === imageId)?.id
            if (favoriteId) {
              removeFavorite(favoriteId)
            }
          }}
        />
      ) : (
        "It seems that you didn't find your favorite image yet :( "
      )}
    </>
  )
}

export default FavoritesPage
