import React from 'react';
import { PropTypes } from 'prop-types';

const Breeds = ({ breeds }) => (
  <div>
    <>Breeds: </>
    {breeds && breeds.length ? breeds.map((breed) => breed.name) : 'not available'}
  </div>
);

Breeds.propTypes = {
  breeds: PropTypes.arrayOf(PropTypes.object),
};

Breeds.defaultProps = { breeds: [] };

export default Breeds;
