import { Menu, Transition } from '@headlessui/react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';
import { ReactComponent as GreekFlag } from './assets/gr.svg';
import { ReactComponent as AmericanFlag } from './assets/us.svg';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none  ">
          <span className="sr-only">Open language menu</span>
          {i18n.language === 'en' ? <AmericanFlagIcon /> : <GreekFlagIcon />}
        </Menu.Button>
      </div>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {i18n.language === 'en' && (
            <Menu.Item>
              <Item
                onClick={() => {
                  handleLanguageChange('el');
                }}
              >
                Greek
                <GreekFlagIcon />
              </Item>
            </Menu.Item>
          )}
          {i18n.language === 'el' && (
            <Menu.Item>
              <Item
                onClick={() => {
                  handleLanguageChange('en');
                }}
              >
                English
                <AmericanFlagIcon />
              </Item>
            </Menu.Item>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LanguageSwitcher;

const GreekFlagIcon = tw(GreekFlag)`
  block
  h-5
  w-auto
`;

const AmericanFlagIcon = tw(AmericanFlag)`
  block
  h-5
  w-auto
`;

const Item = tw.div`cursor-pointer flex justify-around px-4 py-2 text-sm text-gray-700`;
