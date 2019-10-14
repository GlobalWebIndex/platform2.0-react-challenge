import React from 'react';
import { PropTypes } from 'prop-types';
import { Breeds, ModalActions } from './footerComponents';

const Footer = ({ modalProps, toggleFavourite }) => {
  const {
    id,
    url,
    breeds,
    favouriteId,
  } = modalProps;

  return (
    <div id="modal-footer">
      <Breeds breeds={breeds} />
      <ModalActions
        id={id}
        url={url}
        favouriteId={favouriteId}
        toggleFavourite={toggleFavourite}
      />
    </div>
  );
};

Footer.propTypes = {
  modalProps: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.number,
  ])),
  toggleFavourite: PropTypes.func.isRequired,
};

Footer.defaultProps = { modalProps: {} };

export default Footer;
