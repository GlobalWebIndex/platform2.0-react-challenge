import { Center, Wrap, WrapItem } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import CatsApi from '../../api/cats.api'
import LoadMoreButton from '../../components/LoadMoreButton'
import { BreedType } from '../../types/Breed.type'
import { ImageType } from '../../types/Image.type'
import LocationUtility from '../../utils/location.utils'
import CatImages from './CatImages'

const BreedsPage: FC = () => {
  const [breedsLimit, setBreedsLimit] = useState(10)
  const [breedsPage, setBreedsPage] = useState(0)
  const [breedsImagesLimit, setBreedsImagesLimit] = useState(10)
  const [breedsImagesPage, setBreedsImagesPage] = useState(0)
  const [breeds, setBreeds] = useState<BreedType[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [breedImages, setBreedImages] = useState<ImageType[]>([])
  const history = useHistory()
  const location = useLocation()

  function nextPage() {
    setBreedsPage(it => it + 1)
  }

  function setSelectedBreedOnUrl(id: string) {
    history.push({
      pathname: window.location.pathname,
      search: `?breedId=${id}`,
    })
  }

  function onModalClose() {
    history.push({ pathname: window.location.pathname })
  }

  // TODO: change the name
  function listenToBreedIdAndOpenModal() {
    const breedId = LocationUtility.useQuery(location.search).get('breedId')

    // as soon as we have a breedId in the url, the modal appears
    setIsModalVisible(!!breedId)
    if (breedId) {
      CatsApi.getImagesByBreed(
        breedId,
        breedsImagesLimit,
        breedsImagesPage,
        catResponse => {
          setBreedImages(catResponse)
        }
      )
    } else {
      setBreedImages([])
    }
  }

  /**
   * This effect is responsible to load breeds via API
   */
  useEffect(() => {
    CatsApi.getBreeds(breedsLimit, breedsPage, breedsResponse =>
      setBreeds([...breeds, ...breedsResponse])
    )

    // clean up. Like we do with componentDidUpdate
    return () => {}
  }, [breedsPage])

  /**
   * This effect is responsible to listen to 'location' changes
   */
  useEffect(() => {
    listenToBreedIdAndOpenModal()

    // clean up. Like we do with componentDidUpdate
    return () => {}
  }, [location.search])

  return (
    <>
      <Wrap spacing='30px'>
        {breeds.map((breed, index) => (
          <WrapItem
            key={breed.id}
            role='button'
            onClick={() => setSelectedBreedOnUrl(breed.id)}
            onKeyDown={() => setSelectedBreedOnUrl(breed.id)}
            tabIndex={index}
          >
            <Center w='180px' h='80px' bg='red.200' borderRadius='md'>
              {breed.name}
            </Center>
          </WrapItem>
        ))}
      </Wrap>

      <LoadMoreButton onClick={() => nextPage()}>Load more</LoadMoreButton>

      {/* Cat images modal - START */}
      <CatImages
        images={breedImages!}
        isOpen={isModalVisible}
        onClose={() => onModalClose()}
      />
      {/* Cat images modal - END */}
    </>
  )
}

export default BreedsPage
