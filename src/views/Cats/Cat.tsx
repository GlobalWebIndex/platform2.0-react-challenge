import { Image } from '@chakra-ui/react'
import { FC } from 'react'

type CatProps = {
  url: string
  width: number
}

const Cat: FC<CatProps> = ({ url, width }) => {
  const imageWidth = width > 400 ? 400 : width
  return (
    <Image
      borderRadius='md'
      loading='lazy'
      src={url}
      alt='a cat'
      width={imageWidth}
    />
  )
}

export default Cat
