import styled from '@emotion/styled/macro';

import favIcon from 'gfx/fav.svg';
import infoIcon from 'gfx/info.svg';

const Toolbar = styled.div`
  background: var(--color-toolbar-background);
  display: flex;
  justify-content: flex-end;
  padding: 12px;
`;

const Title = styled.div`
  flex-grow: 1;
  font-size: 24px;
  line-height: 30px;
  font-weight: 200;
  text-align: left;
`;

const Toggle = styled.div`
  display: flex;
  border-radius: 50%;
  background: var(--color-toggle-button-background);
  cursor: pointer;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  transition: 100ms ease-in;

  & + * {
    margin-left: 12px;
  }
`;

const Favourite = styled(Toggle)<{ isActive: boolean }>`
  box-shadow: 0 0 0px 4px rgba(255, 0, 0, 0.9);
  opacity: ${({ isActive }) => (isActive ? 1 : 0.3)};

  &::after {
    content: url('${favIcon}');
    width: 16px;
    height: 13px;
  }

  &:hover {
    opacity: 1;
  }
`;

const Tooltip = styled(Toggle)`
  box-shadow: 0 0 0px 4px rgba(114, 167, 207, 0.9);
  position: relative;
  cursor: help;

  &::after {
    content: url('${infoIcon}');
    width: 19px;
    height: 19px;
  }
`;

const TooltipContent = styled.div<{ isVisible: boolean }>`
  background: var(--color-tooltip-content-background);
  backdrop-filter: blur(20px);
  border-radius: 4px;
  box-shadow: 0 6px 16px rgb(0, 0, 0, 0.4);
  cursor: pointer;
  font-size: 14px;
  line-height: 1.2;
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 12px;
  min-width: 160px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  padding: 10px;
  transition: opacity 100ms ease-in,
    transform 0ms ${({ isVisible }) => (isVisible ? 100 : 0)}ms;
  transform: scale(${({ isVisible }) => (isVisible ? 1 : 0)});
  text-align: center;
  z-index: 10;

  &::before {
    content: '';
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid rgba(114, 167, 207, 0.5);
    position: absolute;
    top: -6px;
    right: 10px;
  }
`;

const Styled = {
  Toolbar,
  Favourite,
  Tooltip,
  TooltipContent,
  Title
};

export default Styled;
