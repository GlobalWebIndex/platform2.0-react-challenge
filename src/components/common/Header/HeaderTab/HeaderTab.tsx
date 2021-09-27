import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HeaderTab.module.scss';

type Props = {
  to: string;
  isActive: boolean;
  text: string;
};

const HeaderTab: React.FC<Props> = ({ to, isActive, text }) => {
  return (
    <li className={isActive ? styles['active-tab'] : undefined}>
      <Link to={to}>{text}</Link>
    </li>
  );
};

export default HeaderTab;
