import { Center, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { FC } from 'react'
import CatImage from '../../../components/CatImage'
import { ImageType } from '../../../types/Image.type'
import BreedsTags from './BreedsTags'

type CatDetailsModalProps = {
  image: ImageType
  isOpen: boolean
  isFavorite: boolean
  onFavoriteClick: (imageId: string) => void
  onClose: () => void
}

const CatDetailsModal: FC<CatDetailsModalProps> = ({ isOpen, isFavorite, image, onClose, onFavoriteClick }) => {
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
          <Center p={2} border='1px' borderRadius='md'>
            <Flex direction='column'>
              <CatImage objectFit='contain' image={image} isFavorite={isFavorite} showFavoriteAction onFavoriteClick={onFavoriteClick} />
              <BreedsTags breeds={image.breeds || []} />
            </Flex>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CatDetailsModal
