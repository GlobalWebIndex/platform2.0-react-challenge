import React, { useCallback, useEffect } from 'react';
import {
  Button, Center, Wrap, WrapItem,
} from '@chakra-ui/react';
import { Switch, Route, Link } from 'react-router-dom';
import { Modal } from '../modal';
import { useAppDispatch, useAppSelector } from '../store';
import { Card, Image } from '../common/components';
import { fetchImages, imagesAreLoading, selectAllImages } from './imagesSlice';
import { CatImage } from '../common/models';

export const ImagesPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const images = useAppSelector(selectAllImages);
  const loading = useAppSelector(imagesAreLoading);
  const loadImages = useCallback(() => {
    dispatch(fetchImages());
  }, []);

  const getBreedNames = ({ breeds }: CatImage): string[] => (breeds
    ? Array.from(breeds, (breed) => breed.name)
    : []
  );

  useEffect(() => {
    if (!images.length) {
      loadImages();
    }
  }, []);

  return (
    <>
      <Wrap spacing="30px">
        {images.length > 0 && images.map((image) => (
          <WrapItem key={image.id}>
            <Link to={{ pathname: `/images/${image.id}`, state: { canGoBack: true } }} data-testid="image">
              <Card badges={getBreedNames(image)}>
                <Image src={image.url} alt="Cat" />
              </Card>
            </Link>
          </WrapItem>
        ))}
      </Wrap>
      {/* Load More Button */}
      <Center py={15} mt={5}>
        <Button
          data-testid="load-more-button"
          width="33vw"
          isLoading={loading}
          loadingText="Loading"
          colorScheme="blue"
          onClick={loadImages}
        >
          Load more
        </Button>
      </Center>
      {/* Sub-Router */}
      <Switch>
        <Route path="/images/:imageId">
          <Modal isOpen fallbackUrl="/images" />
        </Route>
      </Switch>
    </>
  );
};
