/* This example requires Tailwind CSS v2.0+ */
import * as React from 'react';
import { Disclosure } from '@headlessui/react';
import LanguageSwitcher from '../LanguageSwitcher';
import tw from 'tailwind-styled-components';
import ApplicationLogo from './ApplicationLogo';
import MobileMenuButton from './MobileMenuButton';
import MobileMenu from './MobileMenu';
import NavigationMenu from './NavigationMenu';

export default function NavigationBar() {
  return (
    <NavigationBarContainer as="nav">
      {({ open }) => (
        <>
          <Container>
            <ItemsWrapper>
              <MobileMenuButton open={open} />

              <LeftNavSection>
                <ApplicationLogo />
                <NavigationMenu />
              </LeftNavSection>
              <RightNavSection>
                <LanguageSwitcher />
              </RightNavSection>
            </ItemsWrapper>
          </Container>

          <MobileMenu />
        </>
      )}
    </NavigationBarContainer>
  );
}

const Container = tw.div`
    max-w-7xl
    mx-auto
    px-2
    sm:px-6
    lg:px-8
`;

const ItemsWrapper = tw.div`
    relative flex items-center justify-between h-16
`;

const LeftNavSection = tw.div`flex-1 flex items-center justify-center sm:items-stretch sm:justify-start`;
const RightNavSection = tw.div`absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0`;
const NavigationBarContainer = tw(
  Disclosure,
)`bg-gray-800 rounded-t rounded-b-xl fixed w-full z-50`;
