import { ReactNode } from 'react';
import styled from 'styled-components';
import { Colors } from 'theme';

const SButton = styled.button<{ variant?: string }>`
  width: 10rem;
  height: 3rem;
  border-radius: 12px;

  ${({ variant }) =>
    variant === 'primary'
      ? `background: ${Colors.primary};
         color: ${Colors.white};`
      : variant === 'secondary'
      ? `background: ${Colors.white};
        border: 1px solid ${Colors.border};`
      : variant === 'danger'
      ? `background: ${Colors.danger};
         color: ${Colors.white};`
      : `background: ${Colors.primary};`}

  :hover {
    ${({ variant }) =>
      variant === 'primary'
        ? `background: ${Colors.primaryHover};`
        : variant === 'secondary'
        ? `background: ${Colors.secondaryHover};`
        : variant === 'danger'
        ? `background: ${Colors.dangerHover};`
        : `background: ${Colors.primary};`}
  }

  :active {
    ${({ variant }) =>
      variant === 'primary'
        ? `background: ${Colors.primaryActive};`
        : variant === 'secondary'
        ? `background: ${Colors.secondaryActive};`
        : variant === 'danger'
        ? `background: ${Colors.dangerActive};`
        : `background: ${Colors.primary};`};
  }
`;

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  label: ReactNode;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  children?: React.ReactNode;
  onClick: () => void;
}

const Button = ({
  variant,
  disabled = false,
  label,
  onClick,
  ...restProps
}: Props) => {
  return (
    <SButton
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      type="button"
      {...restProps}
    >
      {label}
    </SButton>
  );
};

export default Button;
