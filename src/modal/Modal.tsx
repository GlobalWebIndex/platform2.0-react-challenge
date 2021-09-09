import {
  Button, Center,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Tab, TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { Image } from '../common/components';
import {
  addFavourite,
  favouritesAreLoading,
  removeFavourite,
  selectAllFavouriteIdsByImageId,
} from '../favourites';
import { useFindItem } from '../common/hooks';
import { Constants } from '../constants';
import { BreedDetails } from '../breeds';
import { selectAllImagesById } from '../images';
import { CatImage } from '../common/models';

interface FavouriteButtonProps {
  imageId: string;
}

const FavouriteButton = ({ imageId }: FavouriteButtonProps): JSX.Element => {
  const favouriteIdsByImageId = useAppSelector(selectAllFavouriteIdsByImageId);

  const isLoading = useAppSelector(favouritesAreLoading);

  const dispatch = useAppDispatch();

  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  useEffect(() => {
    setIsFavourite(imageId in favouriteIdsByImageId);
  }, [favouriteIdsByImageId]);

  const toggleFavourite = (): void => {
    if (isFavourite) {
      const favouriteId = favouriteIdsByImageId[imageId];
      dispatch(removeFavourite({ favouriteId, imageId }));
    } else {
      dispatch(addFavourite(imageId));
    }
  };

  return (
    <Button
      colorScheme={isFavourite ? 'red' : 'blue'}
      isLoading={isLoading}
      onClick={() => toggleFavourite()}
    >
      {isFavourite ? 'Remove from favourites' : 'Add to favourites'}
    </Button>
  );
};

interface ModalProps {
  fallbackUrl: string;
  isOpen?: boolean;
}

export const Modal = ({ fallbackUrl, isOpen = false }: ModalProps): JSX.Element => {
  const { onClose } = useDisclosure();
  const history = useHistory();
  const location = useLocation<Record<string, boolean>>();
  const { imageId } = useParams<{imageId: string}>();
  const getImageUrl = `${Constants.BASE_URL}/images/${imageId}`;
  const imagesById = useAppSelector(selectAllImagesById);
  const [image, imageLoading, imageError] = useFindItem<CatImage>(imageId, imagesById, getImageUrl);

  const handleClose = (): void => {
    onClose();

    const hasPreviousNavigationState = location.state?.canGoBack;

    if (hasPreviousNavigationState) {
      history.goBack();
    } else {
      history.push(fallbackUrl);
    }
  };

  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={handleClose}
      size="3xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Image Details</ModalHeader>
        <ModalCloseButton />
        { image && (
        <ModalBody>
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Image</Tab>
              <Tab>Breed</Tab>
            </TabList>
            <TabPanels maxHeight="80vh">
              <TabPanel>
                {/* Error */}
                {
                  imageError && imageError.message // For demo purposes only this error handling
                }
                {/* Image */}
                <Center>
                  <Skeleton isLoaded={!imageLoading}>
                    <Image src={image.url} alt="Cat" boxSize="50vh" />
                  </Skeleton>
                </Center>
                <Center mt={2}>
                  <FavouriteButton imageId={image.id} />
                </Center>
              </TabPanel>
              <TabPanel>
                <BreedDetails breeds={image?.breeds} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        )}
      </ModalContent>
    </ChakraModal>
  );
};
