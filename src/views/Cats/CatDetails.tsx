import {
  Badge,
  Box,
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
import { CatType } from '../../types/Cat.type'

type CatDetailsProps = {
  cat: CatType
  isOpen: boolean
  onClose: () => void
}

const CatDetails: FC<CatDetailsProps> = ({ isOpen, onClose, cat }) => {
  if (!cat) {
    return null
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Paw Image Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image objectFit='cover' src={cat?.url} alt='cat' />

          {/* Breeds list - START */}
          <Box p='6'>
            <Box d='flex' alignItems='baseline'>
              {cat.breeds?.map(breed => (
                <Badge borderRadius='full' px='2' colorScheme='teal'>
                  <Link to={`/breeds?breedId=${breed.id}`}>{breed.name}</Link>
                </Badge>
              ))}
            </Box>
          </Box>
          {/* Breeds list - END */}
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

export default CatDetails
