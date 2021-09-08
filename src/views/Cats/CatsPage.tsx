import { Button } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import CatsApi from '../../api/cats.api'
import { CatType } from '../../types/cat.type'
import { SortingOrder } from '../../types/Sorting-order.type'
import LocationUtility from '../../utils/location.utils'
import Cat from './Cat'

const CatsPage: FC = () => {
  const [cats, setCats] = useState<CatType[]>([])
  const [limit, setLimit] = useState(10)
  const [order, setOrder] = useState<SortingOrder>('Asc')
  const [page, setPage] = useState(0)
  const history = useHistory()
  const location = useLocation()

  function nextPage() {
    setPage(it => it + 1)
  }

  function selectCat(id: string) {
    history.push({
      pathname: window.location.pathname,
      search: `?catId=${id}`,
    })
  }

  function getQueryParamCatId() {
    return LocationUtility.useQuery(location.search).get('catId')
  }

  // TODO: change the name
  function listenToCatIdAndOpenModal() {
    const catId = getQueryParamCatId()

    console.log(catId)
  }

  /**
   * This effect is responsible to load API data
   */
  useEffect(() => {
    CatsApi.getCats<CatType>(limit, page, order, catsResponse =>
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
    <section>
      <ul>
        {cats.map((cat, index) => (
          <Cat
            index={index}
            id={cat.id}
            url={cat.url}
            width={cat.width}
            onClick={() => selectCat(cat.id)}
          />
        ))}
      </ul>

      <Button colorScheme='blue' onClick={() => nextPage()}>
        Load more
      </Button>
    </section>
  )
}

export default CatsPage
