import { Disclosure } from '@headlessui/react';
import * as React from 'react';
import tw from 'tailwind-styled-components';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

interface MobileMenuButtonProps {
  open: boolean;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ open }) => {
  return (
    <Wrapper>
      <Button>
        <span className="sr-only">Open main menu</span>
        {open ? (
          <XIcon className="icon" aria-hidden="true" />
        ) : (
          <MenuIcon className="icon" aria-hidden="true" />
        )}
      </Button>
    </Wrapper>
  );
};

export default MobileMenuButton;

const Wrapper = tw.div`absolute inset-y-0 left-0 flex items-center sm:hidden`;
const Button = tw(
  Disclosure.Button,
)`inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`;
