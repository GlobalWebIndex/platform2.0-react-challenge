import { Routes } from 'constants/routes';
import useActiveHeader, { HeaderTabEnum } from 'hooks/useActiveHeader';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import HeaderTab from './HeaderTab/HeaderTab';

const Header = () => {
  const { activeTab } = useActiveHeader();

  return (
    <nav className={styles.content}>
      <ul>
        <HeaderTab isActive={activeTab === HeaderTabEnum.Home} to={Routes.home.index} text="Home" />
        <HeaderTab isActive={activeTab === HeaderTabEnum.Breeds} to={Routes.breeds.index} text="Breeds" />
        <HeaderTab isActive={activeTab === HeaderTabEnum.Favourites} to={Routes.favourites.index} text="Favourites" />
      </ul>
    </nav>
  );
};

export default Header;
