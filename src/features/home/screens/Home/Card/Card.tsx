import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: white;
  width: 200px;
  height: 200px;
`;

const SImg = styled.img`
  width: 180px;
  height: 180px;
  object-fit: contain;
  border: 2px solid red;
  border-radius: 16px;
`;

interface Props {
  url: string;
}

const Card = ({ url }: Props) => {
  return (
    <Wrapper>
      <SImg src={url} alt="a cat" />
    </Wrapper>
  );
};

export default Card;
