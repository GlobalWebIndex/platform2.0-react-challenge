import { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: scroll;
`;

const Main = ({ children }: { children: ReactNode }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Main;
