import { Button } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import CatsApi from '../../api/cats.api'
import { BreedType } from '../../types/Breed.type'

const BreedsPage: FC = () => {
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(0)
  const [breeds, setBreeds] = useState<BreedType[]>([])

  function nextPage() {
    setPage(it => it + 1)
  }

  /**
   * This effect is responsible to load breeds via API
   */
  useEffect(() => {
    CatsApi.getBreeds(limit, page, breedsResponse =>
      setBreeds([...breeds, ...breedsResponse])
    )

    // clean up. Like we do with componentDidUpdate
    return () => {}
  }, [page])

  return (
    <>
      <ul>
        {breeds.map((breed, index) => (
          <li>{breed.name}</li>
        ))}
      </ul>

      <Button colorScheme='blue' onClick={() => nextPage()}>
        Load more
      </Button>
    </>
  )
}

export default BreedsPage
