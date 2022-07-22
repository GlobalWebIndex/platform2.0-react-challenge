import AccordionItem from 'app/components/AccordionItem';
import LoadingOverlay from 'app/components/LoadingOverlay';
import DefaultLayout from 'app/layouts/default';
import { repoErrorText } from 'app/pages/HomePage';
import useToastNotification from 'hooks/useToastNotification';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useBreedSlice } from 'store/breeds';
import {
  selectBreeds,
  selectBreedsError,
  selectBreedsLoading,
} from 'store/breeds/selectors';
import { useCatSlice } from 'store/cats';
import tw from 'tailwind-styled-components';
import BreedInformation from './BreedInformation';
import BreedModal from './BreedModal';

export function BreedsPage() {
  const { actions: breedActions } = useBreedSlice();
  const { actions: catActions } = useCatSlice();
  const dispatch = useDispatch();

  const breeds = useSelector(selectBreeds);
  const loading = useSelector(selectBreedsLoading);
  const error = useSelector(selectBreedsError);

  let [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useToastNotification();

  useEffect(() => {
    if (!breeds || breeds.length === 0) {
      dispatch(breedActions.loadBreeds());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breedActions, dispatch]);

  return (
    <>
      <Helmet>
        <title>Breeds</title>
        <meta
          name="description"
          content="All the information for the cat breeds you want to know!"
        />
      </Helmet>
      <LoadingOverlay loading={loading} />
      <BreedModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <DefaultLayout>
        {breeds.length > 0 ? (
          <>
            {breeds.map(breed => (
              <AccordionItem
                key={breed.id}
                title={breed.name}
                active={true}
                onClick={() => {
                  setIsModalOpen(true);
                  dispatch(catActions.selectBreed(breed.id));
                  dispatch(catActions.loadCatImages());
                }}
              >
                <BreedInformation breed={breed} />
              </AccordionItem>
            ))}
          </>
        ) : error ? (
          <ErrorText>{repoErrorText(error)}</ErrorText>
        ) : null}
      </DefaultLayout>
    </>
  );
}

const ErrorText = tw.span`
  color:red;
`;
