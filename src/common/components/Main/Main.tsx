import { ReactNode } from 'react';
import styled from 'styled-components';

import { Colors } from 'theme';

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: scroll;
  background: ${Colors.background};
`;

interface Props {
  children: ReactNode;
}

const Main = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Main;
