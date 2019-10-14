import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import './tile.css';

const Tile = ({ url, onClick }) => {
  const [visible, setVisibility] = useState(false);

  return (
    <button
      className="tile"
      data-testid="tile"
      type="button"
      onClick={onClick}
    >
      <img
        style={visible ? { display: 'block' } : { display: 'none' }}
        className="tile-image"
        src={url}
        alt="cat_image"
        onLoad={() => setVisibility(true)}
      />
    </button>
  );
};

Tile.propTypes = {
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tile;
