import styled from '@emotion/styled';

const Details = styled.div`
  color: var(--color-details-text);
`;

const Group = styled.div`
  display: flex;
  flex-flow: column;
`;

const Row = styled.div`
  display: flex;
  padding: 6px;
`;

const Column = styled.div`
  color: var(--color-column-text);
  flex-basis: 40%;
  text-align: left;
  margin-right: 20px;

  &:first-of-type {
    font-weight: bold;
    font-size: 12px;
    text-transform: uppercase;
  }

  & + * {
    flex-basis: 60%;
    min-width: 140px;
  }
`;

const Note = styled.p`
  color: inherit;
  margin: 20px 20px 6px;
  text-decoration: underline;
`;

const Styled = {
  Details,
  Group,
  Row,
  Column,
  Note
};

export default Styled;
