import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { Colors } from 'theme';

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
    color: ${Colors.white};
  }

  .active {
    color: red;
    background: blue;
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
