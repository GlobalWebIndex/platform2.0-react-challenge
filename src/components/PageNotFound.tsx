import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      Page not found
      <Box>
        <Button
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </Button>
        <Button
          onClick={() => {
            navigate('/images');
          }}
        >
          Go To Homepage
        </Button>
      </Box>
    </Box>
  );
};

export default PageNotFound;
