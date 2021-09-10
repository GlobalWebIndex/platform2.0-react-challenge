import { Wrap, WrapItem } from '@chakra-ui/react'
import { FC } from 'react'
import { ImageType } from '../../types/Image.type'
import Cat from './Cat'

type CatImagesProps = {
  images: ImageType[]
  selectImage: (imageId: string) => void
}

const CatImages: FC<CatImagesProps> = ({ images, selectImage }) => (
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
        onClick={() => selectImage(image.id)}
        onKeyDown={e => {
          if (e.code === 'Enter') {
            selectImage(image.id)
          }
        }}
      >
        {/* TODO: The image.width! might be null */}
        <Cat key={image.id} url={image.url} width={image.width!} />
      </WrapItem>
    ))}
  </Wrap>
)

export default CatImages
