import styled from 'styled-components';

import { Colors, Sizes } from 'theme';

const Wrapper = styled.header`
  background-color: ${Colors.primary};
  height: ${Sizes.header.height};
`;

const Header = () => (
  <Wrapper className="flex items-center justify-center lg:justify-start p-6  w-full top-0">
    <div className="flex items-center">
      <a className="text-white no-underline" href="/">
        <span className="text-2xl pl-4">CatLover</span>
      </a>
    </div>
  </Wrapper>
);

export default Header;
