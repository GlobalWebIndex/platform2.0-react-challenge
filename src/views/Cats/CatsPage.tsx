import { FC, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import CatsApi from '../../api/cats.api'
import LoadMoreButton from '../../components/LoadMoreButton'
import { FavoriteType } from '../../types/Favorite.type'
import { ImageType } from '../../types/Image.type'
import { SortingOrder } from '../../types/Sorting-order.type'
import LocationUtility from '../../utils/location.utils'
import CatDetails from './CatDetails'
import CatImages from './CatImages'

const CatsPage: FC = () => {
  const [images, setImages] = useState<ImageType[]>([])
  const [limit, setLimit] = useState(10)
  const [order, setOrder] = useState<SortingOrder>('Asc')
  const [page, setPage] = useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [selectedImage, setSelectedImage] = useState<ImageType | null>()
  const [selectedImageFavorite, setSelectedImageFavorite] =
    useState<FavoriteType>()
  const [selectedImageIsFavorite, setSelectedImageIsFavorite] =
    useState<boolean>(false)
  const history = useHistory()
  const location = useLocation()

  function nextPage() {
    setPage(it => it + 1)
  }

  function setSelectedCatOnUrl(id: string) {
    history.push({
      pathname: window.location.pathname,
      search: `?imageId=${id}`,
    })
  }

  function closeModal() {
    history.push({ pathname: window.location.pathname })
  }

  // TODO: change the name
  function listenToCatIdAndOpenModal() {
    const imageId = LocationUtility.useQuery(location.search).get('imageId')

    // as soon as we have a imageId in the url, the modal appears
    setIsModalVisible(!!imageId)
    if (imageId) {
      CatsApi.getImage(imageId, catResponse => {
        setSelectedImage(catResponse)
      })

      // If the response of this API call has length > 0, means that the selected image is a favorite one
      CatsApi.getFavoriteByImageId(imageId, favoriteResponse => {
        setSelectedImageFavorite(favoriteResponse?.[0])
        setSelectedImageIsFavorite(!!favoriteResponse.length)
      })
    } else {
      setSelectedImage(null)
    }
  }

  function toggleFavorite(imageId: string) {
    if (selectedImageFavorite) {
      CatsApi.deleteFavoriteById(selectedImageFavorite.id, favoriteResponse => {
        setSelectedImageFavorite(undefined)
        setSelectedImageIsFavorite(!(favoriteResponse.message === 'SUCCESS'))
      })
    } else {
      CatsApi.saveFavorite(imageId, favoriteResponse => {
        // set the SelectedCatFavorite to allow the user toggle immediately the favorite off
        setSelectedImageFavorite({
          id: favoriteResponse.id,
          image: {
            id: imageId,
            url: '',
          },
        })
        setSelectedImageIsFavorite(favoriteResponse.message === 'SUCCESS')
      })
    }
  }

  /**
   * This effect is responsible to load images via API
   */
  useEffect(() => {
    CatsApi.getImages(limit, page, order, catsResponse =>
      setImages([...images, ...catsResponse])
    )

    // clean up. Like we do with componentDidUpdate
    return () => {}
  }, [page])

  /**
   * This effect is responsible to listen to 'location' changes
   */
  useEffect(() => {
    listenToCatIdAndOpenModal()

    // clean up. Like we do with componentDidUpdate
    return () => {}
  }, [location.search])

  return (
    <>
      <CatImages
        images={images}
        selectImage={imageId => setSelectedCatOnUrl(imageId)}
      />

      <LoadMoreButton onClick={() => nextPage()}>Load more</LoadMoreButton>

      {/* Cat details modal - START */}
      {isModalVisible ? (
        <CatDetails
          image={selectedImage!}
          isFavorite={selectedImageIsFavorite}
          isOpen={isModalVisible}
          onFavoriteClick={imageId => toggleFavorite(imageId)}
          onClose={() => closeModal()}
        />
      ) : null}
      {/* Cat details modal - END */}
    </>
  )
}

export default CatsPage
