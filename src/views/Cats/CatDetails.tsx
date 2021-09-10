import {
  Box,
  Center,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { FC } from 'react'
import { ImageType } from '../../types/Image.type'
import BreedsTags from './components/BreedsTags'
import FavoriteIcon from './components/FavoriteIcon'

type CatDetailsProps = {
  image: ImageType
  isOpen: boolean
  isFavorite: boolean
  onFavoriteClick: (imageId: string) => void
  onClose: () => void
}

const CatDetails: FC<CatDetailsProps> = ({
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
              <Image objectFit='contain' src={image?.url} alt='cat' />
            </Center>

            <BreedsTags breeds={image.breeds || []} />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CatDetails
