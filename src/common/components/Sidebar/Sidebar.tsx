import styled from 'styled-components';

import { Colors } from 'theme';
import { ILink } from 'common/types';
import Link from 'common/components/Link';

const Wrapper = styled.nav`
  width: 300px;
  min-height: 100%;
  background-color: ${Colors.sidebarBackground};
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
    background: ${Colors.linkBackground};
    color: ${Colors.white};
  }
`;
interface Props {
  links: ILink[];
}

const Sidebar = ({ links }: Props) => {
  return (
    <Wrapper>
      <ListWrapper>
        {links.map((link) => (
          <NavItem key={link.label}>
            <Link to={link.to} label={link.label} />
          </NavItem>
        ))}
      </ListWrapper>
    </Wrapper>
  );
};

export default Sidebar;
