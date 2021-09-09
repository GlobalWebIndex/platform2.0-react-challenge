import React from 'react';
import {
  Route, Switch, useParams,
  Link,
} from 'react-router-dom';
import {
  Box, Flex, Wrap, WrapItem,
} from '@chakra-ui/react';
import { Breed, CatImage } from '../common/models';
import {
  Card, Image, Loader,
} from '../common/components';
import { Constants } from '../constants';
import { useAppSelector } from '../store';
import { useFindItem } from '../common/hooks';
import { selectAllById, selectAllBreedImagesById } from './breedsSlice';
import { Modal } from '../modal';
import { BreedDetails } from './BreedDetails';

export const SingleBreedPage = (): JSX.Element => {
  const { breedId } = useParams<{ breedId: string }>();
  const getBreedUrl = `${Constants.BASE_URL}/breeds/${breedId}`;
  const breedsById = useAppSelector(selectAllById);
  const [breed, breedIsLoading, breedError] = useFindItem<Breed>(breedId, breedsById, getBreedUrl);
  const getBreedImagesUrl = `${Constants.BASE_URL}/images/search?breed_ids=${breedId}&limit=10`;
  const breedImagesById = useAppSelector(selectAllBreedImagesById);

  const [
    breedImages,
    breedImagesAreLoading,
    breedImagesError,
  ] = useFindItem<CatImage[]>(breedId, breedImagesById, getBreedImagesUrl);

  return (
    <>
      <Flex direction="row" wrap="wrap">
        {/* Stats */}
        <Box>
          { breed && <BreedDetails breeds={[breed]} loading={breedIsLoading} error={breedError} /> }
        </Box>
        {/* Album */}
        {
          breedImagesError && breedImagesError.message // For demo purposes only this error handling
        }
        {
          breedImagesAreLoading && <Loader />
        }
        <Wrap spacing="30px" minW="30vw" p={5} flex="1">
          { breedImages && breedImages
            .map((image) => (
              <WrapItem key={image.id}>
                <Card>
                  <Link to={{ pathname: `${breedId}/images/${image.id}`, state: { canGoBack: true } }}>
                    <Image
                      src={image.url}
                      alt="Example Cat For Breed"
                    />
                  </Link>
                </Card>
              </WrapItem>
            ))}
        </Wrap>
      </Flex>
      {/* Sub-Router */}
      <Switch>
        <Route path="/breeds/:breedId/images/:imageId">
          <Modal isOpen fallbackUrl={`/breeds/${breedId}`} />
        </Route>
      </Switch>
    </>
  );
};
