import Button from 'app/components/Button';
import DefaultLayout from 'app/layouts/default';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useCatSlice } from 'store/cats';
import {
  selectCatsLoading,
  selectError,
  selectFavouriteCatImages,
} from 'store/cats/selectors';
import { repoErrorText } from '../HomePage';
import tw from 'tailwind-styled-components';
import LoadingOverlay from 'app/components/LoadingOverlay';
import useToastNotification from 'hooks/useToastNotification';
import { useTranslation } from 'react-i18next';
import { messages } from 'app/messages';

export function FavoritesPage() {
  const { actions } = useCatSlice();
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const favouriteCats = useSelector(selectFavouriteCatImages);
  const error = useSelector(selectError);
  const loading = useSelector(selectCatsLoading);

  useEffect(() => {
    dispatch(actions.loadFavorites());
  }, [actions, dispatch]);

  useToastNotification();

  return (
    <>
      <Helmet>
        <title>Favorites</title>
        <meta
          name="description"
          content="Your favorites cats, all in one place!"
        />
      </Helmet>
      <DefaultLayout>
        <LoadingOverlay loading={loading} />
        {favouriteCats.length > 0 ? (
          <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-16">
            <div className="container mx-auto space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-3">
              {favouriteCats.map(cat => (
                <div
                  key={cat.id}
                  className="w-full relative group rounded hover:shadow-2xl"
                >
                  <img
                    src={cat.image.url}
                    alt={cat.image.id}
                    className="block object-cover object-center w-full h-full rounded-lg"
                  />
                  <div className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center  opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
                    <Button
                      onClick={() => {
                        dispatch(actions.deleteFavoriteCat(cat));
                      }}
                    >
                      Remove Favorite
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <ErrorContainer>
            <ErrorText>{t(repoErrorText(error)())}</ErrorText>
          </ErrorContainer>
        ) : (
          <ErrorContainer>{t(messages.emptyResults())}</ErrorContainer>
        )}
      </DefaultLayout>
    </>
  );
}

const ErrorText = tw.span`
  mx-4 p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800 w-full
`;
const ErrorContainer = tw.span`
  flex w-full justify-center text-center
  
`;
