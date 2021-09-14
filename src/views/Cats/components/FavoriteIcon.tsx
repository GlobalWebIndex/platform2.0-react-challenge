import { StarIcon } from '@chakra-ui/icons'
import { FC } from 'react'

export type FavoriteIconProps = {
  isFavorite: boolean
  imageId: string
  onClick: () => void
}

const FavoriteIcon: FC<FavoriteIconProps> = ({ isFavorite, onClick }) => (
  <StarIcon alignSelf='flex-end' cursor='pointer' w={5} h={5} mb={2} color={isFavorite ? 'red.500' : 'gray:50'} onClick={onClick} />
)

export default FavoriteIcon
