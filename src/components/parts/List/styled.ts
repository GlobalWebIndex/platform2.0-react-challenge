import styled from '@emotion/styled';

const List = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(60px, auto));
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-gap: 1vw;
  justify-content: center;
`;

const Item = styled.div`
  border-radius: 4px;
  box-shadow: 0 1px 16px -4px rgb(0 0 0 / 40%);
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  display: flex;
  position: relative;
  overflow: hidden;
  transition: transform 100ms ease-in;
`;

const Styled = {
  List,
  Item
};

export default Styled;
