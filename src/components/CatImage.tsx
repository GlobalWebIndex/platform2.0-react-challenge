import { Image } from '@chakra-ui/react'
import { FC } from 'react'

type CatImageProps = {
  url: string
  width?: number
  // rest props
  [_: string]: any
}

const CatImage: FC<CatImageProps> = ({ url, width = 400, ...rest }) => {
  const imageWidth = width > 400 ? 400 : width
  return (
    <Image
      {...rest}
      borderRadius='md'
      loading='lazy'
      src={url}
      alt='a cat'
      width={imageWidth}
    />
  )
}

export default CatImage
