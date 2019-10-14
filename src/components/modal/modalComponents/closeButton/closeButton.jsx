import React from 'react';
import { PropTypes } from 'prop-types';
import Icon from '@mdi/react';
import { mdiCloseBox } from '@mdi/js';

const CloseButton = ({ clickHandler }) => (
  <Icon
    id="copy-icon"
    data-testid="modal-close-button"
    path={mdiCloseBox}
    title="Close"
    size={2}
    horizontal
    vertical
    rotate={180}
    color="gray"
    onClick={clickHandler}
  />
);

CloseButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};

export default CloseButton;
