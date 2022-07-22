import { Menu, Transition } from '@headlessui/react';
import { messages } from 'app/messages';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useCatSlice } from 'store/cats';
import { selectOnlyBreeds } from 'store/cats/selectors';
import tw from 'tailwind-styled-components';

interface OptionButtonProps {
  loading?: boolean;
  visible?: boolean;
}

const OptionsButton: React.FC<OptionButtonProps> = ({ visible = true }) => {
  const dispatch = useDispatch();
  const { actions } = useCatSlice();
  const { t } = useTranslation();

  const onlyBreeds = useSelector(selectOnlyBreeds);

  return (
    <Menu as="div" className="ml-3 fixed z-40 bottom-52 right-8 ">
      <div>
        <OptionsMenuButton $visible={visible}>
          {t(messages.options())}
        </OptionsMenuButton>
      </div>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right min-w-250 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <Item>
                <label
                  htmlFor="default-toggle"
                  className="inline-flex relative items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="default-toggle"
                    className="sr-only peer"
                    onChange={e => {
                      dispatch(actions.setOnlyBreeds(e.target.checked));
                    }}
                    checked={onlyBreeds}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {t(messages.catsWithBreedsOnly())}
                  </span>
                </label>
              </Item>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default OptionsButton;

const Item = tw.div`cursor-pointer flex justify-around px-4 py-2 text-sm text-gray-700`;
const OptionsMenuButton = tw(Menu.Button)<{ visible: boolean }>`${(p: {
  $visible: boolean;
}) =>
  p.$visible
    ? 'opacity-1'
    : 'opacity-0'} fixed z-40 bottom-24 right-8  transition-opacity	duration-500 min-w-150 bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded flex justify-center items-center hover:drop-shadow-2xl`;
