import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { loadingSelector } from './selectors';

const Loader = ({ loading }) => (
  loading ? (
  <Box sx={{ display: 'flex' }}>
    <CircularProgress />
  </Box>
  ) : null
);

Loader.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  loading: loadingSelector(state)
});

export default connect(mapStateToProps)(Loader);