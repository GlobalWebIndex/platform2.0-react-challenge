import { ReactNode } from 'react';
import { Dialog } from '@headlessui/react';
import styled from 'styled-components';

import IconButton from '../IconButton';

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
    <Dialog
      open={isOpen}
      static={true}
      onClose={onDismiss}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="flex min-h-full items-center justify-center">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
            <Dialog.Title>
              <TitleWrapper>
                <Title>{title}</Title>
                <IconButton icon="close" onClick={onDismiss} />
              </TitleWrapper>
            </Dialog.Title>

            <Body>{body}</Body>

            <button onClick={onDismiss}>Deactivate</button>
            <button onClick={onDismiss}>Cancel</button>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default CommonModal;
