import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DoneIcon from '@mui/icons-material/Done';
import Modal  from '../../widgets/Modal/modalView';
import { modalPropsSelector } from "../../widgets/Modal/modalSelectors";

/**
 * Renders the content of the add as favorite success modal
 * @param catImageId String for a cat image id
 * @returns {React.Element}
 */
const AddAsFavoriteSuccessModal = ({ catImageId }) => (
    <Modal stateIdentifier="favoriteImgModal">
      <DoneIcon />
       H εικόνα {catImageId} αποθηκεύτηκε στις αγαπημενες σας με επιτυχία
    </Modal>
);

AddAsFavoriteSuccessModal.propTypes = {
  addImageAsFavorite: PropTypes.func,
};

const mapStateToProps = state => {
  const addAsFavoriteModalProps = modalPropsSelector(state, 'favoriteImgModal');
  return {
    catImageId: addAsFavoriteModalProps.catImgId,
  }
};

export default connect(mapStateToProps)(AddAsFavoriteSuccessModal);
