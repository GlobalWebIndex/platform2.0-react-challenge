import { StarIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'
import { FC } from 'react'

export type FavoriteIconProps = {
  isFavorite: boolean
  imageId: string
  onClick: () => void
}

const FavoriteIcon: FC<FavoriteIconProps> = ({ isFavorite, onClick }) => (
  // TODO: Responsible to set the position of this component, is the parent.
  <Flex justifyContent='end' alignItems='center'>
    <StarIcon
      alignSelf='flex-end'
      cursor='pointer'
      w={5}
      h={5}
      mb={2}
      color={isFavorite ? 'red.500' : 'gray:50'}
      onClick={onClick}
    />
  </Flex>
)

export default FavoriteIcon
