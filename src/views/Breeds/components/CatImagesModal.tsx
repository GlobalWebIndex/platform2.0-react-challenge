import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { FC } from 'react'
import CatImages from '../../../components/CatImages'
import { ImageType } from '../../../types/Image.type'

type CatImagesProps = {
  images: ImageType[]
  isOpen: boolean
  onClose: () => void
  onImageClick: (imageId: string) => void
}

const CatImagesModal: FC<CatImagesProps> = ({ isOpen, images, onClose, onImageClick }) => {
  if (!images?.length) {
    return null
  }

  /**
   * The api returns a list of images where each image encapsulates an array with breed objects.
   * Since the response regards a specific breed, each image has an array with the same breed object.
   */
  const breedName = images?.[0]?.breeds?.[0].name

  return (
    <Modal scrollBehavior='inside' isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{breedName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CatImages showFavoriteAction={false} images={images} onImageClick={imageId => onImageClick(imageId)} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CatImagesModal
