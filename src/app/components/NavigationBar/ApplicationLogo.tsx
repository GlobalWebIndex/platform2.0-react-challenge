import * as React from 'react';
import tw from 'tailwind-styled-components';
import { ReactComponent as CatLogo } from './assets/cat-logo.svg';

const ApplicationLogo: React.FC = () => {
  return (
    <Wrapper>
      <LogoContainer />
    </Wrapper>
  );
};

export default ApplicationLogo;

const Wrapper = tw.div`
  flex-shrink-0
  flex 
  items-center
`;

const LogoContainer = tw(CatLogo)`
  block
  h-8
  w-auto
`;
