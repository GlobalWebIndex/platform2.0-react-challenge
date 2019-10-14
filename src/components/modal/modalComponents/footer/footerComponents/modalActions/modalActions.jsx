import React from 'react';
import { PropTypes } from 'prop-types';
import Icon from '@mdi/react';
import { mdiHeart, mdiContentCopy } from '@mdi/js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const modalActions = ({
  id,
  url,
  favouriteId,
  toggleFavourite,
}) => (
  <div className="image-actions">
    <Icon
      id="copy-icon"
      data-testid="copy-icon"
      path={mdiContentCopy}
      title="Copy image url"
      size={2}
      horizontal
      vertical
      rotate={180}
      color="gray"
      onClick={() => {
        navigator.clipboard.writeText(url);
        toast.info('Copied to clipboard', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }}
    />
    <Icon
      id="favourite-icon"
      data-testid="favourite-icon"
      path={mdiHeart}
      title="Add to favourites"
      size={2}
      horizontal
      vertical
      rotate={180}
      color={favouriteId ? 'red' : 'gray'}
      onClick={() => {
        toggleFavourite(id, url, favouriteId);
        toast.info('Added to favourites', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }}
    />
    <ToastContainer />
  </div>
);

modalActions.propTypes = {
  id: PropTypes.string,
  url: PropTypes.string,
  favouriteId: PropTypes.number,
  toggleFavourite: PropTypes.func.isRequired,
};

modalActions.defaultProps = { id: '', url: '', favouriteId: null };

export default modalActions;
