import { Routes } from 'constants/routes';
import { useState } from 'react';
import { useLocation } from 'react-router';

export enum HeaderTabEnum {
  Home,
  Breeds,
  Favourites,
}

type ReturnType = {
  activeTab: HeaderTabEnum;
};

const useActiveHeader = (): ReturnType => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(HeaderTabEnum.Home);

  if (location.pathname.startsWith(Routes.breeds.index)) {
    if (activeTab !== HeaderTabEnum.Breeds) {
      setActiveTab(HeaderTabEnum.Breeds);
    }
  } else if (location.pathname.startsWith(Routes.favourites.index)) {
    if (activeTab !== HeaderTabEnum.Favourites) {
      setActiveTab(HeaderTabEnum.Favourites);
    }
  } else if (activeTab !== HeaderTabEnum.Home) {
    setActiveTab(HeaderTabEnum.Home);
  }

  return {
    activeTab,
  };
};

export default useActiveHeader;
