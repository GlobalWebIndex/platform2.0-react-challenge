import { Disclosure } from '@headlessui/react';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { classNames } from 'utils/classnames';
import { NavigationItems } from 'app/routes';
import { useTranslation } from 'react-i18next';

const MobileMenu: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <Disclosure.Panel className="sm:hidden">
      <Wrapper>
        {NavigationItems.map(item => (
          <Link
            to={item.route}
            key={item.name}
            className={classNames(
              item.route === location.pathname
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block px-3 py-2 rounded-md text-base font-medium',
            )}
          >
            <Disclosure.Button
              key={item.name}
              aria-current={
                item.route === location.pathname ? 'page' : undefined
              }
            >
              {t(item.translation())}
            </Disclosure.Button>
          </Link>
        ))}
      </Wrapper>
    </Disclosure.Panel>
  );
};

export default MobileMenu;

const Wrapper = tw.div`px-2 pt-2 pb-3 space-y-1`;
