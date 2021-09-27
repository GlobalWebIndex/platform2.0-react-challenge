import React from 'react';
import { BreedType } from 'types/breeds';
import { ImageType } from 'types/images';
import styles from './ModalContent.module.scss';

type Props = {
  breed?: BreedType;
  images: ImageType[];
  onImageClick: (id: string) => void;
};

const ModalContent: React.FC<Props> = ({ breed, images, onImageClick }) => {
  return (
    <div className={styles.content}>
      <div className={styles['left-content']}>
        {images.map((image) => {
          return <img src={image.url} alt={image.id} onClick={() => onImageClick(image.id)} />;
        })}
      </div>
      {breed && (
        <div className={styles['right-content']}>
          <h2>{breed.name}</h2>
          <p>{breed.description}</p>
        </div>
      )}
    </div>
  );
};

export default ModalContent;
