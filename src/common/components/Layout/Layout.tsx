import React from 'react';
import styled from 'styled-components';

import Sidebar from '../Sidebar';
import Main from '../Main';

const Wrapper = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 620;

  React.useEffect(() => {
    /* Inside of a "useEffect" hook add an event listener that updates
       the "width" state variable when the window size changes */
    window.addEventListener('resize', () => setWidth(window.innerWidth));

    /* passing an empty array as the dependencies of the effect will cause this
       effect to only run when the component mounts, and not each time it updates.
       We only want the listener to be added once */
  }, []);

  const isMobile = width < breakpoint;

  return (
    <Wrapper>
      {!isMobile && <Sidebar />}
      <Main>{children}</Main>
    </Wrapper>
  );
};

export default Layout;
