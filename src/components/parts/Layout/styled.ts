import styled from '@emotion/styled';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4vh 4vw;
  margin-left: 116px;
`;

const Stage = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
`;

const Sidebar = styled.aside`
  background: var(--color-sidebar-background);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  width: fit-content;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  padding: 20px;
`;

const Logo = styled.img`
  display: block;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 6vh;
  text-transform: capitalize;
`;

const NavMenu = styled.nav``;

const NavMenuItem = styled.div`
  > * {
    color: var(--color-sidebar-menu-item);
    display: block;
    margin: 8px -20px;
    padding: 8px 20px;
    text-decoration: none;
    transition: background 100ms linear;

    &:hover {
      color: var(--color-sidebar-menu-item-hover);
      background: var(--color-sidebar-menu-item-background-hover);
    }
  }
`;

const Footer = styled.footer`
  background: var(--color-footer-background);
  border-top-left-radius: 4px;
  box-shadow: 0 0 6px rgb(0, 0, 0, 0.25);
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 8px 16px;
  width: fit-content;
  font-size: 12px;
  letter-spacing: 0.5px;
  z-index: 1;
`;

const Styled = {
  Logo,
  Main,
  Stage,
  Title,
  Sidebar,
  NavMenu,
  NavMenuItem,
  Footer
};

export default Styled;
