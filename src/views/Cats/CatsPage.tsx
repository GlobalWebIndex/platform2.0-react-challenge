import { FC, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import CatsApi from '../../api/cats.api'
import CatImages from '../../components/CatImages'
import LoadMoreButton from '../../components/LoadMoreButton'
import { FavoriteType } from '../../types/Favorite.type'
import { ImageType } from '../../types/Image.type'
import { SortingOrder } from '../../types/Sorting-order.type'
import LocationUtility from '../../utils/location.utils'
import CatDetailsModal from './components/CatDetailsModal'

const CatsPage: FC = () => {
  const [images, setImages] = useState<ImageType[]>([])
  const [limit] = useState(10)
  const [order] = useState<SortingOrder>('Asc')
  const [page, setPage] = useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [selectedImage, setSelectedImage] = useState<ImageType | null>()
  const [selectedImageFavorite, setSelectedImageFavorite] = useState<FavoriteType>()
  const history = useHistory()
  const location = useLocation()

  const nextPage = () => {
    setPage(it => it + 1)
  }

  const setSelectedCatOnUrl = (id: string) => {
    history.push({
      pathname: window.location.pathname,
      search: `?imageId=${id}`,
    })
  }

  const closeModal = () => {
    history.push({ pathname: window.location.pathname })
  }

  const toggleFavorite = (imageId: string) => {
    if (selectedImageFavorite) {
      removeFavorite(selectedImageFavorite.id)
    } else {
      setFavorite(imageId)
    }
  }

  async function selectCatImage() {
    const imageId = LocationUtility.useQuery(location.search).get('imageId')

    // as soon as we have a imageId in the url, the modal appears
    setIsModalVisible(!!imageId)
    if (imageId) {
      const getImageResponse = await CatsApi.getImage(imageId)
      setSelectedImage(getImageResponse.data)

      // If the response of this API call has length > 0, means that the selected image is a favorite one
      const getFavoriteByImageIdResponse = await CatsApi.getFavoriteByImageId(imageId)
      setSelectedImageFavorite(getFavoriteByImageIdResponse.data?.[0])
    } else {
      setSelectedImage(null)
    }
  }

  async function removeFavorite(favoriteId: number) {
    try {
      await CatsApi.deleteFavoriteById(favoriteId)
      setSelectedImageFavorite(undefined)
    } catch (error) {
      // TODO: handle the error
    }
  }

  async function setFavorite(imageId: string) {
    const saveFavoriteResponse = await CatsApi.saveFavorite(imageId)

    // set the SelectedCatFavorite to allow the user toggle immediately the favorite off
    setSelectedImageFavorite({
      id: saveFavoriteResponse.data.id,
      image: {
        id: imageId,
        url: '',
      },
    })
  }

  async function getImages() {
    const catsResponse = await CatsApi.getImages(limit, page, order)
    setImages([...images, ...catsResponse.data])
  }

  /**
   * This effect is responsible to load images via API
   */
  useEffect(() => {
    getImages()

    // clean up. Like we do with componentDidUpdate
    return () => {}
  }, [page])

  /**
   * This effect is responsible to listen to 'location' changes
   */
  useEffect(() => {
    selectCatImage()

    // clean up. Like we do with componentDidUpdate
    return () => {}
  }, [location.search])

  return (
    <>
      <CatImages showFavoriteAction={false} images={images} onImageClick={setSelectedCatOnUrl} />

      <LoadMoreButton onClick={nextPage}>Load more</LoadMoreButton>

      {/* Cat details modal - START */}
      {isModalVisible ? (
        <CatDetailsModal
          image={selectedImage!}
          isFavorite={!!selectedImageFavorite}
          isOpen={isModalVisible}
          onFavoriteClick={toggleFavorite}
          onClose={closeModal}
        />
      ) : null}
      {/* Cat details modal - END */}
    </>
  )
}

export default CatsPage
