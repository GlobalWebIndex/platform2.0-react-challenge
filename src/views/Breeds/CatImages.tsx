import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ImageType } from '../../types/Image.type'

type CatImagesProps = {
  images: ImageType[]
  isOpen: boolean
  onClose: () => void
}

const CatImages: FC<CatImagesProps> = ({ isOpen, onClose, images }) => {
  if (!images?.length) {
    return null
  }

  /**
   * The api returns a list of images where each image encapsulates an array with breed objects.
   * Since the response regards a specific breed, each image has an array with the same breed object.
   */
  const breedName = images?.[0]?.breeds?.[0].name

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{breedName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {images?.map(image => (
            <Link to={`/cats?catId=${image.id}`}>
              <Image objectFit='cover' src={image?.url} alt='cat' />
            </Link>
          ))}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CatImages
