import React, { type PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

import Styled from './styled';

interface Props extends PropsWithChildren {
  id: string;
  figure?: JSX.Element;
  isVisible?: boolean;
  onClose?: () => void;
}

function Modal(props: Props) {
  let container = document.getElementById(props.id);

  // Ensure there is an existing 'container' element
  // to host the modal's content
  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', props.id);
    document.body.appendChild(container);
  }

  return container
    ? ReactDOM.createPortal(
        <React.Fragment>
          <Styled.Backdrop
            isVisible={props.isVisible}
            onClick={() => props.onClose?.()}
          />
          <Styled.Modal
            data-test={`${props.id}-modal`}
            role="dialog"
            isVisible={props.isVisible}
          >
            <Styled.Content>{props.children}</Styled.Content>
            <Styled.Button
              data-test="close-modal"
              onClick={() => props.onClose?.()}
            />
          </Styled.Modal>
        </React.Fragment>,
        container
      )
    : null;
}

export default Modal;
