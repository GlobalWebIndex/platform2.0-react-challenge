import { Button } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import CatsApi from '../../api/cats.api'
import { CatType } from '../../types/cat.type'
import { SortingOrder } from '../../types/Sorting-order.type'
import Cat from './Cat'

const CatsPage: FC = () => {
  const [cats, setCats] = useState<CatType[]>([])
  const [limit, setLimit] = useState(10)
  const [order, setOrder] = useState<SortingOrder>('Asc')
  const [page, setPage] = useState(0)

  function nextPage() {
    setPage(it => it + 1)
  }

  useEffect(() => {
    CatsApi.getCats<CatType>(limit, page, order, catsResponse =>
      setCats([...cats, ...catsResponse])
    )

    // clean up. Like we do with componentDidUpdate
    return () => {}
  }, [page])

  return (
    <section>
      <ul>
        {cats.map(cat => (
          <Cat id={cat.id} url={cat.url} width={cat.width} />
        ))}
      </ul>

      <Button colorScheme='blue' onClick={() => nextPage()}>
        Load more
      </Button>
    </section>
  )
}

export default CatsPage
