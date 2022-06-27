import styled from 'styled-components';

import { Colors } from 'theme';

const Wrapper = styled.div`
  opacity: 1;
  z-index: 100;
  width: 100%;
  min-width: 80px;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0
  margin: auto;
  justify-content: center;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2_);
`;

const Spinner = styled.div`
  border: 10px solid ${Colors.background};
  border-top: 10px solid ${Colors.primary};
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = () => {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
};

export default Loader;
