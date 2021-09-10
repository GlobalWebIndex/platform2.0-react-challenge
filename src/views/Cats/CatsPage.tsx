import { Button, Center } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import CatsApi from '../../api/cats.api'
import { CatType } from '../../types/Cat.type'
import { FavoriteType } from '../../types/Favorite.type'
import { SortingOrder } from '../../types/Sorting-order.type'
import LocationUtility from '../../utils/location.utils'
import CatDetails from './CatDetails'
import CatImages from './CatImages'

const CatsPage: FC = () => {
  const [cats, setCats] = useState<CatType[]>([])
  const [limit, setLimit] = useState(10)
  const [order, setOrder] = useState<SortingOrder>('Asc')
  const [page, setPage] = useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [selectedCat, setSelectedCat] = useState<CatType | null>()
  const [selectedCatFavorite, setSelectedCatFavorite] = useState<FavoriteType>()
  const [selectedCatIsFavorite, setSelectedCatIsFavorite] =
    useState<boolean>(false)
  const history = useHistory()
  const location = useLocation()

  function nextPage() {
    setPage(it => it + 1)
  }

  function setSelectedCatOnUrl(id: string) {
    history.push({
      pathname: window.location.pathname,
      search: `?catId=${id}`,
    })
  }

  function onModalClose() {
    history.push({ pathname: window.location.pathname })
  }

  // TODO: change the name
  function listenToCatIdAndOpenModal() {
    const catId = LocationUtility.useQuery(location.search).get('catId')

    // as soon as we have a catId in the url, the modal appears
    setIsModalVisible(!!catId)
    if (catId) {
      CatsApi.getImage(catId, catResponse => {
        setSelectedCat(catResponse)
      })

      // If the response of this API call has length > 0, means that the selected image is a favorite one
      CatsApi.getFavoriteByImageId(catId, favoriteResponse => {
        setSelectedCatFavorite(favoriteResponse?.[0])
        setSelectedCatIsFavorite(!!favoriteResponse.length)
      })
    } else {
      setSelectedCat(null)
    }
  }

  function toggleFavorite(imageId: string) {
    if (selectedCatFavorite) {
      CatsApi.deleteFavoriteById(selectedCatFavorite.id, favoriteResponse => {
        setSelectedCatFavorite(undefined)
        setSelectedCatIsFavorite(!(favoriteResponse.message === 'SUCCESS'))
      })
    } else {
      CatsApi.saveFavorite(imageId, favoriteResponse => {
        // set the SelectedCatFavorite to allow the user toggle immediately the favorite off
        setSelectedCatFavorite({
          id: favoriteResponse.id,
          image: {
            id: imageId,
            url: '',
          },
        })
        setSelectedCatIsFavorite(favoriteResponse.message === 'SUCCESS')
      })
    }
  }

  /**
   * This effect is responsible to load images via API
   */
  useEffect(() => {
    CatsApi.getCats(limit, page, order, catsResponse =>
      setCats([...cats, ...catsResponse])
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
        cats={cats}
        selectCatImage={imageId => setSelectedCatOnUrl(imageId)}
      />

      <Center>
        <Button
          mt={5}
          size='sm'
          colorScheme='teal'
          variant='ghost'
          onClick={() => nextPage()}
        >
          Load more
        </Button>
      </Center>

      {/* Cat details modal - START */}
      {isModalVisible ? (
        <CatDetails
          cat={selectedCat!}
          isFavorite={selectedCatIsFavorite}
          isOpen={isModalVisible}
          toggleFavorite={imageId => toggleFavorite(imageId)}
          close={() => onModalClose()}
        />
      ) : null}
      {/* Cat details modal - END */}
    </>
  )
}

export default CatsPage
