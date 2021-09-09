import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
} from '@chakra-ui/react';
import { Constants } from '../constants';

interface Props {
    currentPage: number;
    total: number;
    loading: boolean;
    onPageUpdate: (page: number) => void
}

export const Pagination = ({
  currentPage, total, loading, onPageUpdate,
}: Props): JSX.Element => {
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    if (total) {
      const numberOfPages = Math.ceil(total / Constants.BREEDS_REQUEST_LIMIT);
      const calculatedPages = Array.from(Array(numberOfPages).keys()); // Ugly but works :/
      setPages(calculatedPages);
    }
  }, [total]);

  return (
    <>
      {pages.length > 0 && (
        <Center p={4}>
          <Flex>
            <Button
              disabled={currentPage === 0 || loading}
              colorScheme="blue"
              onClick={() => onPageUpdate(currentPage - 1)}
            >
              Previous
            </Button>
            <Box p={1}>
              {pages.map((page) => (
                <Button
                  bgColor={currentPage === page ? 'blue.100' : 'none'}
                  height="100%"
                  key={page}
                  size="lg"
                  disabled={loading}
                  colorScheme="blue"
                  variant="link"
                  onClick={() => onPageUpdate(page)}
                >
                  {page + 1}
                </Button>
              ))}
            </Box>
            <Button
              disabled={(currentPage === pages.length - 1) || loading}
              colorScheme="blue"
              onClick={() => onPageUpdate(currentPage + 1)}
            >
              Next
            </Button>
          </Flex>
        </Center>
      )}
    </>
  );
};
