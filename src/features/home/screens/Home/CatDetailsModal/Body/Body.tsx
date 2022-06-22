import styled from 'styled-components';

import Loader from 'common/components/Loader';
import { ICat } from 'features/home/types';

const Wrapper = styled.div`
  height: 400px;
`;

const Img = styled.img`
  height: 300px;
  widht: auto;
`;

interface Props {
  loading: boolean;
  cat: ICat;
}

const Body = ({ cat, loading }: Props) => (
  <Wrapper className="flex items-center justify-center flex-col  w-full relative">
    <Img src={cat.url} alt="a cat" />
    <div className="flex items-center justify-end row mx-4 w-full">
      <button className="mx-4">Copy Url</button>
      <button className="mx-4">Favorite</button>
    </div>
    {loading && <Loader />}
  </Wrapper>
);

export default Body;
