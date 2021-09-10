import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { FC } from 'react'
import CatImages from '../../../components/CatImages'
import { ImageType } from '../../../types/Image.type'

type CatImagesProps = {
  images: ImageType[]
  isOpen: boolean
  onClose: () => void
  onClickImage: (imageId: string) => void
}

const CatImagesModal: FC<CatImagesProps> = ({
  isOpen,
  images,
  onClose,
  onClickImage,
}) => {
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
          <CatImages
            images={images}
            onClickImage={imageId => onClickImage(imageId)}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CatImagesModal
