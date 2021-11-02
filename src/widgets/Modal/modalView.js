import React from 'react';
import { connect } from 'react-redux';
import Modal from '@mui/material/Modal';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { closeModalAction } from './modalActions';
import { isModalOpenSelector } from './modalSelectors';

const style = {
  position: 'absolute',
  width: '50%',
  height: '80%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalComponent = ({ open, children, closeModal }) => (
  <Modal
    open={open}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <IconButton onClick={closeModal}>
        <CloseIcon />
      </IconButton>
      <div>
        {open && children}
      </div>
    </Box>
  </Modal>
);

const mapStateToProps = (state, { stateIdentifier }) => ({
  open: isModalOpenSelector(state, stateIdentifier)
});

const mapDispatchToProps =
    (dispatch,
     { stateIdentifier, modalClosedCallback, modalClosedCallbackArgs }) => ({
    closeModal: () => {
      dispatch(
          closeModalAction(
              stateIdentifier,
              modalClosedCallback,
              modalClosedCallbackArgs
          )
      );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent)