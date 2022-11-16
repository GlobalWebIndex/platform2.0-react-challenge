import styled from '@emotion/styled';

const BreedList = styled.div`
  width: 75vw;
  height: 70vh;
  overflow: auto;
  padding: 12px;
`;

const Title = styled.h1`
  font-size: 24px;
  padding: 16px;
  border-bottom: 1px solid #dddde5;
`;

const Table = styled.div`
  display: flex;
  flex-flow: column;
`;

const TableRow = styled.div`
  display: flex;
  cursor: pointer;
  background: var(--color-table-row-background);
  border-radius: 8px;
  max-height: 84px;
  transition: 100ms;

  &:hover {
    background: var(--color-table-row-background-hover);
  }

  &:first-of-type {
    background: var(--color-table-row-header-background);
    min-height: auto;
    text-transform: uppercase;
    font-size: 14px;
  }

  & + & {
    margin-top: 8px;
  }
`;

const TableCell = styled.div<{ width: string }>`
  display: flex;
  align-items: center;
  padding: 12px 12px 12px 36px;
  flex-basis: ${({ width }) => width};

  &:nth-of-type(3) {
    justify-content: end;
  }
`;

const Image = styled.div<{ url: string; small?: boolean }>`
  background-image: url('${({ url }) => url}');
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  width: ${({ small }) => (small ? '100px' : '100%')};
  height: ${({ small }) => (small ? '60px' : '20vh')};
  min-height: 60px;
  transition: 100ms linear;
`;

const Styled = {
  BreedList,
  Title,
  Table,
  TableRow,
  TableCell,
  Image
};

export default Styled;
