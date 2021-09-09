import { Badge, Box } from '@chakra-ui/react';
import React from 'react';

interface Props {
    children: JSX.Element;
    badges?: string[];
}

export const Card = ({ children, badges = [] }: Props): JSX.Element => (
  <Box
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"
  >
    {children}
    {badges.length > 0 && (
    <Box p="3">
      <Box d="flex" alignItems="baseline">
        {
            badges.map((badgeText) => (
              <Badge key={badgeText} borderRadius="md" px="2" colorScheme="purple" variant="solid">
                {badgeText}
              </Badge>
            ))
        }
      </Box>
    </Box>
    )}
  </Box>
);
