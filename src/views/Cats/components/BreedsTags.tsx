import { Tag, Wrap, WrapItem } from '@chakra-ui/react'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { BreedType } from '../../../types/Breed.type'

export type BreedTagsOpts = {
  breeds: BreedType[]
}

const BreedsTags: FC<BreedTagsOpts> = ({ breeds }) => (
  <Wrap mt={2} spacing='5px'>
    {breeds?.map(breed => (
      <WrapItem key={breed.id} alignItems='center'>
        <Link to={`/breeds?breedId=${breed.id}`}>
          <Tag size='md' variant='solid' colorScheme='teal'>
            {breed.name}
          </Tag>
        </Link>
      </WrapItem>
    ))}
  </Wrap>
)

export default BreedsTags
