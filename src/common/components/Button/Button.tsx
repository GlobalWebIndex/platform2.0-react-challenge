import styled from 'styled-components';
import { Colors } from 'theme';

const SButton = styled.button<{ variant?: string }>`
  width: 100%;
  height: 100%;
  background: ${({ variant }) =>
    variant === 'primary'
      ? Colors.primary
      : variant === 'secondary'
      ? Colors.white
      : variant === 'danger'
      ? Colors.danger
      : Colors.primary};

  :hover {
    background: ${({ variant }) =>
      variant === 'primary'
        ? Colors.primaryHover
        : variant === 'secondary'
        ? Colors.secondaryHover
        : variant === 'danger'
        ? Colors.dangerHover
        : Colors.primary};
  }
`;

interface Props {
  text: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  children?: React.ReactNode;
  onClick: () => void;
}

const Button = ({ variant, disabled = false, text, onClick }: Props) => {
  return (
    <SButton
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {text}
    </SButton>
  );
};

export default Button;
