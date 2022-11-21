import React from 'react';
import { Link } from 'react-router-dom';

import Styled from './styled';
import { usePageTitle } from 'hooks';
import logo from 'gfx/logo.png';

function Layout(props: React.PropsWithChildren) {
  const title = usePageTitle();

  return (
    <>
      <Styled.Sidebar>
        <Styled.Logo src={logo} alt="My Cat App" />
        <Styled.NavMenu>
          <Styled.NavMenuItem>
            <Link to="/">Search</Link>
          </Styled.NavMenuItem>
          <Styled.NavMenuItem>
            <Link to="/breeds">Breeds</Link>
          </Styled.NavMenuItem>
          <Styled.NavMenuItem>
            <Link to="/favourites">Favourites</Link>
          </Styled.NavMenuItem>
        </Styled.NavMenu>
      </Styled.Sidebar>
      <Styled.Main role="main">
        <Styled.Title data-test="title">{title}</Styled.Title>
        <Styled.Stage>{props.children}</Styled.Stage>
      </Styled.Main>
      <Styled.Footer>
        Samaras Christos /{' '}
        <a
          href="https://github.com/chbardamu/gwi-react-challenge/tree/develop"
          target="_blank"
          rel="noreferrer"
        >
          GWI Challenge
        </a>{' '}
        &copy; 2022
      </Styled.Footer>
    </>
  );
}

export default Layout;
