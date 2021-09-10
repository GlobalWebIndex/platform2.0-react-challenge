import { Wrap, WrapItem } from '@chakra-ui/react'
import { FC } from 'react'
import { ImageType } from '../types/Image.type'
import CatImage from './CatImage'

type CatImagesProps = {
  images: ImageType[]
  onClickImage: (imageId: string) => void
}

const CatImages: FC<CatImagesProps> = ({ images, onClickImage }) => (
  <Wrap spacing='30px'>
    {images.map((image, index) => (
      <WrapItem
        key={image.id}
        p={1}
        tabIndex={index}
        alignItems='center'
        border='1px'
        borderRadius='md'
        cursor='pointer'
        onClick={() => onClickImage(image.id)}
        onKeyDown={e => {
          if (e.code === 'Enter') {
            onClickImage(image.id)
          }
        }}
      >
        {/* TODO: The image.width! might be null */}
        <CatImage key={image.id} url={image.url} width={image.width!} />
      </WrapItem>
    ))}
  </Wrap>
)

export default CatImages
