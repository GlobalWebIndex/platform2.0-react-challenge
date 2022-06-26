import styled from 'styled-components';

import { Colors } from 'theme';
import { ILink } from 'common/types';
import Link from 'common/components/Link';

const Wrapper = styled.header`
  background-color: ${Colors.sidebarBackground};
`;

const LinkWrapper = styled.div`
  & > .active {
    background: ${Colors.linkBackground};
    color: ${Colors.white};
  }
`;

interface Props {
  links: ILink[];
}

const MobileMenu = ({ links }: Props) => (
  <Wrapper className="flex items-center justify-evenly  bg-gray-800  w-full top-0">
    {links.map((link) => (
      <LinkWrapper key={link.label} className="text-2xl w-1/3 h-16">
        <Link to={link.to} label={link.label} />
      </LinkWrapper>
    ))}
  </Wrapper>
);

export default MobileMenu;
