import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Button,
  Link,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

interface Props {
    name: string,
    url: string
}
export const NavLink = ({ name, url }: Props): JSX.Element => (
  <Link
    as={ReactRouterLink}
    px={2}
    py={1}
    rounded="md"
    color="white"
    _hover={{
      textDecoration: 'none',
      bg: 'blue.900',
    }}
    to={url}
  >
    {name}
  </Link>
);

export const Header = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="blue.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Button
          size="md"
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        >
          {isOpen ? 'Close' : 'Menu'}
        </Button>
        <HStack spacing={8} alignItems="center">
          <Box color="white" fontWeight={500} mx={5}>CATS APP</Box>
          <HStack
            as="nav"
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
          >
            <NavLink name="Images" url="/" />
            <NavLink name="Breeds" url="/breeds" />
            <NavLink name="Favourites" url="/favourites" />
          </HStack>
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            <NavLink name="Images" url="/" />
            <NavLink name="Breeds" url="/breeds" />
            <NavLink name="Favourites" url="/favourites" />
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};
