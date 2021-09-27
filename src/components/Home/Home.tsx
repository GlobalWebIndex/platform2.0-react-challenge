import ImagesListItem from 'components/common/ImagesListItem/ImagesListItem';
import ImagesListWrapper from 'components/common/ImagesListWrapper/ImagesListWrapper';
import Modal from 'components/common/Modal/Modal';
import Spinner from 'components/common/Spinner/Spinner';
import { USER_ID } from 'constants/api';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavourite } from 'redux/favourites/actions';
import { getCats } from 'redux/images/actions';
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
  const imagesLoading = useSelector(imagesLoadingSelector);

  useEffect(() => {
    dispatch(getCats());
  }, [dispatch]);

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
      dispatch(getCats());
    }
  };

  const onFavouriteClick = (id: string) => {
    dispatch(addFavourite(id, USER_ID));
  };

  const onCopyImageRefClick = (url: string) => {
    navigator.clipboard.writeText(url);
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  };

  if (imagesLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.content}>
      <ImagesListWrapper>
        {images.map((image) => {
          return <ImagesListItem id={image.id} source={image.url} alt={image.id} onClick={onImageClick} />;
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
          />
        )}
      </Modal>
    </div>
  );
};

export default Home;
