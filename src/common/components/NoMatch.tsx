import { Center, Text, VStack } from '@chakra-ui/react';
import React from 'react';

export const NoMatch = (): JSX.Element => (
  <Center h="50vh">
    <VStack>
      <Text fontSize="6xl" fontWeight="bold" color="gray.500">404</Text>
      <Text fontSize="5xl" color="gray.500">Page not found</Text>
    </VStack>
  </Center>
);
