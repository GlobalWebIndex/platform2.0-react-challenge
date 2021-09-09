import React, { useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Header, NoMatch } from '../common/components';
import { FavouritesPage, fetchFavourites } from '../favourites';
import { SingleBreedPage, BreedsPage } from '../breeds';
import { useAppDispatch } from '../store';
import { ImagesPage } from '../images';

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch();

  // Prefetching
  useEffect(() => {
    const isNotInFavouritesPage = window.location.pathname !== '/favourites';

    if (isNotInFavouritesPage) {
      dispatch(fetchFavourites());
    }
  }, []);

  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Box h="100%" p={5}>
        <Switch>
          <Route path="/images">
            <ImagesPage />
          </Route>
          <Route path="/breeds/:breedId">
            <SingleBreedPage />
          </Route>
          <Route path="/breeds">
            <BreedsPage />
          </Route>
          <Route exact path="/favourites">
            <FavouritesPage />
          </Route>
          <Route exact path="/">
            <Redirect to="/images" />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Box>
    </Flex>
  );
};
