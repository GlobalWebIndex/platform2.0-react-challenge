import React from 'react';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const BackdropLoader: React.FC<{ isFetching: boolean }> = ({ isFetching }) => (
  <Backdrop style={{ color: '#fff', zIndex: 10 }} open={isFetching}>
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default BackdropLoader;
