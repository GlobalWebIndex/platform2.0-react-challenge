import React from 'react';
import styled from 'styled-components';

import Constants from 'common/constants';
import { Sizes } from 'theme';
import Header from '../Header';
import Sidebar from '../Sidebar';
import MobileMenu from '../MobileMenu';
import Main from '../Main';

const Wrapper = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  justify-content: center;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  width: 100%;
  height: calc(100% - ${Sizes.header.height});
  justify-content: center;
  align-items: flex-start;
  display: flex;
`;

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 620;

  // We use this event listener that updates
  // the "width" state variable when the window size changes
  React.useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, []);

  const isMobile = width < breakpoint;

  return (
    <Wrapper>
      <Header />
      {isMobile && <MobileMenu links={Constants.ROUTES} />}
      <Row>
        {!isMobile && <Sidebar links={Constants.ROUTES} />}
        <Main>{children}</Main>
      </Row>
    </Wrapper>
  );
};

export default Layout;
