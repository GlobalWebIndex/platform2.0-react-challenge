import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as reduxActions from '../../redux/actions';
import { Footer, CloseButton } from './modalComponents';
import './modal.css';

const addEscKeyEventListener = (callback) => {
  const handler = (event) => {
    if (event.keyCode === 27) {
      callback();
    }
    document.removeEventListener('keydown', handler);
  };
  document.addEventListener('keydown', handler);
};

const Modal = () => {
  const modalProps = useSelector((state) => state.modalProps);
  const dispatch = useDispatch();

  addEscKeyEventListener(() => dispatch(reduxActions.updateModalPropsAction({})));

  return (
    <div
      id="modal-full-screen"
      data-testid="modal"
      style={modalProps.url ? { display: 'flex' } : { display: 'none' }}
    >
      <div id="modal-container">
        <CloseButton clickHandler={() => dispatch(reduxActions.updateModalPropsAction({}))} />
        <img
          id="modal-image"
          src={modalProps.url}
          alt="cat_modal"
        />
        <Footer
          modalProps={modalProps}
          toggleFavourite={() => {
            if (modalProps.favouriteId) {
              dispatch(reduxActions.deleteFavouriteAction(modalProps.favouriteId));
            } else {
              dispatch(reduxActions.saveFavouriteAction(modalProps.id, modalProps.url));
            }
          }}
        />
      </div>
    </div>
  );
};

export default Modal;
