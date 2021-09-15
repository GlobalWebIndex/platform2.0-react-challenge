import { StarIcon } from '@chakra-ui/icons'
import { FC } from 'react'

export type FavoriteIconProps = {
  isFavorite: boolean
  imageId: string
  onClick: () => void
}

const FavoriteIcon: FC<FavoriteIconProps> = ({ isFavorite, onClick }) => (
  <StarIcon
    data-testid='favorite-icon'
    alignSelf='flex-end'
    cursor='pointer'
    tabIndex={0}
    w={5}
    h={5}
    mb={2}
    color={isFavorite ? 'red.500' : 'gray:50'}
    onClick={onClick}
    onKeyDown={e => {
      if (e.code === 'Enter') {
        onClick()
      }
    }}
  />
)

export default FavoriteIcon
