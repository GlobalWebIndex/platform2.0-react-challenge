import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImageList from '@mui/material/ImageList';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageListItem from '@mui/material/ImageListItem';
import { requestFavoritesAction, deleteCatImageFromFavoriteAction } from '../../actions/catLoversActions';
import { catLoversFavoritesCatsSelector } from '../../selectors/catLoversSelectors';

/**
 * Renders the content of the favorite cats
 * @param requestFavoriteCats Function tha requesting favorite cats
 * @param favoritesCats Array containing the favorite cats
 * @param deleteCatImageFromFavorite Function that deletes a cat image
 * @returns {React.Element}
 */
const FavoriteCats = ({ requestFavoriteCats, favoritesCats, deleteCatImageFromFavorite }) => {
  useEffect(() => {
    requestFavoriteCats()
  }, [requestFavoriteCats]);
  return (
      <ImageList sx={{ width: '100%', height: 800 }} cols={4} rowHeight={400}>
        {favoritesCats.map((item) => (
            <ImageListItem key={item.id}>
              {item.hasOwnProperty('image') ?
                  <img
                      src={`${item.image.url}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item.image.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.image.id}
                      loading="lazy"
                  />
              : null}
              <ImageListItemBar
                  position="top"
                  actionIcon={
                    <IconButton
                        sx={{ color: 'white' }}
                        onClick={() => deleteCatImageFromFavorite(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                  actionPosition="left"
              />
            </ImageListItem>
        ))}
      </ImageList>
  );
};

FavoriteCats.propTypes = {
  requestFavoriteCats: PropTypes.func,
  deleteCatImageFromFavorite: PropTypes.func
};

const mapStateToProps = state => ({
  favoritesCats: catLoversFavoritesCatsSelector(state)
});

const mapDispatchToProps = dispatch => ({
  requestFavoriteCats: () => dispatch(requestFavoritesAction()),
  deleteCatImageFromFavorite: imgId => dispatch(deleteCatImageFromFavoriteAction(imgId))
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteCats)