import NavigationBar from 'app/components/NavigationBar';
import * as React from 'react';
import tw from 'tailwind-styled-components';
import { Toaster } from 'react-hot-toast';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = (
  props: DefaultLayoutProps,
) => {
  return (
    <>
      <NavigationBar />
      
      <main className="relative">
        <MainWrapper>{props.children}</MainWrapper>
      </main>
    </>
  );
};

export default DefaultLayout;

const MainWrapper = tw.div`max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 pt-20 `;
