import { Button } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import CatsApi from '../../api/cats.api'
import { CatType } from '../../types/cat.type'
import { SortingOrder } from '../../types/Sorting-order.type'
import LocationUtility from '../../utils/location.utils'
import Cat from './Cat'
import CatDetails from './CatDetails'

const CatsPage: FC = () => {
  const [cats, setCats] = useState<CatType[]>([])
  const [limit, setLimit] = useState(10)
  const [order, setOrder] = useState<SortingOrder>('Asc')
  const [page, setPage] = useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedCat, setSelectedCat] = useState<CatType | null>(null)
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
    } else {
      setSelectedCat(null)
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
      <ul>
        {cats.map((cat, index) => (
          <Cat
            index={index}
            id={cat.id}
            url={cat.url}
            width={cat.width}
            onClick={() => setSelectedCatOnUrl(cat.id)}
          />
        ))}
      </ul>

      <Button colorScheme='blue' onClick={() => nextPage()}>
        Load more
      </Button>

      {/* Cat details modal - START */}
      <CatDetails
        cat={selectedCat!}
        isOpen={isModalVisible}
        onClose={() => onModalClose()}
      />
      {/* Cat details modal - END */}
    </>
  )
}

export default CatsPage
