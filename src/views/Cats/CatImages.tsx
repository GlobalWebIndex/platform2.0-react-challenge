import { Wrap, WrapItem } from '@chakra-ui/react'
import { FC } from 'react'
import { CatType } from '../../types/Cat.type'
import Cat from './Cat'

type CatImagesProps = {
  cats: CatType[]
  selectCatImage: (imageId: string) => void
}

const CatImages: FC<CatImagesProps> = ({ cats, selectCatImage }) => (
  <Wrap spacing='30px'>
    {cats.map((cat, index) => (
      <WrapItem
        key={cat.id}
        p={1}
        tabIndex={index}
        alignItems='center'
        border='1px'
        borderRadius='md'
        cursor='pointer'
        onClick={() => selectCatImage(cat.id)}
        onKeyDown={e => {
          if (e.code === 'Enter') {
            selectCatImage(cat.id)
          }
        }}
      >
        <Cat key={cat.id} url={cat.url} width={cat.width} />
      </WrapItem>
    ))}
  </Wrap>
)

export default CatImages
