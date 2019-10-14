import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import { mdiTrashCan } from '@mdi/js';
import { getFavouritesAction, deleteFavouriteAction, updateModalPropsAction } from '../../redux/actions';
import './favourites.css';

class Favourites extends React.Component {
  componentDidMount() {
    const { getFavourites } = this.props;
    getFavourites();
  }

  render() {
    const { favourites, updateModalProps, deleteFavourite } = this.props;
    if (favourites && favourites.length) {
      return (
        <div data-testid="favourites">
          <p id="favourites-title">FAVOURITES</p>
          {favourites.map((favourite) => (
            <div data-testid="favourite" key={favourite.id}>
              <button
                className="favourite-preview"
                type="button"
                onClick={() => updateModalProps({
                  id: favourite.image.id,
                  url: favourite.image.url,
                  favouriteId: favourite.id,
                })}
              >
                <img
                  className="favourite-preview-image"
                  src={favourite.image.url}
                  alt="favourite-preview"
                />
              </button>
              <Icon
                data-testid="delete-icon"
                path={mdiTrashCan}
                title="Delete Favourite"
                size={1}
                horizontal
                vertical
                rotate={180}
                color="red"
                onClick={() => deleteFavourite(favourite.id)}
              />
            </div>
          ))}
        </div>
      );
    }
    return null;
  }
}

Favourites.propTypes = {
  favourites: PropTypes.arrayOf(PropTypes.object),
  getFavourites: PropTypes.func.isRequired,
  updateModalProps: PropTypes.func.isRequired,
  deleteFavourite: PropTypes.func.isRequired,
};

Favourites.defaultProps = { favourites: [] };

const mapStateToProps = (state) => ({
  favourites: state.favourites,
});

const mapDispatchToProps = (dispatch) => ({
  getFavourites: () => dispatch(getFavouritesAction()),
  updateModalProps: (modalProps) => dispatch(updateModalPropsAction(modalProps)),
  deleteFavourite: (favouriteId) => dispatch(deleteFavouriteAction(favouriteId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
