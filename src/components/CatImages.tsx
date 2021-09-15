import { Wrap, WrapItem } from '@chakra-ui/react'
import { FC } from 'react'
import { ImageType } from '../types/Image.type'
import CatImage from './CatImage'

type CatImagesProps = {
  images: ImageType[]
  showFavoriteAction: boolean
  isFavorite?: boolean
  onImageClick?: (imageId: string) => void
  onFavoriteClick?: (imageId: string) => void
}

const CatImages: FC<CatImagesProps> = ({ images, showFavoriteAction, isFavorite = false, onImageClick, onFavoriteClick }) => (
  <Wrap spacing='30px'>
    {images.map((image, index) => (
      <WrapItem
        key={image.id}
        p={1}
        tabIndex={0}
        alignItems='center'
        border='1px'
        borderRadius='md'
        cursor='pointer'
        height='100%'
        onClick={() => onImageClick?.(image.id)}
        onKeyDown={e => {
          if (e.code === 'Enter') {
            onImageClick?.(image.id)
          }
        }}
      >
        <CatImage
          key={image.id}
          showFavoriteAction={showFavoriteAction}
          isFavorite={isFavorite}
          image={image}
          onFavoriteClick={onFavoriteClick}
        />
      </WrapItem>
    ))}
  </Wrap>
)

export default CatImages
