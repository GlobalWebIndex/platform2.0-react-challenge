import styled from '@emotion/styled';

const Pane = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 6vh auto;
`;

const Button = styled.div`
  border-radius: 4px;
  box-shadow: 0 4px 12px rgb(0, 0, 0, 25%);
  cursor: pointer;
  padding: 20px;
  color: var(--color-show-more-text);
  font-size: 24px;
  font-weight: bold;
  background: var(--gradient-show-more-background);
  text-shadow: -1px 0 0 #999;
  transition: 100ms;

  &:active {
    box-shadow: none;
    transform: scale(0.95);
  }
`;

const Styled = {
  Pane,
  Button
};

export default Styled;
