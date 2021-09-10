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
import { CatType } from '../../types/Cat.type'
import BreedsTags from './components/BreedsTags'
import FavoriteIcon from './components/FavoriteIcon'

type CatDetailsProps = {
  cat: CatType
  isOpen: boolean
  isFavorite: boolean
  onFavoriteClick: (imageId: string) => void
  onClose: () => void
}

const CatDetails: FC<CatDetailsProps> = ({
  isOpen,
  isFavorite,
  cat,
  onClose,
  onFavoriteClick,
}) => {
  if (!cat) {
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
              imageId={cat.id}
              isFavorite={isFavorite}
              onClick={() => onFavoriteClick(cat.id)}
            />

            <Center>
              <Image objectFit='contain' src={cat?.url} alt='cat' />
            </Center>

            <BreedsTags breeds={cat.breeds} />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CatDetails
