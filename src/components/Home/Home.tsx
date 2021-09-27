import ImagesListItem from 'components/common/ImagesListItem/ImagesListItem';
import ImagesListWrapper from 'components/common/ImagesListWrapper/ImagesListWrapper';
import Modal from 'components/common/Modal/Modal';
import Spinner from 'components/common/Spinner/Spinner';
import { USER_ID } from 'constants/app';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavourite, deleteFavourite, getFavourites } from 'redux/favourites/actions';
import { allFavouritesSelector, favouritesLoadingSelector } from 'redux/favourites/selectors';
import { getImages } from 'redux/images/actions';
import { allImagesSelector, imagesLoadingSelector } from 'redux/images/selectors';
import { ImageType } from 'types/images';
import styles from './Home.module.scss';
import ModalContent from './ModalContent/ModalContent';

const Home = () => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState<ImageType>();
  const [showModal, setShowModal] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const images = useSelector(allImagesSelector);
  const favourites = useSelector(allFavouritesSelector);
  const favouritesLoading = useSelector(favouritesLoadingSelector);
  const imagesLoading = useSelector(imagesLoadingSelector);

  useEffect(() => {
    if (images.length === 0) {
      dispatch(getImages());
    }
  }, [dispatch, images.length]);

  useEffect(() => {
    if (favourites.length === 0) {
      dispatch(getFavourites());
    }
  }, [dispatch, favourites.length]);

  const onImageClick = (id: string) => {
    const image = images.find((item) => item.id === id);

    setSelectedImage(image);
    setShowModal(true);
  };

  const onModalClose = () => {
    setSelectedImage(undefined);
    setShowModal(false);
  };

  const onLoadMore = () => {
    if (!imagesLoading) {
      dispatch(getImages());
    }
  };

  const onFavouriteClick = (id: string) => {
    if (!favouritesLoading) {
      const favourite = favourites.find((item) => item.image.id === id);
      if (favourite) {
        dispatch(deleteFavourite(favourite.id));
      } else {
        dispatch(addFavourite(id, USER_ID));
      }
    }
  };

  const onCopyImageRefClick = (url: string) => {
    navigator.clipboard.writeText(url);
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  };

  const isFavourite = useMemo(() => {
    if (selectedImage && favourites.length > 0) {
      return Boolean(favourites.find((item) => item.image_id === selectedImage.id));
    }

    return false;
  }, [favourites, selectedImage]);

  if (imagesLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.content}>
      <ImagesListWrapper>
        {images.map((image) => {
          return (
            <ImagesListItem key={image.id} id={image.id} source={image.url} alt={image.id} onClick={onImageClick} />
          );
        })}
      </ImagesListWrapper>
      <button onClick={onLoadMore}>{imagesLoading ? 'Loading...' : 'Load more'}</button>
      <Modal show={showModal} onClose={onModalClose}>
        {selectedImage && (
          <ModalContent
            id={selectedImage.id}
            source={selectedImage.url}
            breeds={selectedImage.breeds}
            onCopyClick={onCopyImageRefClick}
            onFavouriteClick={onFavouriteClick}
            showCopied={showCopied}
            isFavourite={isFavourite}
          />
        )}
      </Modal>
    </div>
  );
};

export default Home;
