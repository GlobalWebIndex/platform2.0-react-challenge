import ImagesListItem from 'components/common/ImagesListItem/ImagesListItem';
import ImagesListWrapper from 'components/common/ImagesListWrapper/ImagesListWrapper';
import Modal from 'components/common/Modal/Modal';
import Spinner from 'components/common/Spinner/Spinner';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBreeds } from 'redux/breeds/actions';
import { allBreedsSelector, breedsLoadingSelector } from 'redux/breeds/selectors';
import { clearImages, getImages } from 'redux/images/actions';
import { allImagesSelector } from 'redux/images/selectors';
import { BreedType } from 'types/breeds';
import ModalContent from './ModalContent/ModalContent';

const Breeds = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState<BreedType>();
  const breeds = useSelector(allBreedsSelector);
  const breedsLoading = useSelector(breedsLoadingSelector);
  const images = useSelector(allImagesSelector);

  useEffect(() => {
    dispatch(getBreeds());
  }, [dispatch]);

  const onBreedClick = (id: string) => {
    const breed = breeds.find((item) => item.id === id);

    setSelectedBreed(breed);
    dispatch(clearImages());
    dispatch(getImages({ order: 'ASC', breed_id: id }));
    setShowModal(true);
  };

  const onModalClose = () => {
    setShowModal(false);
  };

  if (breedsLoading) {
    return <Spinner />;
  }

  return (
    <>
      <ImagesListWrapper>
        {breeds.map((breed) => {
          const { image } = breed;

          return (
            <ImagesListItem
              key={breed.id}
              id={breed.id}
              source={image?.url}
              alt={breed.id}
              label={breed.name}
              onClick={onBreedClick}
            />
          );
        })}
      </ImagesListWrapper>
      <Modal show={showModal} onClose={onModalClose}>
        <ModalContent breed={selectedBreed} images={images} />
      </Modal>
    </>
  );
};

export default Breeds;
