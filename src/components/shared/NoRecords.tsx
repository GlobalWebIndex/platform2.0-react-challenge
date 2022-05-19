import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const NoRecords: React.FC = () => (
  <Box p={5} m={5}>
    <Typography align="center" variant="subtitle1">
      No cats to display
    </Typography>
  </Box>
);

export default NoRecords;
