import { ReactNode } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

import IconButton from '../IconButton';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 12px;
`;

const Title = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  title: string;
  body: ReactNode;
  isOpen: boolean;
  onDismiss: () => void;
}

const CommonModal = ({ title, body, isOpen = false, onDismiss }: Props) => {
  return (
    <Modal
      style={{
        content: {
          minWidth: '300px',
          minHeight: '400px',
          maxHeight: '80%',
          maxWidth: '60%',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '16px',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
      }}
      isOpen={isOpen}
      appElement={document.getElementById('root') || undefined}
      onRequestClose={onDismiss}
    >
      <Wrapper>
        <TitleWrapper>
          <Title>{title}</Title>
          <IconButton icon="close" onClick={onDismiss} />
        </TitleWrapper>
        <Body>{body}</Body>
      </Wrapper>
    </Modal>
  );
};

export default CommonModal;
