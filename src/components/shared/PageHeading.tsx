import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const StyledTypography = withStyles({
  root: {
    color: '#FFFFFF',
  },
})(Typography);

const PageHeading: React.FC<{ title: string }> = ({ title }) => (
  <Box mt={3} mb={3}>
    <StyledTypography variant="h4">{title}</StyledTypography>
  </Box>
);

export default PageHeading;
