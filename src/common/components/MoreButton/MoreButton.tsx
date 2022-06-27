import styled from 'styled-components';
import { Colors } from 'theme';

const SButton = styled.button`
  background-color: ${Colors.primary};
  color: white;
  max-width: 900px;
  min-width: 300px;
  height: 80px;
  width: 80%;
  margin-top: 16px;
  position: relative;

  :hover {
    cursor: pointer;
    background-color: ${Colors.primaryHover};
  }

  :active {
    cursor: pointer;
    background-color: ${Colors.primaryActive};
  }

  :disabled {
    cursor: not-allowed;
    background-color: ${Colors.border};
  }
`;

interface Props {
  label: string;
  loadingLabel?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const MoreButton = ({
  label,
  loadingLabel = 'Fetching...',
  loading,
  disabled,
  onClick,
}: Props) => (
  <SButton onClick={onClick} disabled={loading || disabled}>
    <span>{loading ? loadingLabel : label}</span>
  </SButton>
);

export default MoreButton;
