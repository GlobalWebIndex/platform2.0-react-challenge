import {
  Center,
} from '@chakra-ui/react';
import React from 'react';

export const Empty = ({ children }: { children: string }): JSX.Element => (
  <Center p={5} color="gray.400">
    {children}
  </Center>
);
