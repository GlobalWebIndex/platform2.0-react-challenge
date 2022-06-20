import styled from 'styled-components';

import { ICat } from 'features/home/types';

const Wrapper = styled.div`
  background-color: white;
  width: 200px;
  height: 200px;

  :hover {
    transform: scale(1.05);
  }
`;

const SImg = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

interface Props {
  cat: ICat;
  onSelect: (cat: ICat) => void;
}

const Card = ({ cat, onSelect }: Props) => {
  const handleClick = () => {
    onSelect(cat);
  };

  return (
    <Wrapper onClick={handleClick}>
      <SImg src={cat.url} alt="a cat" />
    </Wrapper>
  );
};

export default Card;
