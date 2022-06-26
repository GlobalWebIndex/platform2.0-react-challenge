import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { Colors } from 'theme';

const SLink = styled(NavLink)`
  color: ${Colors.white};
  text-decoration: none;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;

  &:hover {
    color: white;
    background: ${Colors.linkBackgroundHover};
  }
  &:active {
    background: ${Colors.linkBackground};
  }

  .active {
    background: ${Colors.linkBackground};
  }
`;

interface Props {
  to: string;
  label: string;
}

const Link = ({ to, label }: Props) => {
  return (
    <SLink to={to} className={(isActive) => (isActive ? 'active' : '')}>
      {label}
    </SLink>
  );
};

export default Link;
