import styled from 'styled-components';

import { IBreed } from 'features/breeds/types';
import BreedItem from './BreedItem';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column
  max-width: 800px;
  height: 100%;
  align-items: center;
  justify-content: center;
  align-content: flex-start;
`;

interface Props {
  breeds: IBreed[];
}

const BreedslList = ({ breeds }: Props) => (
  <Wrapper>
    {breeds.map((breed) => (
      <BreedItem key={breed.id} breed={breed} onSelect={() => {}} />
    ))}
  </Wrapper>
);

export default BreedslList;
