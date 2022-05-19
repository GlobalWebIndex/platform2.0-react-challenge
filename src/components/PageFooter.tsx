import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import grey from '@material-ui/core/colors/grey';
import CopyrightIcon from '@material-ui/icons/Copyright';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const StyledTypography = withStyles({
  root: {
    color: '#FFFFFF',
  },
  style: {
    display: 'flex',
  },
})(Typography);

const PageFooter = () => (
  <footer>
    <Box
      p={5}
      style={{
        backgroundColor: grey[800],
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <StyledTypography>
        <StyledTypography>
          <Box style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CopyrightIcon />{' '}
            <span>Konstantinos Blounas, {new Date().getFullYear()}</span>
          </Box>
        </StyledTypography>
      </StyledTypography>
      <StyledTypography>
        <StyledTypography>
          <Button
            onClick={() => {
              window.open('https://www.linkedin.com/in/kblounas/', '_blank');
            }}
          >
            <LinkedInIcon />
          </Button>
        </StyledTypography>
      </StyledTypography>
    </Box>
  </footer>
);

export default PageFooter;
