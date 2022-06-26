import { ReactNode } from 'react';
import { Dialog } from '@headlessui/react';
import styled from 'styled-components';

import { Colors } from 'theme';
import IconButton from '../IconButton';

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 8px 8px 8px 24px;
  border-bottom: 1px solid ${Colors.border};
`;

const Title = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
`;

const Body = styled.div`
  width: 100%;
  max-height: 700px;
  overflow-y: scroll;
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
    <Dialog open={isOpen} onClose={onDismiss} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="flex min-h-full items-center justify-center">
          <Dialog.Panel className="mx-auto rounded bg-white">
            <Dialog.Title>
              <TitleWrapper>
                <Title>{title}</Title>
                <IconButton icon="close" onClick={onDismiss} />
              </TitleWrapper>
            </Dialog.Title>

            <Body>{body}</Body>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default CommonModal;
