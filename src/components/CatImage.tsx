import { Flex, Image } from '@chakra-ui/react'
import { FC } from 'react'
import { ImageType } from '../types/Image.type'
import FavoriteIcon from '../views/Cats/components/FavoriteIcon'

type CatImageProps = {
  image: ImageType
  showFavoriteAction: boolean
  isFavorite?: boolean
  onFavoriteClick?: (imageId: string) => void
  // rest props
  [_: string]: any
}

const CatImage: FC<CatImageProps> = ({ image, isFavorite = false, showFavoriteAction, onFavoriteClick, ...rest }) => {
  const imageWidth = !image.width || image.width > 400 ? 400 : image.width
  return (
    <>
      <Flex direction='column'>
        {showFavoriteAction ? (
          <FavoriteIcon imageId={image.id} isFavorite={isFavorite!} onClick={() => onFavoriteClick?.(image.id)} />
        ) : null}
        <Image {...rest} borderRadius='md' loading='lazy' src={image.url} alt='a cat' width={`${imageWidth}px`} />
      </Flex>
    </>
  )
}

export default CatImage
