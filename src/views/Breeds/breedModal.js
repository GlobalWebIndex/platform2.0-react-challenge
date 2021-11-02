import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '@mui/material/Modal';
import { catLoversBreedByIdSelector } from '../../selectors/catLoversSelectors';
import ImageListItem from "@mui/material/ImageListItem";
import ImageList from "@mui/material/ImageList";
import { createPortal } from 'react-dom';
import {closeModalAction} from "../../widgets/Modal/modalActions";
import { isModalOpenSelector } from "../../widgets/Modal/modalSelectors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {navigate} from "../../common/navigationUtils";
import * as PATHS from "../../AppCore/common/constants";

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

/**
 * Renders the content of the breed modal
 * @param catBreed Array containing info about a cat breed
 * @returns {React.Element}
 */
const BreedModal = ({ catBreed, open, closeModal }) => (
    createPortal(
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <br />
      <ImageList sx={{ width: '100%', height: 600 }} cols={1} rowHeight={200}>
        {catBreed.map((item) => (
            <React.Fragment>
           {item.breeds && item.breeds[0].name}
              <ImageListItem key={item.id}>
                <img
                    src={`${item.url}?w=${item.width}&h=${item.height}&fit=crop&auto=format`}
                    srcSet={`${item.url}?w=${item.width}&h=${item.height}&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.id}
                    loading="lazy"
                />
              </ImageListItem>
            </React.Fragment>
        ))}
      </ImageList>
      <Button style={{ position: 'absolute' }} variant="contained" onClick={closeModal}>
        Close
      </Button>
      </Box>
    </Modal>, document.getElementById('modal_root')
  )
);

BreedModal.propTypes = {
  catBreed: PropTypes.arrayOf(PropTypes.shape())
};

const mapStateToProps = (state, { stateIdentifier }) => ({
  open: isModalOpenSelector(state, stateIdentifier),
  catBreed: catLoversBreedByIdSelector(state),
});

const mapDispatchToProps = (dispatch, { stateIdentifier }) => ({
  closeModal: () => {
    dispatch(
        closeModalAction(stateIdentifier)
    );
    navigate(PATHS.BREEDS)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BreedModal);
