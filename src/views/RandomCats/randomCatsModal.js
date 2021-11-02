import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Modal from '@mui/material/Modal';
import FavoriteBorder from '@mui/icons-material/FavoriteBorderRounded';
import Grid from '@mui/material/Grid'
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { isModalOpenSelector } from "../../widgets/Modal/modalSelectors";
import { addCatImageAsFavoriteAction } from "../../actions/catLoversActions";
import Box from "@mui/material/Box";
import {closeModalAction} from "../../widgets/Modal/modalActions";
import Button from "@mui/material/Button";
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
 * Renders the content of the random cat modal
 * @param catImage String for a cat image
 * @param catBreed Object for a cat breed
 * @param catImageId String for a cat image id
 * @param addImageAsFavorite Function that adds image as favorite
 * @returns {React.Element}
 */
const RandomCatModal = ({ catImage, catBreed, catImageId, addImageAsFavorite, open, closeModal }) => (
    createPortal(
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <br />
          <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Card sx={{ maxWidth: '40%', position: 'center' }}>
              <CardMedia
                  component="img"
                  height="50%"
                  image={catImage}
                  alt="cat"
              />
              <FavoriteBorder style={{ color: 'red' }} onClick={() => addImageAsFavorite(catImageId)} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {catBreed && catBreed.alt_names}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Link to={{ pathname: '/breeds', state: { catBreedId: catBreed && catBreed.id, isFromRandomCatsModal: true } }}>
                    {catBreed && catBreed.description}
                  </Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Button style={{ position: 'absolute' }} variant="contained" onClick={closeModal}>
            Close
          </Button>
        </Box>
      </Modal>, document.getElementById('modal_root')
    )
);

RandomCatModal.propTypes = {
  addImageAsFavorite: PropTypes.func,
};

const mapStateToProps = (state, { stateIdentifier }) => ({
  open: isModalOpenSelector(state, stateIdentifier)
});

const mapDispatchToProps = (dispatch, { stateIdentifier }) => ({
  addImageAsFavorite: catImgId => dispatch(addCatImageAsFavoriteAction(catImgId)),
  closeModal: () => {
    dispatch(
        closeModalAction(stateIdentifier)
    );
    navigate(PATHS.RANDOM_CATS)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RandomCatModal);
