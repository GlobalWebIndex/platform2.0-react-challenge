import React, { useEffect, useState } from 'react';
import {
  Box, Center, Flex, Spacer, Wrap, WrapItem,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import {
  breedsAreLoading, fetchBreedsForPage, selectAllBreedsByPage, selectTotalBreeds,
} from './breedsSlice';
import { Breed } from '../common/models';
import { Image, Loader } from '../common/components';
import { Pagination } from './Pagination';

const BreedCard = ({ breed }: {breed: Breed}): JSX.Element => (
  <Box
    maxW="sm"
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"
  >
    <Image src={breed?.image?.url} alt="Breed Image Example" />
    <Center fontSize="xl" fontWeight={500} p={6}>
      {breed.name}
    </Center>
  </Box>
);

export const BreedsPage = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const dispatch = useAppDispatch();
  const breedsByPage = useAppSelector(selectAllBreedsByPage);
  const loading = useAppSelector(breedsAreLoading);
  const total = useAppSelector(selectTotalBreeds);

  useEffect(() => {
    if (currentPage in breedsByPage) {
      setBreeds(breedsByPage[currentPage]);
    } else {
      dispatch(fetchBreedsForPage(currentPage));
    }
  }, [currentPage, breedsByPage]);

  return (
    <Flex direction="column" h="100%">
      <Wrap spacing="25px">
        {
          breeds.map((breed) => (
            <WrapItem key={breed.id}>
              <Link to={`/breeds/${breed.id}`} data-testid="breed">
                <BreedCard breed={breed} />
              </Link>
            </WrapItem>
          ))
        }
      </Wrap>
      {
          loading && <Loader />
      }
      <Spacer />
      <Pagination
        total={total}
        currentPage={currentPage}
        loading={loading}
        onPageUpdate={setCurrentPage}
      />
    </Flex>
  );
};
