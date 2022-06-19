import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.nav`
  width: 300px;
  min-height: 100vh;
  background-color: grey;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const ListWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
`;

const NavItem = styled.div`
  width: 100%;
  height: 50px;

  & > .active {
    background: blue;
    color: white;
  }
`;

const SLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover,
  &:focus {
    color: white;
    background: blue;
  }
  &:active {
    color: white;
  }

  .active {
    color: red;
    background: blue;
  }
`;

const Sidebar = () => {
  return (
    <Wrapper>
      <ListWrapper>
        <NavItem>
          <SLink to="/" className={(isActive) => (isActive ? 'active' : '')}>
            Home
          </SLink>
        </NavItem>
        <NavItem>
          <SLink to="/breeds">Breeds</SLink>
        </NavItem>
        <NavItem>
          <SLink to="/favorites">Favorites</SLink>
        </NavItem>
      </ListWrapper>
    </Wrapper>
  );
};

export default Sidebar;
