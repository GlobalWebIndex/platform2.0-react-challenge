import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { requestBreedsAction, requestByBreedIdAction } from '../../actions/catLoversActions';
import { catLoversBreedsSelector } from '../../selectors/catLoversSelectors';
import { openModalAction } from '../../widgets/Modal/modalActions';
import BreedModal from './breedModal';
import { navigate } from '../../common/navigationUtils';
import { Route } from 'react-router-dom';

/**
 * Renders the content of the breeds page
 * @param requestBreeds Function tha requesting breeds
 * @param breeds Array containing the cats breeds
 * @param openBreedModal Function that opens a breed modal
 * @returns {React.Element}
 */
const Breeds = ({ requestBreeds, breeds, openBreedModal, match, location }) => {
  useEffect(() => {
    if (location.state && location.state.catBreedId && location.state.isFromRandomCatsModal) {
      openBreedModal(location.state.catBreedId, match.url)
    } else {
      requestBreeds()
    }
  }, [location.state, match.url, openBreedModal, requestBreeds]);
  return (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {breeds.map((breed) => (
          <React.Fragment key={breed.id}>
            <ListItem alignItems="flex-start" onClick={() => openBreedModal(breed.id, match.url)}>
              {breed.hasOwnProperty('image') ?
                  <ListItemAvatar>
                    <Avatar src={`${breed.image.url}`} />
                  </ListItemAvatar>
                  : null}
              <ListItemText
                  primary={breed.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                      >
                        {breed.origin}<br />
                      </Typography>
                      {breed.description}
                    </React.Fragment>
                  }
              />
            </ListItem>
            <Route
              path={`${match.url}/${ breed.id}`}
              render={() => {
                return (
                    <BreedModal stateIdentifier="breedModal" />
                );
              }}
            />
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
  );
};

Breeds.propTypes = {
  requestBreeds: PropTypes.func,
  openBreedModal: PropTypes.func
};

const mapStateToProps = state => ({
  breeds: catLoversBreedsSelector(state)
});

const mapDispatchToProps = dispatch => ({
  requestBreeds: () => dispatch(requestBreedsAction()),
  openBreedModal: (breedId, url) => {
    dispatch(openModalAction('breedModal'));
    dispatch(requestByBreedIdAction(breedId));
    navigate(`${url}/${breedId}`)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Breeds)