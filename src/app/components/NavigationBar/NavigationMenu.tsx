import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { classNames } from 'utils/classnames';
import { NavigationItems } from 'app/routes';
import { useTranslation } from 'react-i18next';

const NavigationMenu: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <Wrapper>
      <div className="flex space-x-4">
        {NavigationItems.map(item => (
          <NavLink
            key={item.name}
            to={item.route}
            className={classNames(
              item.route === location.pathname
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'px-3 py-2 rounded-md text-sm font-medium',
            )}
            aria-current={item.route === location.pathname ? 'page' : undefined}
          >
            {t(item.translation())}
          </NavLink>
        ))}
      </div>
    </Wrapper>
  );
};

export default NavigationMenu;

const Wrapper = tw.div`hidden sm:block sm:ml-6`;
