import {
  Box,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { FC } from 'react'
import CatImage from '../../../components/CatImage'
import { ImageType } from '../../../types/Image.type'
import BreedsTags from './BreedsTags'
import FavoriteIcon from './FavoriteIcon'

type CatDetailsModalProps = {
  image: ImageType
  isOpen: boolean
  isFavorite: boolean
  onFavoriteClick: (imageId: string) => void
  onClose: () => void
}

const CatDetailsModal: FC<CatDetailsModalProps> = ({
  isOpen,
  isFavorite,
  image,
  onClose,
  onFavoriteClick,
}) => {
  if (!image) {
    return null
  }

  return (
    <Modal size='lg' isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Paw Image</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p={2} alignItems='center' border='1px' borderRadius='md'>
            <FavoriteIcon
              imageId={image.id}
              isFavorite={isFavorite}
              onClick={() => onFavoriteClick(image.id)}
            />

            <Center>
              <CatImage
                objectFit='contain'
                url={image?.url}
                width={image.width}
              />
            </Center>

            <BreedsTags breeds={image.breeds || []} />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CatDetailsModal
