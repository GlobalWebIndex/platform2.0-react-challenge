import React, { useEffect } from 'react';
import {
  Button, Box, Wrap, WrapItem, VStack,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  Card, Empty, Image, Loader,
} from '../common/components';
import {
  favouritesAreLoading, fetchFavourites, removeFavourite, selectAllFavourites,
} from './favouritesSlice';

export const FavouritesPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector(selectAllFavourites);
  const loading = useAppSelector(favouritesAreLoading);

  useEffect(() => {
    dispatch(fetchFavourites());
  }, []);

  return (
    <Box>
      { favourites.length === 0 && <Empty>There are no favourites here.</Empty>}
      { (favourites.length > 0) && (
      <Wrap spacing="30px">
        {favourites.length > 0 && favourites.map((favourite) => (
          <WrapItem key={favourite.id} data-testid="image">
            <VStack align="center">
              <Card>
                <Image src={favourite.image.url} alt="Favourite Cat" />
              </Card>
              <Button
                colorScheme="blue"
                isDisabled={loading}
                onClick={() => dispatch(removeFavourite({ favouriteId: favourite.id, imageId: favourite.image_id }))}
              >
                Remove
              </Button>
            </VStack>

          </WrapItem>
        ))}
      </Wrap>
      )}
      { loading && <Loader />}
    </Box>
  );
};
