import Button from 'app/components/Button';
import CatModal from 'app/pages/HomePage/CatModal';
import LoadingOverlay from 'app/components/LoadingOverlay';
import DefaultLayout from 'app/layouts/default';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useCatSlice } from 'store/cats';
import {
  selectCatImages,
  selectError,
  selectCatsLoading,
} from 'store/cats/selectors';
import { CatApiErrorType, CatApiSuccessType } from 'store/cats/types';
import tw from 'tailwind-styled-components';
import OptionsButton from './OptionsButton';
import { useTranslation } from 'react-i18next';
import { messages } from '../../messages';
import useToastNotification from 'hooks/useToastNotification';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function HomePage() {
  const { actions } = useCatSlice();
  const { t } = useTranslation();

  let query = useQuery();

  const dispatch = useDispatch();

  const catImages = useSelector(selectCatImages);
  const loading = useSelector(selectCatsLoading);
  const error = useSelector(selectError);

  let [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(actions.selectBreed(null));
    dispatch(actions.loadCatImages());
  }, [actions, dispatch]);

  useToastNotification();

  useEffect(() => {
    const catImageId = query.get('catImageId');
    if (catImageId) {
      dispatch(actions.loadCatImage({ id: catImageId }));
      setIsModalOpen(true);
    }
  }, [actions, dispatch, query]);

  const loadMore = () => {
    dispatch(actions.loadCatImages());
  };

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="A cat lover's application!" />
      </Helmet>
      <LoadingOverlay loading={loading} />
      <DefaultLayout>
        <CatModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        <div className="flex justify-center">
          <OptionsButton visible={!isModalOpen} />
          <Button
            visible={!isModalOpen}
            onClick={() => {
              loadMore();
            }}
            loading={loading}
            className="fixed z-40 bottom-10 right-8"
          >
            {t(messages.loadMore())}
          </Button>
        </div>

        {catImages.length > 0 ? (
          <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-16">
            <div className="container mx-auto space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-3">
              {catImages.map(image => (
                <div
                  key={image.id}
                  className="w-full relative group rounded hover:shadow-2xl"
                >
                  <img
                    src={image.url}
                    alt={image.id}
                    className="block object-cover object-center w-full h-full rounded-lg"
                  />
                  <div className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center  opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
                    <Button
                      onClick={() => {
                        dispatch(actions.selectCatImage(image));
                        setIsModalOpen(true);
                      }}
                    >
                      {t(messages.moreInformation())}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <ErrorText>{t(repoErrorText(error)())}</ErrorText>
        ) : null}
      </DefaultLayout>
    </>
  );
}

export const repoErrorText = (error: CatApiErrorType) => {
  switch (error) {
    case CatApiErrorType.API_TOKEN_EMPTY:
      return messages.emptyApiToken;
    case CatApiErrorType.EMPTY_RESULTS:
      return messages.emptyResults;
    case CatApiErrorType.NOT_FOUND:
      return messages.notFound;
    default:
      return messages.responseError;
  }
};

export const repoSuccessText = (error: CatApiSuccessType) => {
  switch (error) {
    case CatApiSuccessType.CAT_ADDED:
      return messages.favoriteAdded;
    case CatApiSuccessType.CAT_REMOVED:
      return messages.favoriteDeleted;
  }
};

const ErrorText = tw.span`
  color:red;
`;
