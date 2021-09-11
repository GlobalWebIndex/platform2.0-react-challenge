import { Center, Wrap, WrapItem } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import CatsApi from '../../api/cats.api'
import LoadMoreButton from '../../components/LoadMoreButton'
import { BreedType } from '../../types/Breed.type'
import { ImageType } from '../../types/Image.type'
import LocationUtility from '../../utils/location.utils'
import CatImagesModal from './components/CatImagesModal'

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

  function navigateToCatImagesPage(imageId: string) {
    history.push({
      pathname: '/cats',
      search: `?imageId=${imageId}`,
    })
  }

  // TODO: change the name
  async function listenToBreedIdAndOpenModal() {
    const breedId = LocationUtility.useQuery(location.search).get('breedId')

    // as soon as we have a breedId in the url, the modal appears
    setIsModalVisible(!!breedId)
    if (breedId) {
      const getImagesByBreedResponse = await CatsApi.getImagesByBreed(breedId, breedsImagesLimit, breedsImagesPage)
      setBreedImages(getImagesByBreedResponse.data)
    } else {
      setBreedImages([])
    }
  }

  async function getBreeds() {
    const getBreedsResponse = await CatsApi.getBreeds(breedsLimit, breedsPage)
    setBreeds([...breeds, ...getBreedsResponse.data])
  }

  /**
   * This effect is responsible to load breeds via API
   */
  useEffect(() => {
    getBreeds()

    // clean up
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
      <CatImagesModal
        images={breedImages!}
        isOpen={isModalVisible}
        onClose={() => onModalClose()}
        onClickImage={imageId => {
          navigateToCatImagesPage(imageId)
        }}
      />
      {/* Cat images modal - END */}
    </>
  )
}

export default BreedsPage
