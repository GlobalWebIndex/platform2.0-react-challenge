import { FC, useEffect, useState } from 'react'
import CatsApi from '../../api/cats.api'
import CatImages from '../../components/CatImages'
import { FavoriteType } from '../../types/Favorite.type'
import { ImageType } from '../../types/Image.type'

const FavoritesPage: FC = () => {
  const [favorites, setFavorites] = useState<FavoriteType[]>([])
  const [images, setImages] = useState<ImageType[]>([])

  async function removeFavorite(favoriteId: number) {
    const favoriteResponse = await CatsApi.deleteFavoriteById(favoriteId)

    if (favoriteResponse.data.message === 'SUCCESS') {
      const filteredFavorites = favorites.filter(it => it.id !== favoriteId)
      addFavoritesToState(filteredFavorites)
    }
  }

  function addFavoritesToState(favoritesToAdd: FavoriteType[]) {
    setFavorites(favoritesToAdd)
    setImages(favoritesToAdd.map(favorite => favorite.image))
  }

  async function getFavorites() {
    const favoritesResponse = await CatsApi.getFavorites()

    const favoritesArray = [...favorites, ...favoritesResponse.data]
    addFavoritesToState(favoritesArray)
  }

  /**
   * This effect is responsible to load breeds via API
   */
  useEffect(() => {
    getFavorites()
    // clean up
    return () => {}
  }, [])

  return (
    <>
      {images.length ? (
        <CatImages
          images={images}
          showFavoriteAction
          isFavorite
          onFavoriteClick={imageId => {
            const favoriteId = favorites.find(it => it.image.id === imageId)?.id
            if (favoriteId) {
              removeFavorite(favoriteId)
            }
          }}
        />
      ) : (
        <p>It seems that you didn&apos;t find your favorite image yet :( </p>
      )}
    </>
  )
}

export default FavoritesPage
