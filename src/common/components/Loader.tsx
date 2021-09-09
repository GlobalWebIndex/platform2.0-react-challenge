import React from 'react';
import {
  Box, Center,
} from '@chakra-ui/react';

export const Loader = (): JSX.Element => (
  <Center p={10}>
    <Box fontSize="xl" color="blue.500" ml={5}>
      Loading...
    </Box>
  </Center>
);
