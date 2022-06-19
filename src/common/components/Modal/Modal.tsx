import { ReactNode } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
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
          minHeight: '600px',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
      isOpen={isOpen}
      onRequestClose={onDismiss}
    >
      <Wrapper>
        <TitleWrapper>{title}</TitleWrapper>
        <Body>{body}</Body>
      </Wrapper>
    </Modal>
  );
};

export default CommonModal;
