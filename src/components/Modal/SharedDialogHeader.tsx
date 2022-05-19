import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';
import { SharedDialogHeaderProps } from '../../types';

const SharedDialogHeader: React.FC<SharedDialogHeaderProps> = ({
  breedsInfoExist,
  title = '',
  onClose,
}) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: breedsInfoExist ? 'space-between' : 'flex-end',
      width: '100%',
    }}
  >
    {breedsInfoExist && (
      <Typography variant="h4" style={{ textAlign: 'center' }}>
        {title}
      </Typography>
    )}
    <Button onClick={() => onClose()}>X</Button>
  </Box>
);

export default SharedDialogHeader;
