import styled from 'styled-components';

import { Colors } from 'theme';
import { IBreed } from 'features/breeds/types';

const Wrapper = styled.div`
  background-color: white;
  width: 500px;
  height: 200px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  border-radius: 12px;
  border: 1px solid ${Colors.border};
  margin: 12px;
  overflow: hidden;

  :hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

const Description = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  padding: 8px;
  flex: 0.6;
  font-size: 0.875rem;
  height: 100%;
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 4px;
`;

const Subtitle = styled(Title)`
  margin-top: 4px;
  font-size: 0.875rem;
`;

const SImg = styled.img`
  flex: 0.4;
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

interface Props {
  breed: IBreed;
  onSelect: (cat: IBreed) => void;
}

const BreedItem = ({ breed, onSelect }: Props) => {
  const handleClick = () => {
    onSelect(breed);
  };

  return (
    <Wrapper onClick={handleClick}>
      <SImg src={breed?.image?.url} alt="a breed" />
      <Description>
        <Title>{breed?.name}</Title>
        <span>{breed?.description}</span>
        <Subtitle>Temperament</Subtitle>
        <span>{breed?.temperament}</span>
      </Description>
    </Wrapper>
  );
};

export default BreedItem;
